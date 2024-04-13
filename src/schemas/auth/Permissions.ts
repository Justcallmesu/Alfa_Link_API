import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'permissions' })
export class Permissions {
  @Prop({
    type: String,
    required: [true, 'Permission name is required'],
    unique: true,
    immutable: true,
  })
  permission_name: string;

  @Prop({
    type: String,
    required: [true, 'Permission description is required'],
    immutable: true,
  })
  permission_description: string;
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
