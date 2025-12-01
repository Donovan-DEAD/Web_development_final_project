import mongoose, { Schema, Document, Model } from 'mongoose';

// Base interface for any block
interface IBlockBase extends Document {
  type: string;
}

// Interfaces for each specific block type
export interface IHeaderBlock extends IBlockBase {
  type: 'Header';
  blog_title: string;
  blog_subtitle: string;
  blog_author: string;
  blog_date: string;
}

export interface IPureImageBlock extends IBlockBase {
  type: 'Pure_image';
  img_url: string;
  img_footer: string;
}

export interface IPureContentBlock extends IBlockBase {
  type: 'Pure_content';
  blog_paragraphs: string[];
}

export interface IImgAndContentBlock extends IBlockBase {
  type: 'Img_and_content';
  img_url: string;
  img_footer: string;
  blog_paragraphs: string[];
  orientation: 'left' | 'right';
}

export interface IReferencesBlock extends IBlockBase {
  type: 'References';
  blog_references: {
    blog_reference_apa: string;
    blog_reference_url: string;
  }[];
}

// A union type for any possible blog block
export type IBlogBlock = IHeaderBlock | IPureImageBlock | IPureContentBlock | IImgAndContentBlock | IReferencesBlock;

// Interface for the main blog content document
export interface IBlogContent extends Document {
  author_id: mongoose.Types.ObjectId;
  blog_blocks: IBlogBlock[];
}

// Base schema for all blocks, defining the discriminator key
const blockBaseSchema = new Schema({ type: { type: String, required: true } }, { discriminatorKey: 'type', _id: false });

const blogContentSchema: Schema<IBlogContent> = new Schema({
  // blog_id is removed as the document's _id can be used as the unique identifier.
  // The BlogMeta model will reference this _id.
  author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blog_blocks: [blockBaseSchema],
});

// Prevent model overwrite
export const BlogContent: Model<IBlogContent> = mongoose.models.BlogContent || mongoose.model<IBlogContent>('BlogContent', blogContentSchema);

// === Discriminators ===
// These schemas are for the objects nested within the blog_blocks array

const headerSchema = new Schema<IHeaderBlock>({
  blog_title: { type: String, required: true },
  blog_subtitle: { type: String },
  blog_author: { type: String, required: true },
  blog_date: { type: String, required: true },
});

const pureImageSchema = new Schema<IPureImageBlock>({
  img_url: { type: String, required: true },
  img_footer: { type: String },
});

const pureContentSchema = new Schema<IPureContentBlock>({
  blog_paragraphs: { type: [String] , default: []},
});

const imgAndContentSchema = new Schema<IImgAndContentBlock>({
  img_url: { type: String, required: true },
  img_footer: { type: String },
  blog_paragraphs:{ type: [String], default: []},
  orientation: { type: String, enum: ['left', 'right'], required: true },
});

const referencesSchema = new Schema<IReferencesBlock>({
  blog_references: [{
    blog_reference_apa: String,
    blog_reference_url: String,
  }],
});

// IMPORTANT: Apply discriminators to the schema of the array element, not the top-level model
const blogBlocksSchema = blogContentSchema.path('blog_blocks') as any;
blogBlocksSchema.discriminator('Header', headerSchema);
blogBlocksSchema.discriminator('Pure_image', pureImageSchema);
blogBlocksSchema.discriminator('Pure_content', pureContentSchema);
blogBlocksSchema.discriminator('Img_and_content', imgAndContentSchema);
blogBlocksSchema.discriminator('References', referencesSchema);

export default BlogContent;
