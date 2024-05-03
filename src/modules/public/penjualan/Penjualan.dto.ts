import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
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

  @CheckIsValidObjectId('history')
  history: HistoryPembayaran;

  @IsNotEmpty()
  @IsNumber()
  totalHarga: number;

  @IsNotEmpty()
  @IsDate()
  tangalPenjualan: Date;
}

export class UpdatePenjualanDto extends CreatePenjualanDto {}
