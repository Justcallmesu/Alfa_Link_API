import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { InspeksiField } from './inspeksi_partials/InspeksiSchema';

export type InspeksiDocument = HydratedDocument<Inspeksi>;

@Schema({ collection: 'inspeksi' })
export class Inspeksi {
  /**
   * General
   */
  @Prop({
    type: Types.ObjectId,
    required: [true, 'Mobil is required'],
    ref: 'mobil',
  })
  mobil: Types.ObjectId;

  @Prop({
    type: String,
  })
  catatan: string;

  /**
   * ! Kelengkapan
   */
  @Prop({
    type: InspeksiField,
  })
  ketebalanBanBenjolan: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  bautBan: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  tekananAngin: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  klakson: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  pemantikApi: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  speaker: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  tutupDerek: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  spionElektrik: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  dongkrakKunciBan: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  bukuManual: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  radioTvCd: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  antena: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  dopVelg: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  kunciSerap: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  jok: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  lampuPlafonPutihOrange: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  gagangPintu: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  catBawhBesi: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  sarungJok: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  karpetDasar: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  kameraMundur: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  lampuPlafon: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  spoiler: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  talangAir: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  pelindungLumpur: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  aksesoris: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  kacaFilm: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  setir: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  lampuLuarNyalaBening: InspeksiField;

  /**
   * ! Kebersihan
   */

  @Prop({
    type: InspeksiField,
  })
  mesin: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  kilatBody: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  lampu: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  celahPintu: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  plafon: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  bagasi: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  plastikHitamCat: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  logo: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  bodyPlastikDalamTopi: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  lubangBensin: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  dashboardSaku: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  dongkrak: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  kebersihanSarungJok: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  sabuk: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  kulitPedalTransmisi: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  catLebih: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  catBawah: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  karat: InspeksiField;

  /**
   *! Mesin
   */
  @Prop({
    type: InspeksiField,
  })
  oli: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  airRadiator: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  airWiper: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  suaraMesin: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  vanBelt: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  minyakRem: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  filterUdaraMesinAc: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  airAkiPenjepitAki: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  karatMesin: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  peredamSuaraPanas: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  cekakKancingLuarDalam: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  kabel: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  minyakKilat: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  powerSteering: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  transmisi: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  rem: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  gardan: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  airConditioner: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  lampuIndikator: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  shockPintu: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  wiperKaretWiper: InspeksiField;

  @Prop({
    type: InspeksiField,
  })
  powerWindow: InspeksiField;
}

export const InspeksiSchema = SchemaFactory.createForClass(Inspeksi);

InspeksiSchema.index({ mobil: 1 }, { unique: true });
