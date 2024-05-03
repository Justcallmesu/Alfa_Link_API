import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { JenisMobil } from '@/schemas/mobil/mobil_properties/JenisMobil';
import { MerkMobil } from '@/schemas/mobil/mobil_properties/MerkMobil';
import { TipeMobil } from '@/schemas/mobil/mobil_properties/TipeMobil';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum StatusPajakMobil {
  HIDUP = 'Hidup',
  MATI = ' Mati',
  TERBLOKIR = 'Terblokir',
}

export enum TransmisiMobil {
  AT = 'AT',
  MT = 'MT',
}

export class CreateMobilDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  @CheckIsValidObjectId('merk')
  merk: MerkMobil;

  @IsNotEmpty()
  @CheckIsValidObjectId('jenis')
  jenis: JenisMobil;

  @IsNotEmpty()
  @CheckIsValidObjectId('tipe')
  tipe: TipeMobil;

  @IsNumber()
  @IsNotEmpty()
  tahunRakit: number;

  @IsString()
  @IsNotEmpty()
  transmisi: TransmisiMobil;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(9)
  noPolisi: string;

  @IsNumber()
  @IsNotEmpty()
  harga: number;

  @IsString()
  @IsNotEmpty()
  statusPajak: StatusPajakMobil;

  @IsNumber()
  @IsNotEmpty()
  totalPajak: number;
}

export class UpdateMobilDto extends CreateMobilDto {
  @IsString()
  @IsOptional()
  nama: string;

  @IsOptional()
  @CheckIsValidObjectId('merk')
  merk: MerkMobil;

  @IsOptional()
  @CheckIsValidObjectId('jenis')
  jenis: JenisMobil;

  @IsOptional()
  @CheckIsValidObjectId('tipe')
  tipe: TipeMobil;

  @IsNumber()
  @IsOptional()
  tahunRakit: number;

  @IsString()
  @IsOptional()
  transmisi: TransmisiMobil;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(9)
  noPolisi: string;

  @IsNumber()
  @IsOptional()
  harga: number;

  @IsString()
  @IsOptional()
  statusPajak: StatusPajakMobil;

  @IsNumber()
  @IsOptional()
  totalPajak: number;
}
