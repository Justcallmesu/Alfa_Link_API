import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schema
import { Roles } from '@/schemas/auth/Roles';
import { Permissions } from '@/schemas/auth/Permissions';

@Injectable()
export class RolesSeed {
  constructor(
    @InjectModel(Roles.name) private RolesModel: Model<Roles>,
    @InjectModel(Permissions.name) private PermissionsModel: Model<Permissions>,
  ) {}

  public async seed() {
    const log = new Logger('RolesSeed');

    // Roles Data
    const data = [
      {
        role_name: 'Super Admin',
        role_description: 'Super Admin Role, Full Access',
        permissions_id: [await this.PermissionsModel.find({}).select('_id')],
      },
    ];
    console.log(data);
    try {
      Logger.log('Roles Seeding Started');

      await this.RolesModel.deleteMany({});
      await this.RolesModel.insertMany(data);
    } catch (error) {
      log.error('Roles Seeding Failed');
      log.error(error.message);
    }
    Logger.log('Roles Seeding Completed');
  }
}
