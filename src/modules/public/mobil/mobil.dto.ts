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
  tahun_rakit: number;

  @IsString()
  @IsNotEmpty()
  transmisi: TransmisiMobil;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(9)
  no_polisi: string;

  @IsNumber()
  @IsNotEmpty()
  harga: number;

  @IsString()
  @IsNotEmpty()
  status_pajak: StatusPajakMobil;

  @IsNumber()
  @IsNotEmpty()
  total_pajak: number;
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
  tahun_rakit: number;

  @IsString()
  @IsOptional()
  transmisi: TransmisiMobil;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(9)
  no_polisi: string;

  @IsNumber()
  @IsOptional()
  harga: number;

  @IsString()
  @IsOptional()
  status_pajak: StatusPajakMobil;

  @IsNumber()
  @IsOptional()
  total_pajak: number;
}
