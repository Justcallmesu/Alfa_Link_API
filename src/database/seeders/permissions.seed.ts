import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schema
import { Permissions } from '@/schemas/auth/Permissions';
import { PermissionsEnum } from '@/modules/common/enum/Permissions.enum';

@Injectable()
export class PermissionsSeed {
  constructor(
    @InjectModel(Permissions.name) private PermissionsModel: Model<Permissions>,
  ) {}

  public async seed() {
    const log = new Logger('PermissionsSeed');

    const getPermissionGroupName = (permission: string) => {
      const permissionGroup = permission.split('_');

      if (permissionGroup.length === 1) return permissionGroup[0];
      else
        return permissionGroup
          .filter((_, index) => {
            return index !== 0;
          })
          .join(' ');
    };

    // Permissions Data
    const data: Permissions[] = [
      ...Object.entries(PermissionsEnum).map(([key, value]) => ({
        permissionName: value,
        permissionDescription: `${value.split('_').join(' ')} Permission`,
        permissionGroup: getPermissionGroupName(value),
      })),
    ];

    console.log(data);

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
