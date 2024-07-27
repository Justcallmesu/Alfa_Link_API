import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFuelTypeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export interface UpdateFuelTypeDto extends CreateFuelTypeDto {}

export enum FuelTypeFilterEnum {
  NAME = 'name',
}
