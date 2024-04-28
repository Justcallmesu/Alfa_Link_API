import { Module } from '@nestjs/common';

// Schema
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { JenisMobilController } from './JenisMobil.controller';

// Service
import { JenisMobilService } from './JenisMobil.service';

// Imports
import { AuthModule } from '../auth/auth.module';

import {
  JenisMobil,
  JenisMobilSchema,
} from '@/schemas/mobil/mobil_properties/JenisMobil';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JenisMobil.name, schema: JenisMobilSchema },
    ]),
    AuthModule,
  ],
  controllers: [JenisMobilController],
  providers: [JenisMobilService],
  exports: [
    MongooseModule.forFeature([
      { name: JenisMobil.name, schema: JenisMobilSchema },
    ]),
  ],
})
export class JenisMobilModule {}
