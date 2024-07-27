import { Prop, Schema } from '@nestjs/mongoose';

@Schema({})
export class InspeksiField {
  @Prop({
    type: Boolean,
  })
  isOk: boolean;

  @Prop({
    type: String,
  })
  description: string;
}
