import {
  IsString,
  IsOptional,
  ValidateNested,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { CheckIsValidObjectId } from '@/modules/common/decorators/Class-Custom-Validator/IsValidObjectId';
import { Pagination } from '@/modules/common/interface/Pagination/Pagination.interface';

class InspeksiFieldDTO {
  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isOk: boolean;
}

export class CreateInspeksiDTO {
  @CheckIsValidObjectId('mobil')
  @IsNotEmpty()
  mobil: Types.ObjectId;

  @IsString()
  @IsOptional()
  catatan: string;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  ketebalanBanBenjolan: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  bautBan: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  tekananAngin: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  klakson: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  pemantikApi: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  speaker: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  tutupDerek: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  spionElektrik: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  dongkrakKunciBan: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  bukuManual: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  radioTvCd: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  antena: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  dopVelg: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  kunciSerap: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  jok: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  lampuPlafonPutihOrange: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  gagangPintu: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  catBawhBesi: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  sarungJok: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  karpetDasar: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  kameraMundur: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  lampuPlafon: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  spoiler: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  talangAir: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  pelindungLumpur: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  aksesoris: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  kacaFilm: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  setir: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  lampuLuarNyalaBening: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  mesin: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  kilatBody: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  lampu: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  celahPintu: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  plafon: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  bagasi: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  plastikHitamCat: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  logo: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  bodyPlastikDalamTopi: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  lubangBensin: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  dashboardSaku: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  dongkrak: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  kebersihanSarungJok: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  sabuk: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  kulitPedalTransmisi: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  catLebih: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  catBawah: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  karat: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  oli: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  airRadiator: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  airWiper: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  suaraMesin: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  vanBelt: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  minyakRem: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  filterUdaraMesinAc: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  airAkiPenjepitAki: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  karatMesin: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  peredamSuaraPanas: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  cekakKancingLuarDalam: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  kabel: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  minyakKilat: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  powerSteering: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  transmisi: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  rem: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  gardan: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  airConditioner: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  lampuIndikator: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  shockPintu: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  wiperKaretWiper: InspeksiFieldDTO;

  @ValidateNested()
  @Type(() => InspeksiFieldDTO)
  powerWindow: InspeksiFieldDTO;
}

export class UpdateInspeksiDTO extends CreateInspeksiDTO {}

export enum InspeksiFilterEnum {
  mobil = 'mobil',
}

export class InspeksiQueryDto extends Pagination {
  @IsOptional()
  @CheckIsValidObjectId('mobil')
  mobil: string;
}
