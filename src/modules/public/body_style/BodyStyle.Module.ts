import { Module } from '@nestjs/common';

// Controller
import { BodyStyleController } from './BodyStyle.controller';

// Service
import { BodyStyleService } from './BodyStyle.service';

@Module({
  imports: [],
  controllers: [BodyStyleController],
  providers: [BodyStyleService],
  exports: [],
})
export class BodyStyleModule {}
