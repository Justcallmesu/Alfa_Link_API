import { Global, Module } from '@nestjs/common';

// Modules
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';

/**
 * Mobil
 */
import { BodyStyleModule } from './body_style/BodyStyle.Module';
import { MerkMobilModule } from './mobil_merk/MerkMobil.Module';
import { MobilModule } from './mobil/mobil.module';
import { TipeMobilModule } from './mobil_tipe/TipeMobil.module';
import { PenjualanModule } from './penjualan/Penjualan.module';
import { WarnaMobilModule } from './warna_mobil/WarnaMobil.module';
import { FuelTypeModule } from './fuel_type/FuelType.module';
import { ModelMobilModule } from './model_mobil/ModelMobil.module';
import { InspeksiModule } from './inspeksi/inspeksi.module';
import { BankTujuanModule } from './bank_tujuan/BankTujuan.module';

@Global()
@Module({
  imports: [
    AuthModule,

    /**
     * Customer
     */
    CustomerModule,

    /**
     * Mobil Module
     */
    BodyStyleModule,
    MerkMobilModule,
    TipeMobilModule,
    WarnaMobilModule,
    MobilModule,
    FuelTypeModule,
    ModelMobilModule,
    InspeksiModule,

    /**
     * Penjualan
     */
    PenjualanModule,
    BankTujuanModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PublicModule {}
