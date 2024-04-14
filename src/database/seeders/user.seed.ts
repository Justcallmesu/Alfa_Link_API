import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schema
import { User } from '@/schemas/auth/User';

@Injectable()
export class UserSeed {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  public async seed() {
    const log = new Logger(UserSeed.name);

    // User Data
    const data = [
      {
        name: 'Suwanto Ardi Winata',
        username: 'admin',
        password: 'superadmin',
      },
    ];
    try {
      this.UserModel.insertMany(data);
    } catch (error) {
      log.error('User Seeding Failed');
    }
  }
}
