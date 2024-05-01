export class CreateDto {
  name: string;
  age: number;
}

export class UpdateDto extends CreateDto {
  name: string;
  age: number;
}
