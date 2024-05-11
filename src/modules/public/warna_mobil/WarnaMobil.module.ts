import { Module } from '@nestjs/common';

// Controller
import { WarnaMobilController } from './WarnaMobil.controller';

// Service
import { WarnaMobilService } from './WarnaMobil.service';

@Module({
  imports: [],
  controllers: [WarnaMobilController],
  providers: [WarnaMobilService],
  exports: [],
})
export class WarnaMobilModule {}
