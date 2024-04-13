import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

// Schema
import { MerkMobil } from './mobil_properties/MerkMobil';
import { JenisMobil } from './mobil_properties/JenisMobil';
import { TipeMobil } from './mobil_properties/TipeMobil';
import { Inspeksi } from './inspeksi';

export type MobilDocument = HydratedDocument<Mobil>;

@Schema({ collection: 'mobil' })
export class Mobil {
  @Prop({
    type: Types.ObjectId,
  })
  id_inspeksi: Inspeksi;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'Merk is required'],
    ref: 'merk',
  })
  merk: MerkMobil;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'Jenis is required'],
    ref: 'jenis',
  })
  jenis: JenisMobil;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'Tipe is required'],
    ref: 'tipe',
  })
  tipe: TipeMobil;

  @Prop({
    type: Date,
    required: [true, 'Tahun rakit is required'],
  })
  tahun_rakit: Date;

  @Prop({
    type: String,
    required: [true, 'Transmisi is required'],
    enum: {
      values: ['manual', 'matic'],
      message: 'Transmisi must be either manual or matic',
    },
  })
  transmisi: string;

  @Prop({
    type: String,
    required: [true, 'Warna is required'],
    trim: true,
    minlength: [5, 'Warna must be at least 4 characters'],
    maxlength: [9, 'Warna must be at most 9 characters'],
  })
  no_polisi: string;

  @Prop({
    type: Number,
    required: [true, 'Harga is required'],
  })
  harga: number;

  @Prop({
    type: String,
    required: [true, 'Status pajak is required'],
    enum: {
      values: ['hidup', 'mati', 'terblokir'],
      message: 'Status pajak must be either hidup, mati, or terblokir',
    },
  })
  status_pajak: string;

  @Prop({
    type: Number,
    required: [true, 'Total pajak is required'],
  })
  total_pajak: number;
}

export const MobilSchema = SchemaFactory.createForClass(Mobil);

// Indexing
MobilSchema.index({ id_inspeksi: 1 });

MobilSchema.index({ merk: 1 });
MobilSchema.index({ jenis: 1 });
MobilSchema.index({ tipe: 1 });
MobilSchema.index({ tahun_rakit: 1 });
MobilSchema.index({ transmisi: 1 });
MobilSchema.index({ status_pajak: 1 });
MobilSchema.index({ harga: 1 });

MobilSchema.index({ no_polisi: 1 }, { unique: true });
