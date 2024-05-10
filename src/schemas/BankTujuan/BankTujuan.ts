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
  namaBank: string;

  @Prop({
    type: String,
    required: [true, 'No Rekening Is Required'],
  })
  noRekening: string;

  @Prop({
    type: String,
    required: [true, 'Nama Pemilik Rekening is required'],
    trim: true,
  })
  namaPemilikRekening: string;
}

export const BankTujuanSchema = SchemaFactory.createForClass(BankTujuan);

BankTujuanSchema.index({ namaBank: 1 }, { unique: true });
BankTujuanSchema.index({ noRekening: 1 }, { unique: true });
BankTujuanSchema.index({ namaPemilikRekening: 1 });
