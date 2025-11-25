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

// Define permsMap to ensure it's initialized with correct values or fallbacks
const getPermsMap = () => {
  const map: { [key: string]: string } = {};
  map[process.env.ADMIN_PERM_STR || 'admin_perm'] = 'admin';
  map[process.env.USER_PERM_STR || 'user_perm'] = 'user';
  map[process.env.EDITOR_PERM_STR || 'editor_perm'] = 'editor';
  return map;
};

// Use a dynamic import or ensure process.env is ready if this is causing issues in some contexts
// For a standard Next.js API route/server component, process.env should be available.
const permsMap = getPermsMap();

// Log the permsMap to verify its content during initialization
console.log('User model permsMap initialized:', permsMap);

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

