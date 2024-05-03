import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  birthPlace: string;

  @IsNotEmpty()
  @IsString()
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  subscribeNews?: boolean;
}

export interface UpdateCustomerDto extends CreateCustomerDto {}
