import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permissions } from '@/schemas/auth/Permissions';
import { Response } from 'express';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permissions.name)
    private readonly permissionsModel: Model<Permissions>,
  ) {}
  async findAll(res: Response) {
    return res.json({
      message: 'Data Fetched',
      status: '200',
      data: await this.permissionsModel.find({}),
    });
  }
}
