import { Customer, CustomerSchema } from '@/schemas/customer/Customer';
import { Module } from '@nestjs/common';

// Schema
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { MobilController } from './mobil.controller';

// Service
import { MobilService } from './mobil.service';
import { AuthModule } from '../auth/auth.module';
import { Mobil, MobilSchema } from '@/schemas/mobil/Mobil';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mobil.name, schema: MobilSchema }]),
    AuthModule,
  ],
  controllers: [MobilController],
  providers: [MobilService],
  exports: [],
})
export class MobilModule {}
