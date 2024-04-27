import { Customer, CustomerSchema } from '@/schemas/customer/Customer';
import { Module } from '@nestjs/common';

// Schema
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { MobilController } from './mobil.controller';

// Service
import { MobilService } from './mobil.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    AuthModule,
  ],
  controllers: [MobilController],
  providers: [MobilService],
  exports: [],
})
export class MobilModule {}
