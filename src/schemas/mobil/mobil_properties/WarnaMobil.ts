import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WarnaMobilDocument = HydratedDocument<WarnaMobil>;

@Schema({ collection: 'WarnaMobil' })
export class WarnaMobil {
  @Prop({
    type: String,
    required: [true, 'Warna Mobil is required'],
    trim: true,
    minlength: [3, 'Warna Mobil must be at least 3 characters'],
    maxlength: [50, 'Warna Mobil must be at most 50 characters'],
  })
  name: string;
}

export const WarnaMobilSchema = SchemaFactory.createForClass(WarnaMobil);

//  Indexing
WarnaMobilSchema.index({ name: 1 }, { unique: true });
