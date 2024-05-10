import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MerkMobilDocument = HydratedDocument<MerkMobil>;

@Schema({ collection: 'merkMobil' })
export class MerkMobil {
  @Prop({
    type: String,
    required: [true, 'Merk is required'],
    trim: true,
    minlength: [3, 'Merk must be at least 3 characters'],
    maxlength: [50, 'Merk must be at most 50 characters'],
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
  })
  imageUrl: string;
}

export const MerkMobilSchema = SchemaFactory.createForClass(MerkMobil);

//  Indexing
MerkMobilSchema.index({ name: 1 }, { unique: true });
