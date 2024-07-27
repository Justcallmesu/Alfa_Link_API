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

export class CreateMerkMobilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateMerkMobilDto extends CreateMerkMobilDto {}

export enum MerkMobilFilterEnum {
  NAME = 'name',
}
