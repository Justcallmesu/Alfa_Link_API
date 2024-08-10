import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { Pagination } from '@/modules/common/interface/Pagination/Pagination.interface';
import { BodyStyle } from '@/schemas/mobil/mobil_properties/BodyStyle';
import { FuelType } from '@/schemas/mobil/mobil_properties/FuelType';
import { MerkMobil } from '@/schemas/mobil/mobil_properties/MerkMobil';
import { ModelMobil } from '@/schemas/mobil/mobil_properties/Model';
import { TipeMobil } from '@/schemas/mobil/mobil_properties/TipeMobil';
import {
  IsBoolean,
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

export enum StatusMobil {
  NEW = 'Baru',
  INSPECTION = 'Inspeksi',
  Ready = 'Siap',
  SERVICE = 'Servis',
  POST = 'Sedang Dijual',
  SOLD = 'Terjual',
}

export class CreateMobilDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @CheckIsValidObjectId('merk')
  @IsOptional()
  merk: MerkMobil;

  @CheckIsValidObjectId('bodyStyle')
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

  @CheckIsValidObjectId('model')
  @IsOptional()
  model: ModelMobil;

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

  @IsOptional()
  @IsEnum(StatusMobil)
  status: StatusMobil;
}

export class UpdateMobilDto extends CreateMobilDto {
  @IsOptional()
  @IsEnum(StatusMobil)
  status: StatusMobil;
}

export class UpdateMobilStatusDto {
  @IsNotEmpty()
  @IsEnum(StatusMobil)
  status: StatusMobil;
}

export enum MobilFilterEnum {
  NAMA = 'nama',
  MERK = 'merk',
  BODY_STYLE = 'bodyStyle',
  TIPE = 'tipe',
  WARNA_INTERIOR = 'warnaInterior',
  WARNA_EXTERIOR = 'warnaExterior',
  JENIS_BAHAN_BAKAR = 'jenisBahanBakar',
  TAHUN_RAKIT = 'tahunRakit',
  TRANSMISI = 'transmisi',
  STATUS = 'status',
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


  @IsOptional()
  @IsBoolean()
  isNotInspected: boolean;
}
