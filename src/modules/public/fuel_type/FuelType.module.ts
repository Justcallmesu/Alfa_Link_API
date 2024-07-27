import { Module } from '@nestjs/common';

// Controller
import { FuelTypeController } from './FuelType.controller';

// Service
import { FuelTypeService } from './FuelType.service';

@Module({
  imports: [],
  controllers: [FuelTypeController],
  providers: [FuelTypeService],
  exports: [],
})
export class FuelTypeModule {}
