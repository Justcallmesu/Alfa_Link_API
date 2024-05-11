import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModelMobilDocument = HydratedDocument<ModelMobil>;

@Schema({ collection: 'modelMobil' })
export class ModelMobil {
  @Prop({
    type: String,
    required: [true, 'Model Mobil is required'],
    trim: true,
    minlength: [3, 'Model Mobil must be at least 3 characters'],
    maxlength: [50, 'Model Mobil must be at most 50 characters'],
  })
  name: string;
}

export const ModelMobilSchema = SchemaFactory.createForClass(ModelMobil);

//  Indexing
ModelMobilSchema.index({ name: 1 }, { unique: true });
