import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Pembayaran {
  @Prop({
    type: String,
    required: [true, 'Pembayaran via is required'],
    enum: {
      values: ['Cash', 'Transfer'],
      message: 'pembayaran_via must be either "Cash" or "Transfer"',
    },
    trim: true,
  })
  pembayaran_via: string;

  @Prop({
    type: Number,
    required: true,
  })
  jumlah_pembayaran: number;

  @Prop({
    type: String,
    required: [true, 'Nama Pembayar is required'],
    minlength: [3, 'Nama Pembayar is too short'],
    maxlength: [100, 'Nama Pembayar is too long'],
    trim: true,
  })
  nama_pembayar: string;

  @Prop({
    type: Date,
    required: [true, 'Tanggal Pembayaran is required'],
    default: Date.now(),
  })
  date_pembayaran: Date;
}
