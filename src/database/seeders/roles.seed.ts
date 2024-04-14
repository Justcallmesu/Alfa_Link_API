import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schema
import { Roles } from '@/schemas/auth/Roles';

@Injectable()
export class RolesSeed {
  constructor(@InjectModel(Roles.name) private RolesModel: Model<Roles>) {}

  public async seed() {
    const log = new Logger('RolesSeed');

    // Roles Data
    const data = [
      {
        role_name: 'Super Admin',
        role_description: 'Super Admin Role, Full Access',
      },
    ];

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
