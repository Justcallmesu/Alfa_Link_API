import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

// Schema
import { Permissions } from '@/schemas/auth/Permissions';
import { Roles } from '@/schemas/auth/Roles';
import { User, UserDocument } from '@/schemas/auth/User';

// DTO
import {
  LoginDto,
  createUserDto,
  updatePasswordDto,
  updateUserDto,
} from './auth.dto';

// Enum
import { GenerateTokenType } from '@/modules/common/enum/GenerateTokenType.enum';

// Functions
import GenerateToken from '@/modules/common/function/generateToken.function';
import ResetToken from '@/modules/common/function/ResetToken.function';
import { CookiesJWT } from '@/modules/common/interface/CookiesJWT.interface';
import { JwtGuardDto } from '@/modules/common/dto/JwtGuard.dto';
import {
  AccessCookiesConfig,
  RefreshCookiesConfig,
} from '@/modules/common/config/CookiesConfig';

const logger = new Logger('AuthService');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Roles.name) private RolesModel: Model<Roles>,
    @InjectModel(Permissions.name) private PermissionsModel: Model<Permissions>,
  ) {}

  async login(res: Response, body: LoginDto) {
    const user = await this.UserModel.findOne({
      username: body.username,
    }).select('+password');

    if (!user) {
      throw new HttpException('Username or Password is incorrect', 400);
    }

    if (!(await user.comparePassword(body.password))) {
      throw new HttpException('Username or Password is incorrect', 400);
    }

    const refreshToken = GenerateToken(GenerateTokenType.REFRESH_TOKEN, {
      id: user._id,
    });

    // Cookies Send
    res.cookie('refresh_token_jwt', refreshToken, RefreshCookiesConfig());

    res.cookie(
      'access_token_jwt',
      GenerateToken(GenerateTokenType.ACCESS_TOKEN, { id: user._id }),
      AccessCookiesConfig(),
    );

    user.refreshToken = refreshToken as string;

    await user.save();

    // Json Send and End Response
    res.json({
      message: 'Login Successfull',
      status: 200,
      data: {
        name: user.name,
        username: user.username,
      },
    });
  }

  async register(req: Request, res: Response, body: createUserDto) {
    const isExist = await this.UserModel.findOne({
      $or: [{ username: body.username }, { name: body.name }],
    });

    if (isExist) {
      throw new ConflictException(
        'There is Username or Name that is Sudah Dibuat',
      );
    }

    const user = await this.UserModel.create(body);
    res.json({
      message: 'User Created',
      status: 200,
      data: {
        name: user.name,
        username: user.username,
      },
    });
  }

  async logout(req: Request, res: Response) {
    const { _id } = req.user as UserDocument;

    ResetToken(res);

    await this.UserModel.findByIdAndUpdate(_id, { refreshToken: '' });

    res.status(200).end();
  }

  async getMe(res: Response, req: Request) {
    res
      .json({
        message: 'Success',
        status: 200,
        data: req.user as User,
      })
      .status(200);
  }

  async updateMe(res: Response, req: Request, body: updateUserDto) {
    const { _id } = req.user as UserDocument;

    const user = await this.UserModel.findById(_id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const updatedData = await user.updateOne(body, { new: true });

    res.json({
      message: 'User Updated',
      status: 200,
      data: updatedData,
    });
  }

  async updatePassword(res: Response, req: Request, body: updatePasswordDto) {
    const { _id } = req.user as UserDocument;

    const isExist: UserDocument | null =
      await this.UserModel.findById(_id).select('+password');

    if (!isExist) {
      throw new UnauthorizedException(
        'Session Expired',
        'Session Expired! Please Log In!',
      );
    }

    if (!(await isExist.comparePassword(body.oldPassword))) {
      throw new HttpException('Old Password is incorrect', 400);
    }

    if (body.password !== body.confirmPassword) {
      throw new HttpException('Password doesnt match', 400);
    }

    isExist.password = body.password;

    try {
      await isExist.save();

      ResetToken(res);
      await this.UserModel.findByIdAndUpdate(_id, { refreshToken: '' });

      return res.json({
        message: 'Password Updated',
        status: 201,
      });
    } catch (error) {
      logger.error(error);

      throw new InternalServerErrorException('Something is Wrong');
    }
  }

  async refreshToken(req: Request, res: Response) {
    const { access_token_jwt, refresh_token_jwt } =
      req.signedCookies as CookiesJWT;

    if (!refresh_token_jwt) {
      throw new UnauthorizedException(
        'Session Expired',
        'Session Expired! Please Log In!',
      );
    }

    const { id } = verify(
      refresh_token_jwt,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtGuardDto;

    const foundUser = await this.UserModel.findById(id).select('+refreshToken');

    if (!foundUser) {
      throw new UnauthorizedException(
        'Session Expired',
        'Session Expired! Please Log In!',
      );
    }

    if (!(await foundUser.compareRefreshToken(refresh_token_jwt))) {
      throw new UnauthorizedException(
        'Session Expired',
        'Session Expired! Please Log In!',
      );
    }

    foundUser.refreshToken = GenerateToken(GenerateTokenType.REFRESH_TOKEN, {
      id: foundUser._id,
    }) as string;

    await foundUser.save();

    res.cookie(
      'refresh_token_jwt',
      foundUser.refreshToken,
      RefreshCookiesConfig(),
    );

    res.cookie(
      'access_token_jwt',
      GenerateToken(GenerateTokenType.ACCESS_TOKEN, { id: foundUser._id }),
      AccessCookiesConfig(),
    );

    res.status(201).end();
  }
}
