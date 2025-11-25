import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogMeta extends Document {
  blog_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  img_url: string;
  date: Date;
}

const blogMetaSchema: Schema<IBlogMeta> = new Schema({
  blog_id: { type: Schema.Types.ObjectId, required: true, ref: 'BlogContent' }, // Added ref for population
  title: { type: String, required: true },
  description: { type: String, required: true },
  img_url: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Prevent model overwrite in Next.js hot-reloading environments
const BlogMeta: Model<IBlogMeta> = mongoose.models.BlogMeta || mongoose.model<IBlogMeta>('BlogMeta', blogMetaSchema);

export default BlogMeta;
