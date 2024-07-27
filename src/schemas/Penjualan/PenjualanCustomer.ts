import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type PenjualanCustomerDocument = HydratedDocument<PenjualanCustomer>;

@Schema({ collection: 'penjualan_customer' })
export class PenjualanCustomer {
  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID Customer is required'],
    ref: 'customer',
  })
  customer: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID Penjualan is required'],
    ref: 'penjualan',
  })
  penjualan: Types.ObjectId[];
}

export const PenjualanCustomerSchema =
  SchemaFactory.createForClass(PenjualanCustomer);

//   Indexing
PenjualanCustomerSchema.index({ customer: 1, penjualan: 1 }, { unique: true });
