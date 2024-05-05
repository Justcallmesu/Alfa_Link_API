import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ collection: 'customer' })
export class Customer {
  @Prop({
    type: String,
    unique: true,
    required: [true, 'Customer Full name is required'],
    minlength: [3, 'Customer Full name is too short'],
    maxlength: [100, 'Customer Full name is too long'],
    trim: true,
  })
  fullName: string;

  @Prop({
    type: String,
    required: [true, 'Customer email is required'],
    minlength: [3, 'Customer email is too short'],
    maxlength: [100, 'Customer email is too long'],
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Customer birthPlace is required'],
    minlength: [3, 'Customer birthPlace is too short'],
    maxlength: [100, 'Customer birthPlace is too long'],
    trim: true,
  })
  birthPlace: string;

  @Prop({
    type: Date,
    required: [true, 'Customer Birth Date is required'],
    trim: true,
  })
  birthDate: Date;

  @Prop({
    type: String,
    required: [true, 'Customer address is required'],
    minlength: [3, 'Customer address is too short'],
    maxlength: [100, 'Customer address is too long'],
    trim: true,
  })
  address: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  subscribeNews: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// Indexing
CustomerSchema.index({ fullName: 1, email: 1 }, { unique: true });
CustomerSchema.index({ fullName: 1 }, { unique: true });

CustomerSchema.index({ email: 1 }, { unique: true });
CustomerSchema.index({ subscribeNews: 1 });
