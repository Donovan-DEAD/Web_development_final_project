import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  name: string;
  perms: string;
  permsLabel: string;
  hash?: string;
  salt?: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  perms: { type: String, required: true },
  hash: { type: String },
  salt: { type: String },
});

// This replaces the permsMap and virtual property for a more direct approach in a modern setup.
// The logic can be handled in the application layer when needed.
// If you want to keep it, you can define a virtual property like this:
const permsMap: { [key: string]: string } = {
  [process.env.ADMIN_PERM_STR || 'admin_perm']: 'admin',
  [process.env.USER_PERM_STR || 'user_perm']: 'user',
  [process.env.EDITOR_PERM_STR || 'editor_perm']: 'editor'
};

userSchema.virtual('permsLabel').get(function (this: IUser) {
  return permsMap[this.perms] || 'desconocido';
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

// The passport-local-mongoose plugin is removed as we are using a custom JWT-based auth.
// User authentication logic (password hashing and comparison) will be handled in the API routes.

// Prevent model overwrite in Next.js hot-reloading environments
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
