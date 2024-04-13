import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TipeMobil {
  @Prop({
    type: String,
    required: [true, 'Tipe is required'],
    trim: true,
    minlength: [3, 'Tipe must be at least 3 characters'],
    maxlength: [50, 'Tipe must be at most 50 characters'],
  })
  tipe: string;
}

export const TipeMobilSchema = SchemaFactory.createForClass(TipeMobil);

//  Indexing
TipeMobilSchema.index({ tipe: 1 }, { unique: true });
