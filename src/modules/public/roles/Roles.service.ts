import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Roles } from '@/schemas/auth/Roles';
import { Response } from 'express';
import { MongoQuery } from '@/modules/common/class/MongoQuery.class';
import queryConstructor from '@/modules/common/function/queryConstructor';
import { getPagination } from '@/modules/common/function/pagination';
import { User } from '@/schemas/auth/User';
import { Permissions } from '@/schemas/auth/Permissions';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name) private readonly roleModel: Model<Roles>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Permissions.name)
    private readonly permissionsModel: Model<Permissions>,
  ) {}
  async findAll(res: Response, query: any) {
    const { filter, pagination, select, sort } = queryConstructor(query, [
      'roleName',
    ]);

    const mongoQueryMeta = await new MongoQuery(
      this.roleModel,
      { ...filter, roleName: { $ne: 'Super Admin' } },
      sort,
      select,
      pagination,
    )
      .filter()
      .sort()
      .select()
      .paginate();

    const roleDatas = await mongoQueryMeta.mongoQuery;

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: roleDatas,
      meta: await getPagination(roleDatas, pagination, this.roleModel),
    });
  }

  async getOne(res: Response, id: string) {
    const roleData = await this.roleModel.findById(id).populate({
      path: 'permissionsId',
      model: this.permissionsModel,
    });

    if (!roleData) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }

    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: roleData,
    });
  }

  async create(res: Response, body: any) {
    const roleData = await this.roleModel.create(body);

    return res.json({
      message: 'Data Created',
      status: '201',
      data: roleData,
    });
  }

  async update(res: Response, id: string, body: any) {
    const roleData = await this.roleModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!roleData) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }

    return res.json({
      message: 'Data Updated',
      status: '200',
      data: roleData,
    });
  }

  async delete(res: Response, id: string) {
    const roleData = await this.roleModel.findById(id);

    if (!roleData) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }

    const isRoleUsed = await this.userModel.findOne({ roleId: id });

    if (isRoleUsed) {
      throw new NotFoundException('Role Sudah Digunakan');
    }

    return res.json({
      message: 'Data Deleted',
      status: '200',
    });
  }
}
