import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { Pagination } from '@/modules/common/interface/Pagination/Pagination.interface';
import { BodyStyle } from '@/schemas/mobil/mobil_properties/BodyStyle';
import { FuelType } from '@/schemas/mobil/mobil_properties/FuelType';
import { MerkMobil } from '@/schemas/mobil/mobil_properties/MerkMobil';
import { TipeMobil } from '@/schemas/mobil/mobil_properties/TipeMobil';
import {
  IsEnum,
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

  @CheckIsValidObjectId('merk')
  @IsOptional()
  merk: MerkMobil;

  @CheckIsValidObjectId('jenis')
  @IsOptional()
  bodyStyle: BodyStyle;

  @CheckIsValidObjectId('tipe')
  @IsOptional()
  tipe: TipeMobil;

  @CheckIsValidObjectId('warnaInterior')
  @IsOptional()
  warnaInterior: TipeMobil;

  @CheckIsValidObjectId('warnaExterior')
  @IsOptional()
  warnaExterior: TipeMobil;

  @CheckIsValidObjectId('fuelType')
  @IsOptional()
  jenisBahanBakar: FuelType;

  @IsNumber()
  @IsOptional()
  tahunRakit: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransmisiMobil)
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
  @IsOptional()
  statusPajak: StatusPajakMobil;

  @IsNumber()
  @IsOptional()
  totalPajak: number;
}

export class UpdateMobilDto extends CreateMobilDto {}

export enum MobilFilterEnum {
  NAMA = 'nama',
  MERK = 'merk',
  BODY_STYLE = 'bodyStyle',
  TIPE = 'tipe',
  WARNA_INTERIOR = 'warnaInterior',
  WARNA_EXTERIOR = 'warnaExterior',
}

export class MobilQueryDto extends Pagination {
  @IsOptional()
  @IsString()
  nama: string;

  @IsOptional()
  @CheckIsValidObjectId('merk')
  merk: string;

  @IsOptional()
  @CheckIsValidObjectId('jenis')
  bodyStyle: string;

  @IsOptional()
  @CheckIsValidObjectId('tipe')
  tipe: string;

  @IsOptional()
  @CheckIsValidObjectId('warnaInterior')
  warnaInterior: string;

  @IsOptional()
  @CheckIsValidObjectId('warnaExterior')
  warnaExterior: string;

  @IsOptional()
  @CheckIsValidObjectId('fuelType')
  jenisBahanBakar: string;

  @IsOptional()
  @IsNumber()
  tahunRakit: number;

  @IsOptional()
  @IsEnum(TransmisiMobil)
  transmisi: TransmisiMobil;
}
