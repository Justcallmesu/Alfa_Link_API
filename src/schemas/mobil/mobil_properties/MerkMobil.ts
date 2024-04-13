import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MerkMobil {
  @Prop({
    type: String,
    required: [true, 'Merk is required'],
    trim: true,
    minlength: [3, 'Merk must be at least 3 characters'],
    maxlength: [50, 'Merk must be at most 50 characters'],
  })
  merk: string;
}

export const MerkMobilSchema = SchemaFactory.createForClass(MerkMobil);

//  Indexing
MerkMobilSchema.index({ merk: 1 }, { unique: true });
