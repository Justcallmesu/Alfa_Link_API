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
  roleName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  roleDescription: string;

  @IsArray()
  @IsNotEmpty()
  permissionsId: string[];
}

export class UpdateRoleDto extends CreateRoleDto {}
