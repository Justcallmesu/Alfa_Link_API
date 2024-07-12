import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

// Schema
import { MerkMobil } from './mobil_properties/MerkMobil';
import { TipeMobil } from './mobil_properties/TipeMobil';
import { Inspeksi } from './inspeksi';
import { BodyStyle } from './mobil_properties/BodyStyle';
import { StatusMobil } from '@/modules/public/mobil/mobil.dto';

export type MobilDocument = HydratedDocument<Mobil>;

@Schema({ collection: 'mobil' })
export class Mobil {
  @Prop({
    type: Types.ObjectId,
    ref: 'inspeksi',
  })
  inspeksi: Inspeksi;

  @Prop({
    type: String,
    required: [true, 'Nama Mobil is required'],
    trim: true,
    minlength: [3, 'Nama Mobil must be at least 3 characters'],
    maxlength: [50, 'Nama Mobil must be at most 50 characters'],
  })
  nama: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'merk',
  })
  merk: MerkMobil;

  @Prop({
    type: Types.ObjectId,
    ref: 'bodyStyle',
  })
  bodyStyle: BodyStyle;

  @Prop({
    type: Types.ObjectId,
    ref: 'warnaMobil',
  })
  warnaInterior: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'warnaMobil',
  })
  warnaExterior: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'fuelType',
  })
  jenisBahanBakar: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'tipe',
  })
  tipe: TipeMobil;

  @Prop({
    type: Number,
  })
  tahunRakit: number;

  @Prop({
    type: String,
    required: [true, 'Transmisi is required'],
    enum: {
      values: ['AT', 'MT'],
      message: 'Transmisi must be either AT or MT',
    },
  })
  transmisi: string;

  @Prop({
    type: String,
    required: [true, 'No Polisi is required'],
    trim: true,
  })
  noPolisi: string;

  @Prop({
    type: Number,
    required: [true, 'Harga is required'],
  })
  harga: number;

  @Prop({
    type: String,
    enum: {
      values: ['Hidup', 'Mati', 'Terblokir'],
      message: 'Status pajak must be either Hidup, Mati, or Terblokir',
    },
  })
  statusPajak: string;

  @Prop({
    type: Number,
  })
  totalPajak: number;

  @Prop({
    type: String,
    enum: {
      values: Object.values(StatusMobil),
      message: 'Status Mobil not valid',
      default: StatusMobil.NEW,
    },
  })
  status: StatusMobil;
}

export const MobilSchema = SchemaFactory.createForClass(Mobil);

// Indexing
MobilSchema.index({ inspeksi: 1 });

MobilSchema.index({ merk: 1 });
MobilSchema.index({ jenis: 1 });
MobilSchema.index({ tipe: 1 });
MobilSchema.index({ tahunRakit: 1 });
MobilSchema.index({ transmisi: 1 });
MobilSchema.index({ statusPajak: 1 });
MobilSchema.index({ harga: 1 });

MobilSchema.index({ noPolisi: 1 }, { unique: true });
