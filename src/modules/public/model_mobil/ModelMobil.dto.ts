import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateModelMobilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateModelMobilDto extends CreateModelMobilDto {}

export enum ModelMobilFilterEnum {
  NAME = 'name',
}
