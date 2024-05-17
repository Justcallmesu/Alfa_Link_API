import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTipeMobilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateTipeMobilDto extends CreateTipeMobilDto {}

export enum TipeMobilFilterEnum {
  NAME = 'name',
}
