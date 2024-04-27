import {
  IsDate,
  IsEmail,
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

export class CreateMobilDto {
  @IsString()
  @IsNotEmpty()
  id_inspeksi: string;

  @IsString()
  @IsNotEmpty()
  merk: string;

  @IsString()
  @IsNotEmpty()
  jenis: string;

  @IsString()
  @IsNotEmpty()
  tipe: string;

  @IsDate()
  @IsNotEmpty()
  tahun_rakit: Date;

  @IsString()
  @IsNotEmpty()
  transmisi: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(9)
  plat_pol: string;

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

export interface UpdateMobilDto extends CreateMobilDto {}
