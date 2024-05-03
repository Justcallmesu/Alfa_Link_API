import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export enum StatusPajakMobil {
  HIDUP = 'Hidup',
  MATI = ' Mati',
  TERBLOKIR = 'Terblokir',
}

export class CreateTipeMobilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateTipeMobilDto extends CreateTipeMobilDto {}
