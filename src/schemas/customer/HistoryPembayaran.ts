import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Schema
import { Customer } from './Customer';
import { Pembayaran } from './NestedSchema/Pembayaran';
import { Penjualan } from '../penjualan/Penjualan';

@Schema({ collection: 'history_pembayaran' })
export class HistoryPembayaran {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'customer',
  })
  id_customer: Customer;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'penjualan',
  })
  id_penjualan: Penjualan;

  @Prop({
    type: String,
    required: [true, 'Metode Pembayaran is required'],
    enum: {
      values: ['Cash', 'Kredit'],
      message: 'jenis_pembayaran must be either "Cash" or "Kredit"',
    },
  })
  jenis_pembayaran: string;

  @Prop({
    type: Number,
    required: [true, 'Tanggal Pembayaran is required'],
    trim: true,
  })
  total_pembayaran: number;

  @Prop({
    type: Number,
    required: [true, 'Total Terbayar is required'],
    trim: true,
  })
  total_terbayar: number;

  @Prop({
    type: Array<Pembayaran>,
    default: [],
  })
  history_pembayaran: Pembayaran[];
}

export const HistoryPembayaranSchema =
  SchemaFactory.createForClass(HistoryPembayaran);

// Indexing
HistoryPembayaranSchema.index(
  { id_customer: 1, id_penjualan: 1 },
  { unique: true },
);

HistoryPembayaranSchema.index({ id_customer: 1 });
HistoryPembayaranSchema.index({ id_penjualan: 1 });
HistoryPembayaranSchema.index({ jenis_pembayaran: 1 });

HistoryPembayaranSchema.index({ date_pembelian: 1 });
