import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

// Schema
import { Mobil } from '../mobil/Mobil';
import { HistoryPembayaran } from '../customer/HistoryPembayaran';

export type PenjualanDocument = HydratedDocument<Penjualan>;

@Schema({
  collection: 'penjualan',
})
export class Penjualan {
  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID Customer is required'],
    ref: 'mobil',
  })
  mobil: Mobil;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID History is required'],
    ref: 'historyPembayaran',
  })
  history: HistoryPembayaran;

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
    type: Date,
    required: true,
  })
  tanggalPenjualan: Date;
}

export const PenjualanSchema = SchemaFactory.createForClass(Penjualan);

// Indexing
PenjualanSchema.index({ mobil: 1, history: 1 }, { unique: true });

PenjualanSchema.index({ tanggalPenjualan: 1 });
PenjualanSchema.index({ metodePemabayaran: 1 });

PenjualanSchema.index({ id_history: 1 });
PenjualanSchema.index({ mobil: 1 });
