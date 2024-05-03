import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ collection: 'pembayaran' })
export class Pembayaran {
  @Prop({
    type: String,
    required: [true, 'Pembayaran via is required'],
    enum: {
      values: ['Cash', 'Transfer'],
      message: 'pembayaranVia must be either "Cash" or "Transfer"',
    },
    trim: true,
  })
  pembayaranVia: string;

  @Prop({
    type: Number,
    required: true,
  })
  jumlahPembayaran: number;

  @Prop({
    type: String,
    required: [true, 'Nama Pembayar is required'],
    minlength: [3, 'Nama Pembayar is too short'],
    maxlength: [100, 'Nama Pembayar is too long'],
    trim: true,
  })
  namaPembayar: string;

  @Prop({
    type: Date,
    required: [true, 'Tanggal Pembayaran is required'],
    default: Date.now(),
  })
  tanggalPembayaran: Date;
}
