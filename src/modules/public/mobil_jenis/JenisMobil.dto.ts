import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  minLength,
} from 'class-validator';

export enum StatusPajakMobil {
  HIDUP = 'Hidup',
  MATI = ' Mati',
  TERBLOKIR = 'Terblokir',
}

export class CreateJenisMobilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateJenisMobilDto extends CreateJenisMobilDto {}
