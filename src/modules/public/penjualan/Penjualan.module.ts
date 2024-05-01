import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Services
import { PenjualanService } from './Penjualan.service';

// Controllers
import { PenjualanController } from './Penjualan.controller';

// Schema
import { PenjualanCustomerSchema } from '@/schemas/Penjualan/PenjualanCustomer';
import { PenjualanSchema } from '@/schemas/Penjualan/Penjualan';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Penjualan_Customer', schema: PenjualanCustomerSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Penjualan', schema: PenjualanSchema }]),
  ],
  controllers: [PenjualanController],
  providers: [PenjualanService],
  exports: [],
})
export class PenjualanModule {}
