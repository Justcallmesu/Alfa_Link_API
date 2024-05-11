import { Prop, Schema } from '@nestjs/mongoose';

@Schema({})
export class InspeksiField {
  @Prop({
    type: Boolean,
  })
  isGood: boolean;

  @Prop({
    type: String,
  })
  description: string;
}
