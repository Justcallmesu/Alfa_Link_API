import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BodyStyleDocument = HydratedDocument<BodyStyle>;

@Schema({ collection: 'bodyStyle' })
export class BodyStyle {
  @Prop({
    type: String,
    required: [true, 'Body Style is required'],
    trim: true,
    minlength: [3, 'Body Style must be at least 3 characters'],
    maxlength: [50, 'Body Style must be at most 50 characters'],
  })
  name: string;
}

export const BodyStyleSchema = SchemaFactory.createForClass(BodyStyle);

//  Indexing
BodyStyleSchema.index({ name: 1 }, { unique: true });
