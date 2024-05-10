import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JenisMobilDocument = HydratedDocument<JenisMobil>;

@Schema({ collection: 'jenisMobil' })
export class JenisMobil {
  @Prop({
    type: String,
    required: [true, 'Jenis mobil is required'],
    trim: true,
    minlength: [3, 'Jenis mobil must be at least 3 characters'],
    maxlength: [50, 'Jenis mobil must be at most 50 characters'],
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
  })
  imageUrl: string;
}

export const JenisMobilSchema = SchemaFactory.createForClass(JenisMobil);

//  Indexing
JenisMobilSchema.index({ name: 1 }, { unique: true });
