import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Services
import { PenjualanService } from './Penjualan.service';

// Controllers
import { PenjualanController } from './Penjualan.controller';

// Schema
import { PenjualanSchema } from '@/schemas/Penjualan/Penjualan';
import { HistoryPembayaranModule } from '../history_pembayaran/history_pembayaran.module';
import { PenjualanCustomerModule } from '../penjualan_customer/Penjualan_Customer.module';
import { MobilModule } from '../mobil/mobil.module';
import { CustomerModule } from '../customer/customer.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Penjualan', schema: PenjualanSchema }]),

    /**
     * Schema Dependency
     */
    HistoryPembayaranModule,
    PenjualanCustomerModule,
    MobilModule,
    CustomerModule,
    AuthModule,
  ],
  controllers: [PenjualanController],
  providers: [PenjualanService],
  exports: [],
})
export class PenjualanModule {}
