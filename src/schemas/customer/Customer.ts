import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'customer' })
export class Customer {
  @Prop({
    type: String,
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
    required: [true, 'Customer birth_place is required'],
    minlength: [3, 'Customer birth_place is too short'],
    maxlength: [100, 'Customer birth_place is too long'],
    trim: true,
  })
  birth_place: string;

  @Prop({
    type: Date,
    required: [true, 'Customer Date is required'],
    trim: true,
  })
  birth_date: Date;

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
  subscribe_news: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// Indexing
CustomerSchema.index({ fullname: 1, email: 1 }, { unique: true });
CustomerSchema.index({ fullname: 1 }, { unique: true });

CustomerSchema.index({ email: 1 }, { unique: true });
CustomerSchema.index({ subscribe_news: 1 }, { unique: true });
