import { Global, Module } from '@nestjs/common';

// Modules
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';

/**
 * Mobil
 */
import { JenisMobilModule } from './body_style/BodyStyle.Module';
import { MerkMobilModule } from './mobil_merk/MerkMobil.Module';
import { MobilModule } from './mobil/mobil.module';
import { TipeMobilModule } from './mobil_tipe/TipeMobil.module';
import { PenjualanModule } from './penjualan/Penjualan.module';

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
    JenisMobilModule,
    MerkMobilModule,
    TipeMobilModule,
    MobilModule,

    /**
     * Penjualan
     */
    PenjualanModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PublicModule {}
