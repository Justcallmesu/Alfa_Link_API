import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  password: string;
}

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  role_id: string;
}

export class updateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsString()
  role_id?: string;
}

export class updatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  oldPassword: string;
}
