import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankTujuanDto {
  @IsString()
  @IsNotEmpty()
  namaBank: string;

  @IsString()
  @IsNotEmpty()
  noRekening: string;

  @IsString()
  @IsNotEmpty()
  namaPemilikRekening: string;
}

export class UpdateBankTujuanDto extends CreateBankTujuanDto {}

export enum BankTujuanFilterEnum {
  NAMA_BANK = 'namaBank',
}
