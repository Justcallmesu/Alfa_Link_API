import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Penjualan {
  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID Customer is required'],
  })
  id_mobil: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID History is required'],
  })
  id_history: Types.ObjectId;

  @Prop({
    type: String,
    required: [true, 'Metode Pembayaran is required'],
    enum: {
      values: ['Cash', 'Kredit'],
      message: 'jenis_pembayaran must be either "Cash" or "Kredit"',
    },
    trim: true,
  })
  metode_pembayaran: string;

  @Prop({
    type: Number,
    required: [true, 'Total Harga is required'],
  })
  total_harga: number;

  @Prop({
    type: Date,
    required: true,
  })
  date_penjualan: Date;
}

export const PembayaranSchema = SchemaFactory.createForClass(Penjualan);

PembayaranSchema.index({ id_mobil: 1, id_history: 1 }, { unique: true });

PembayaranSchema.index({ date_penjualan: 1 });
PembayaranSchema.index({ metode_pembayaran: 1 });

PembayaranSchema.index({ id_history: 1 });
PembayaranSchema.index({ id_mobil: 1 });
