import { Module } from '@nestjs/common';

// Schema
import { Mobil, MobilSchema } from '@/schemas/mobil/Mobil';
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { MobilController } from './mobil.controller';

// Service
import { MobilService } from './mobil.service';
import { AuthModule } from '../auth/auth.module';
import { JenisMobilModule } from '../mobil_jenis/JenisMobil.Module';
import { MerkMobilModule } from '../mobil_merk/MerkMobil.Module';
import { TipeMobilModule } from '../mobil_tipe/TipeMobil.module';

@Module({
  imports: [
    AuthModule,
    JenisMobilModule,
    MerkMobilModule,
    TipeMobilModule,
    MongooseModule.forFeature([{ name: Mobil.name, schema: MobilSchema }]),
  ],
  controllers: [MobilController],
  providers: [MobilService],
  exports: [
    MongooseModule.forFeature([{ name: Mobil.name, schema: MobilSchema }]),
  ],
})
export class MobilModule {}
