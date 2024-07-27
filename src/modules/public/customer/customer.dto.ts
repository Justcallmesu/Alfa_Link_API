import {
  IsBoolean,
  IsDate,
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

  @IsOptional()
  @IsString()
  nik: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  birthPlace: string;

  @IsOptional()
  @IsString()
  birthDate: Date;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  whatsappNumber: string;

  @IsOptional()
  @IsBoolean()
  subscribeNews?: boolean;
}

export interface UpdateCustomerDto extends CreateCustomerDto {}

export enum CustomerFilterQuery {
  FULLNAME = 'fullName',
  EMAIL = 'email',
  BIRTHPLACE = 'birthPlace',
  BIRTHDATE = 'birthDate',
  ADDRESS = 'address',
  SUBSCRIBENEWS = 'subscribeNews',
}
