import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionsDocument = HydratedDocument<Permissions>;

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

  @Prop({
    type: String,
    required: [true, 'Permission Group is required'],
    immutable: true,
  })
  permission_group: string;
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
