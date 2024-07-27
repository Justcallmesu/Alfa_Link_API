import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

import { Permissions } from './Permissions';

export type RolesDocument = HydratedDocument<Roles>;

@Schema({ collection: 'roles' })
export class Roles {
  @Prop({
    type: String,
    required: [true, 'Role name is required'],
    minlength: [3, 'Role name is too short'],
    maxlength: [50, 'Role name is too long'],
    trim: true,
    unique: true,
  })
  roleName: string;

  @Prop({
    type: String,
    required: [true, 'Role description is required'],
    minlength: [3, 'Role description is too short'],
    maxlength: [100, 'Role description is too long'],
    trim: true,
  })
  roleDescription: string;

  @Prop({
    type: Array<Types.ObjectId>,
    required: [true, 'Role permissions are required'],
    ref: 'permissions',
  })
  permissionsId: Permissions[];

  @Prop({
    type: Date,
    default: Date.now(),
    immutable: true,
  })
  dateCreated: Date;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);

RolesSchema.index({ roleName: 1 }, { unique: true });
