import { Module } from '@nestjs/common';

// Controller
import { ModelMobilController } from './ModelMobil.controller';

// Service
import { ModelMobilService } from './ModelMobil.service';

@Module({
  imports: [],
  controllers: [ModelMobilController],
  providers: [ModelMobilService],
  exports: [],
})
export class ModelMobilModule {}
