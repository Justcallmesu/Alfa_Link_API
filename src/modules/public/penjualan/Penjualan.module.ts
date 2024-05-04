import { Module } from '@nestjs/common';

// Services
import { PenjualanService } from './Penjualan.service';

// Controllers
import { PenjualanController } from './Penjualan.controller';

@Module({
  imports: [],
  controllers: [PenjualanController],
  providers: [PenjualanService],
  exports: [],
})
export class PenjualanModule {}
