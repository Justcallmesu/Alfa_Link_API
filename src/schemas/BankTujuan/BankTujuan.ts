import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BankTujuanDocument = HydratedDocument<BankTujuan>;

@Schema({ collection: 'BankTujuan' })
export class BankTujuan {
  @Prop({
    type: String,
    required: [true, 'Nama Bank is required'],
    trim: true,
  })
  bankName: string;

  @Prop({
    type: String,
    required: [true, 'No Rekening Is Required'],
  })
  bankNumber: string;

  @Prop({
    type: String,
    required: [true, 'Nama Pemilik Rekening is required'],
    trim: true,
  })
  bankOwnerName: string;
}

export const BankTujuanSchema = SchemaFactory.createForClass(BankTujuan);

BankTujuanSchema.index({ bankName: 1 }, { unique: true });
BankTujuanSchema.index({ bankNumber: 1 }, { unique: true });
