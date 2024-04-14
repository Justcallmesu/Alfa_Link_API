import { Module } from '@nestjs/common';

// Modules
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PublicModule {}
