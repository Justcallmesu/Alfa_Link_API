import { IsNotEmpty, IsString } from 'class-validator';

export class ObjectIdParamsDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
