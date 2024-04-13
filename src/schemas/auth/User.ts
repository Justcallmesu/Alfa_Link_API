import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, compare, hash } from 'bcrypt';
import { Types, HydratedDocument } from 'mongoose';
import { Roles } from './Roles';

export type UserDocument = HydratedDocument<User>;

// Schema
@Schema({ collection: 'users' })
export class User {
  @Prop({
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name is too short'],
    maxlength: [100, 'Name is too long'],
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username is too short'],
    maxlength: [50, 'Username is too long'],
    trim: true,
    unique: true,
    select: false,
  })
  username: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
    minlength: [10, 'Passw3ord is too short'],
    maxlength: [20, 'Passw3ord is too long'],
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    trim: true,
    select: false,
    unqiue: true,
  })
  refresh_token: string;

  @Prop({
    type: Types.ObjectId,
    trim: true,
    select: false,
    unqiue: true,
    ref: 'roles',
  })
  role_id: Roles;

  @Prop({
    type: Date,
    default: Date.now(),
    immutable: true,
  })
  date_created: Date;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  date_updated: Date;

  @Prop({
    type: Date,
    default: '',
  })
  date_deleted: Date;

  @Prop({
    type: String,
    enum: {
      values: ['active', 'inactive', 'deleted'],
      message: 'Invalid status',
    },
    default: 'active',
  })
  user_status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Methods
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await compare(candidatePassword, this.Password);
};

// Index
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ name: 1 });

// Middleware
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await genSalt(11);
    this.password = await hash(this.password, salt);
  }
  next();
});

UserSchema.pre('updateOne', async function (next) {
  this.set('date_updated', Date.now());

  if (this.get('password')) {
    const salt = await genSalt(11);
    this.set('password', await hash(this.get('password'), salt));
  }

  next();
});
