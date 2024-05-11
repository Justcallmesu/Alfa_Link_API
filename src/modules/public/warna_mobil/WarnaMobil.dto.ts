import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWarnaMobilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateWarnaMobilDto extends CreateWarnaMobilDto {}
