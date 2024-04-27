import { Global, Module } from '@nestjs/common';

// Modules
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';

/**
 * Mobil
 */
import { JenisMobilModule } from './mobil_jenis/JenisMobil.Module';
import { MerkMobilModule } from './mobil_merk/MerkMobil.Module';
import { MobilModule } from './mobil/mobil.module';

@Global()
@Module({
  imports: [
    AuthModule,
    CustomerModule,
    // MobilModule,
    JenisMobilModule,
    MerkMobilModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PublicModule {}
