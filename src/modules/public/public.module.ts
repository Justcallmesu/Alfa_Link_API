import { Global, Module } from '@nestjs/common';

// Modules
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';

@Global()
@Module({
  imports: [AuthModule, CustomerModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PublicModule {}
