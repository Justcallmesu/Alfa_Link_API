import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

// Schema
import { Pembayaran } from './NestedSchema/Pembayaran';

/**
 * Enum
 */
import { metodePembayaran } from '@/modules/public/penjualan/Penjualan.dto';

export type HistoryPembayaranDocument = HydratedDocument<HistoryPembayaran>;

@Schema({ collection: 'historyPembayaran' })
export class HistoryPembayaran {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'customer',
  })
  customer: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'penjualan',
  })
  penjualan: Types.ObjectId;

  @Prop({
    type: String,
    required: [true, 'Metode Pembayaran is required'],
    enum: {
      values: ['Cash', 'Kredit'],
      message: 'jenisPembayaran must be either "Cash" or "Kredit"',
    },
  })
  metodePembayaran: metodePembayaran;

  @Prop({
    type: Number,
    required: [true, 'Tanggal Pembayaran is required'],
    trim: true,
  })
  totalPembayaran: number;

  @Prop({
    type: Number,
    required: [true, 'Total Terbayar is required'],
    trim: true,
  })
  totalTerbayar: number;

  @Prop({
    type: Array<Pembayaran>,
    default: [],
  })
  historyPembayaran: Pembayaran[];
}

export const HistoryPembayaranSchema =
  SchemaFactory.createForClass(HistoryPembayaran);

// Indexing
HistoryPembayaranSchema.index({ customer: 1, penjualan: 1 }, { unique: true });

HistoryPembayaranSchema.index({ customer: 1 });
HistoryPembayaranSchema.index({ penjualan: 1 });
HistoryPembayaranSchema.index({ jenisPembayaran: 1 });
