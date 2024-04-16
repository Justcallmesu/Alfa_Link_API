import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

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
import GenerateToken from '@/modules/common/function/GenerateToken.function';

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

    // Cookies Send
    res.cookie(
      'refresh_token_jwt',
      GenerateToken(GenerateTokenType.REFRESH_TOKEN, { id: user._id }),
      {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    );

    res.cookie(
      'access_token_jwt',
      GenerateToken(GenerateTokenType.ACCESS_TOKEN, { id: user._id }),
      {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 1000 * 60 * 15),
      },
    );

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
        'There is Username or Name that is already exist',
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

  async logout(res: Response) {
    res.cookie('refresh_token_jwt', '', {
      signed: true,
      expires: new Date(Date.now()),
    });
    res.cookie('access_token_jwt', '', {
      signed: true,
      expires: new Date(Date.now()),
    });

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

    const updatedUser = await user.updateOne(body);

    res.json({
      message: 'User Updated',
      status: 200,
      data: updatedUser,
    });
  }

  async updatePassword(res: Response, req: Request, body: updatePasswordDto) {}
}
