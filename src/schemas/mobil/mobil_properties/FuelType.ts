import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FuelTypeDocument = HydratedDocument<FuelType>;

@Schema({ collection: 'fuelType' })
export class FuelType {
  @Prop({
    type: String,
    required: [true, 'Fuel Type is required'],
    trim: true,
    minlength: [3, 'Fuel Type must be at least 3 characters'],
    maxlength: [50, 'Fuel Type must be at most 50 characters'],
  })
  name: string;
}

export const FuelTypeSchema = SchemaFactory.createForClass(FuelType);

//  Indexing
FuelTypeSchema.index({ name: 1 }, { unique: true });
