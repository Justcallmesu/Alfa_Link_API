import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type PenjualanDocument = HydratedDocument<Penjualan>;

@Schema({
  collection: 'penjualan',
})
export class Penjualan {
  @Prop({
    type: Types.ObjectId,
    required: [true, 'Mobil is required'],
    ref: 'mobil',
  })
  mobil: Types.ObjectId;

  @Prop({
    type: String,
    required: [true, 'Metode Pembayaran is required'],
    enum: {
      values: ['Cash', 'Kredit'],
      message: 'Metode Pembayaran must be either "Cash" or "Kredit"',
    },
    trim: true,
  })
  metodePembayaran: string;

  @Prop({
    type: Number,
    required: [true, 'Total Harga is required'],
  })
  totalHarga: number;

  @Prop({
    type: Boolean,
  })
  isDP: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  TotalDP: number;

  @Prop({
    type: Number,
    default: 0,
  })
  TotalTerbayar: number;

  @Prop({
    type: Number,
    required: [true, 'Total Sisa is required'],
  })
  totalSisa: number;

  @Prop({
    type: Date,
    required: true,
  })
  tanggalPenjualan: Date;
}

export const PenjualanSchema = SchemaFactory.createForClass(Penjualan);

// Indexing
PenjualanSchema.index({ mobil: 1 }, { unique: true });

PenjualanSchema.index({ tanggalPenjualan: 1 });
PenjualanSchema.index({ metodePembayaran: 1 });

PenjualanSchema.index({ mobil: 1 });
