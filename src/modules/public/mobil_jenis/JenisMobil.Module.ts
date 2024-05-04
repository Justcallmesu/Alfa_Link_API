import { Module } from '@nestjs/common';

// Controller
import { JenisMobilController } from './JenisMobil.controller';

// Service
import { JenisMobilService } from './JenisMobil.service';

@Module({
  imports: [],
  controllers: [JenisMobilController],
  providers: [JenisMobilService],
  exports: [],
})
export class JenisMobilModule {}
