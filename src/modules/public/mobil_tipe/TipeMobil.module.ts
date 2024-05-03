import { Module } from '@nestjs/common';

// Schema
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { TipeMobilController } from './TipeMobil.controller';

// Service
import { TipeMobilservice } from './TipeMobil.service';

// Imports
import { AuthModule } from '../auth/auth.module';

// Model
import {
  TipeMobil,
  TipeMobilSchema,
} from '@/schemas/mobil/mobil_properties/TipeMobil';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TipeMobil.name, schema: TipeMobilSchema },
    ]),
    AuthModule,
  ],
  controllers: [TipeMobilController],
  providers: [TipeMobilservice],
  exports: [
    MongooseModule.forFeature([
      { name: TipeMobil.name, schema: TipeMobilSchema },
    ]),
  ],
})
export class TipeMobilModule {}
