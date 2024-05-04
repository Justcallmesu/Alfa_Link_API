import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { Customer } from '@/schemas/customer/Customer';
import { HistoryPembayaran } from '@/schemas/customer/HistoryPembayaran';
import { Mobil } from '@/schemas/mobil/Mobil';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum metodePembayaran {
  CASH = 'CASH',
  KREDIT = 'KREDIT',
}

export class CreatePenjualanDto {
  @IsNotEmpty()
  @CheckIsValidObjectId('mobil')
  mobil: Mobil;

  @IsNotEmpty()
  @IsEnum(metodePembayaran)
  metodePembayaran: metodePembayaran;

  @IsNotEmpty()
  @IsDate()
  tanggalPenjualan: Date;

  @IsNotEmpty()
  @CheckIsValidObjectId('customer')
  customer: Customer;
}

export class UpdatePenjualanDto extends CreatePenjualanDto {}
