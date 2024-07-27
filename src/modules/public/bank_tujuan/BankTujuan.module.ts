import { Module } from '@nestjs/common';
import { BankTujuanController } from './BankTujuan.controller';
import { BankTujuanService } from './BankTujuan.service';

@Module({
  controllers: [BankTujuanController],
  providers: [BankTujuanService],
})
export class BankTujuanModule {}
