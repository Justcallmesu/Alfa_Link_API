import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'mobil' })
export class Mobil {
  @Prop({
    type: Types.ObjectId,
  })
  id_inspeksi: Types.ObjectId;

  @Prop({
    type: String,
    required: [true, 'Merk is required'],
    trim: true,
    minlength: [3, 'Merk must be at least 3 characters'],
    maxlength: [50, 'Merk must be at most 50 characters'],
  })
  merk: string;

  @Prop({
    type: String,
    required: [true, 'Model is required'],
    trim: true,
    minlength: [3, 'Model must be at least 3 characters'],
    maxlength: [50, 'Model must be at most 50 characters'],
  })
  jenis: string;

  @Prop({
    type: String,
    required: [true, 'Tipe is required'],
    trim: true,
    minlength: [3, 'Tipe must be at least 3 characters'],
    maxlength: [50, 'Tipe must be at most 50 characters'],
  })
  tipe: string;

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
