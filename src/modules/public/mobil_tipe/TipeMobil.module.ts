import { Module } from '@nestjs/common';

// Controller
import { TipeMobilController } from './TipeMobil.controller';

// Service
import { TipeMobilservice } from './TipeMobil.service';

@Module({
  imports: [],
  controllers: [TipeMobilController],
  providers: [TipeMobilservice],
  exports: [],
})
export class TipeMobilModule {}
