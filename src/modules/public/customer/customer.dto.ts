import {
  IsDate,
  IsEmail,
  IsNotEmpty,
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
  birth_place: string;

  @IsNotEmpty()
  @IsString()
  birth_date: Date;

  @IsNotEmpty()
  @IsString()
  address: string;

  subscribe_news?: boolean;
}

export interface UpdateCustomerDto extends CreateCustomerDto {}
