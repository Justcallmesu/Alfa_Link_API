import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { Customer } from '@/schemas/customer/Customer';
import { Mobil } from '@/schemas/mobil/Mobil';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

export enum metodePembayaran {
  CASH = 'Cash',
  KREDIT = 'Kredit',
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
  @Transform(({ value }) => new Date(value))
  tanggalPenjualan: Date;

  @IsNotEmpty()
  @CheckIsValidObjectId('customer')
  customer: Customer;
}
export class UpdatePenjualanDto {
  @IsNotEmpty()
  @IsEnum(metodePembayaran)
  metodePembayaran: metodePembayaran;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  tanggalPenjualan: Date;
}
