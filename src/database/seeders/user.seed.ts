import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schema
import { User } from '@/schemas/auth/User';
import { Roles } from '@/schemas/auth/Roles';

@Injectable()
export class UserSeed {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Roles.name) private RolesModel: Model<Roles>,
  ) {}

  public async seed() {
    const log = new Logger('UserSeed');

    const role_id = await this.RolesModel.findOne({
      role_name: 'Super Admin',
    }).select('_id');

    // User Data
    const data = [
      {
        name: 'Suwanto Ardi Winata',
        username: 'admin',
        password: 'superadmin',
        role_id: role_id?._id,
      },
    ];

    try {
      Logger.log('User Seeding Started');

      await this.UserModel.deleteOne({
        username: 'admin',
      });
      await this.UserModel.insertMany(data);
    } catch (error) {
      log.error('User Seeding Failed');
      log.error(error.message);
    }
    Logger.log('User Seeding Completed');
  }
}
