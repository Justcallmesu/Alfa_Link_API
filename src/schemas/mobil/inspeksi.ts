import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type InspeksiDocument = HydratedDocument<Inspeksi>;

@Schema()
export class Inspeksi {
  @Prop({
    type: Types.ObjectId,
    required: [true, 'Mobil is required'],
    ref: 'mobil',
  })
  mobil: Types.ObjectId;
}

export const InspeksiSchema = SchemaFactory.createForClass(Inspeksi);

InspeksiSchema.index({ id_mobil: 1 }, { unique: true });
