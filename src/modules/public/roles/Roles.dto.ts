import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  role_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  role_description: string;

  @IsArray()
  @IsNotEmpty()
  permissions_id: string[];
}

export class UpdateRoleDto extends CreateRoleDto {}
