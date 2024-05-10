import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { PenjualanStatus } from '@/modules/common/enum/penjualan/PenjualanEnum';
import { Customer } from '@/schemas/customer/Customer';
import { Mobil } from '@/schemas/mobil/Mobil';
import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  isDP: boolean;

  @IsNumber()
  @Optional()
  totalDP: number;

  @IsNumber()
  @Optional()
  totalTerbayar: number;

  @IsString()
  @IsEnum(PenjualanStatus)
  status: PenjualanStatus;
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
