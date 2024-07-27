import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBodyStyleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateBodyStyleDto extends CreateBodyStyleDto {}

export enum BodyStyleFilterEnum {
  NAME = 'name',
}
