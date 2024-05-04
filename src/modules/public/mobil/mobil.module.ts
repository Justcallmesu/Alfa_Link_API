import { Module } from '@nestjs/common';

// Controller
import { MobilController } from './mobil.controller';

// Service
import { MobilService } from './mobil.service';

@Module({
  imports: [],
  controllers: [MobilController],
  providers: [MobilService],
  exports: [],
})
export class MobilModule {}
