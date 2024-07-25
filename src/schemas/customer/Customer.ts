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
    required: [true, 'Customer NIK is required'],
    minlength: [3, 'Customer NIK is too short'],
    maxlength: [100, 'Customer NIK is too long'],
    trim: true,
  })
  nik: string;

  @Prop({
    type: String,
    required: false,
    maxlength: [100, 'Customer email is too long'],
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: false,
    maxlength: [100, 'Customer birthPlace is too long'],
    trim: true,
  })
  birthPlace: string;

  @Prop({
    type: Date,
    required: false,
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
    type: String,
    required: [true, 'Customer phone number is required'],
    minlength: [3, 'Customer phone number is too short'],
    maxlength: [100, 'Customer phone number is too long'],
    trim: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: false,
    maxlength: [100, 'Customer whatsapp number is too long'],
    trim: true,
  })
  whatsappNumber: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// Indexing
CustomerSchema.index({ fullName: 1 }, { unique: true });

CustomerSchema.index({ subscribeNews: 1 });
