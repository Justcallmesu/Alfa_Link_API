import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '@/schemas/auth/User';
import { Response } from 'express';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import { getPagination } from '@/modules/common/function/pagination';
import { Roles } from '@/schemas/auth/Roles';
import { CreateUserDto, UpdateuserDto } from './Users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Roles.name) private readonly rolesModel: Model<Roles>,
  ) {}
  async findAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(query, [
      'name',
    ]);

    const mongoQueryMeta = await new MongoQuery(
      this.userModel,
      filter,
      sort,
      `${select ?? ''} +roleId`,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const userDatas = await mongoQueryMeta.mongoQuery.populate({
      path: 'roleId',
      model: this.rolesModel,
    });

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: userDatas,
      meta: await getPagination(userDatas, pagination, this.userModel),
    });
  }

  async getOne(res: Response, id: string) {
    const userData = await this.userModel.findById(id).populate({
      path: 'roleId',
      model: this.rolesModel,
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: userData,
    });
  }

  async create(res: Response, body: CreateUserDto) {
    const isRoleExist = await this.rolesModel.findById(body.roleId);

    if (!isRoleExist) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }

    const userData = await this.userModel.create(body);

    return res.json({
      message: 'User Created',
      status: '200',
      data: userData,
    });
  }

  async update(res: Response, id: string, body: UpdateuserDto) {
    const isRoleExist = await this.rolesModel.findById(body.roleId);

    if (!isRoleExist) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }

    const userData = await this.userModel.findById(id);

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    userData.set(body);
    await userData.save();

    return res.json({
      message: 'User Updated',
      status: '200',
      data: userData,
    });
  }

  async delete(res: Response, id: string) {
    const userData = await this.userModel.findByIdAndDelete(id);

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    return res.json({
      message: 'User Deleted',
      status: '200',
      data: userData,
    });
  }
}
