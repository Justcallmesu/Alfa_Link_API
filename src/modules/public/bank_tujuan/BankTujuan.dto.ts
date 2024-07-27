import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankTujuanDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  bankNumber: string;

  @IsString()
  @IsNotEmpty()
  bankOwnerName: string;
}

export class UpdateBankTujuanDto extends CreateBankTujuanDto {}

export enum BankTujuanFilterEnum {
  BANK_NAME = 'bankName',
}
