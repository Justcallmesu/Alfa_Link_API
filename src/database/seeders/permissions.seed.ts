import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schema
import { Permissions } from '@/schemas/auth/Permissions';

@Injectable()
export class PermissionsSeed {
  constructor(
    @InjectModel(Permissions.name) private PermissionsModel: Model<Permissions>,
  ) {}

  public async seed() {
    const log = new Logger('PermissionsSeed');

    // Permissions Data
    const data = [
      {
        permission_name: 'Create User',
        permission_description: 'Create User Permission',
      },
      {
        permission_name: 'Read User',
        permission_description: 'Read User Permission',
      },
      {
        permission_name: 'Update User',
        permission_description: 'Update User Permission',
      },
      {
        permission_name: 'Delete User',
        permission_description: 'Delete User Permission',
      },
      {
        permission_name: 'Create Role',
        permission_description: 'Create Role Permission',
      },
      {
        permission_name: 'Read Role',
        permission_description: 'Read Role Permission',
      },
      {
        permission_name: 'Update Role',
        permission_description: 'Update Role Permission',
      },
      {
        permission_name: 'Delete Role',
        permission_description: 'Delete Role Permission',
      },
    ];

    try {
      Logger.log('Permissions Seeding Started');

      await this.PermissionsModel.deleteMany({});
      await this.PermissionsModel.insertMany(data);
    } catch (error) {
      log.error('Permissions Seeding Failed');
      log.error(error.message);
    }
    Logger.log('Permissions Seeding Completed');
  }
}
