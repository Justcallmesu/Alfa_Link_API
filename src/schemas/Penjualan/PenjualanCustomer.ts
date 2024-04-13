import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

// Schema
import { Customer } from '../customer/Customer';
import { Penjualan } from './Penjualan';

export type PenjualanCustomerDocument = HydratedDocument<Penjualan_Customer>;

@Schema()
export class Penjualan_Customer {
  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID Customer is required'],
    ref: 'customer',
  })
  id_customer: Customer;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'ID Penjualan is required'],
    ref: 'penjualan',
  })
  id_penjualan: Penjualan;
}

export const PenjualanCustomerSchema =
  SchemaFactory.createForClass(Penjualan_Customer);

//   Indexing
PenjualanCustomerSchema.index(
  { id_customer: 1, id_penjualan: 1 },
  { unique: true },
);

PenjualanCustomerSchema.index({ id_penjualan: 1 });
PenjualanCustomerSchema.index({ id_customer: 1 });
