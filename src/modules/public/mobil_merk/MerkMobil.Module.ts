import { Module } from '@nestjs/common';

// Controller
import { MerkMobilController } from './MerkMobil.controller';

// Service
import { MerkMobilService } from './MerkMobil.service';

@Module({
  imports: [],
  controllers: [MerkMobilController],
  providers: [MerkMobilService],
  exports: [],
})
export class MerkMobilModule {}
