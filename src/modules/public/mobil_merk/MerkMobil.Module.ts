import { Module } from '@nestjs/common';

// Schema
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { MerkMobilController } from './MerkMobil.controller';

// Service
import { MerkMobilService } from './MerkMobil.service';

// Imports
import { AuthModule } from '../auth/auth.module';

// Model
import {
  MerkMobil,
  MerkMobilSchema,
} from '@/schemas/mobil/mobil_properties/MerkMobil';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MerkMobil.name, schema: MerkMobilSchema },
    ]),
    AuthModule,
  ],
  controllers: [MerkMobilController],
  providers: [MerkMobilService],
  exports: [
    MongooseModule.forFeature([
      { name: MerkMobil.name, schema: MerkMobilSchema },
    ]),
  ],
})
export class MerkMobilModule {}
