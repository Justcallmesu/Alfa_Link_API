import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { BodyStyle } from '@/schemas/mobil/mobil_properties/BodyStyle';
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

  @CheckIsValidObjectId('tipe')
  @IsOptional()
  warnaInterior: TipeMobil;

  @CheckIsValidObjectId('tipe')
  @IsOptional()
  warnaExterior: TipeMobil;

  @CheckIsValidObjectId('tipe')
  @IsOptional()
  jenisBahanBakar: TipeMobil;

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
