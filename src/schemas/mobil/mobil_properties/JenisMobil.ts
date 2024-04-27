import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JenisMobilDocument = HydratedDocument<JenisMobil>;

@Schema({ collection: 'jenis_mobil' })
export class JenisMobil {
  @Prop({
    type: String,
    required: [true, 'Jenis mobil is required'],
    trim: true,
    minlength: [3, 'Jenis mobil must be at least 3 characters'],
    maxlength: [50, 'Jenis mobil must be at most 50 characters'],
  })
  name: string;
}

export const JenisMobilSchema = SchemaFactory.createForClass(JenisMobil);

//  Indexing
JenisMobilSchema.index({ jenis_mobil: 1 }, { unique: true });
