import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, compare, hash } from 'bcrypt';
import { Types, HydratedDocument } from 'mongoose';
import { Roles } from './Roles';
import { isArray } from 'class-validator';

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
  })
  username: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    trim: true,
    select: false,
    unqiue: true,
  })
  refreshToken: string;

  @Prop({
    type: Types.ObjectId,
    trim: true,
    select: false,
    ref: 'roles',
  })
  roleId: Roles;

  @Prop({
    type: Date,
    default: Date.now(),
    immutable: true,
  })
  dateCreated: Date;

  comparePassword: (candidatePassword: string) => Promise<boolean>;

  compareRefreshToken: (candidateRefreshToken: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Methods
UserSchema.method(
  'comparePassword',
  async function (candidatePassword: string): Promise<boolean> {
    return await compare(candidatePassword, this.password);
  },
);

UserSchema.method(
  'compareRefreshToken',
  async function (candidateRefreshToken: string): Promise<boolean> {
    return await compare(candidateRefreshToken, this.refreshToken);
  },
);

// Index
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ name: 1 });

// Middleware
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await genSalt(11);
    this.password = await hash(this.password, salt);
  }

  if (this.isModified('refreshToken')) {
    const salt = await genSalt(11);
    this.refreshToken = await hash(this.refreshToken, salt);
  }

  next();
});

UserSchema.pre('insertMany', async function (next, docs: Array<User>) {
  if (isArray(docs) && docs.length) {
    const hashedDocs: Promise<User>[] = docs.map(async (doc) => {
      const salt = await genSalt(11);
      doc.password = await hash(doc.password, salt);
      return doc;
    });

    docs = await Promise.all(hashedDocs);
  }
  next;
});

UserSchema.pre('updateOne', async function (next) {
  this.set('date_updated', Date.now());

  if (this.get('password')) {
    const salt = await genSalt(11);
    this.set('password', await hash(this.get('password'), salt));
  }

  if (this.get('refresh_token')) {
    const salt = await genSalt(11);
    this.set('refresh_token', await hash(this.get('refresh_token'), salt));
  }

  next();
});
