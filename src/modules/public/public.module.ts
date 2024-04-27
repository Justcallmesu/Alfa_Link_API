import { Global, Module } from '@nestjs/common';

// Modules
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { JenisMobilModule } from './mobil_jenis/JenisMobil';

@Global()
@Module({
  imports: [AuthModule, CustomerModule, JenisMobilModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PublicModule {}
