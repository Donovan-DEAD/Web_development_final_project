// /types/blog.ts (sugerencia de ubicación)

export interface HeaderBlockType {
  _id: string;
  type: 'Header';
  blog_title: string;
  blog_subtitle: string;
  blog_author: string;
  blog_date: string;
}

export interface ImgAndContentBlockType {
  _id: string;
  type: 'Img_and_content';
  img_url: string;
  img_footer: string;
  blog_paragraphs: string[];
  orientation: 'left' | 'right';
}

export interface PureContentBlockType {
  _id: string;
  type: 'Pure_content';
  blog_paragraphs: string[];
}

export interface PureImageBlockType {
  _id: string;
  type: 'Pure_image';
  img_url: string;
  img_footer: string;
}

export interface ReferenceType {
  blog_reference_apa: string;
  blog_reference_url: string;
}

export interface ReferencesBlockType {
  _id: string;
  type: 'References';
  blog_references: ReferenceType[];
}

// ✅ Unión discriminada
export type BlogBlockType =
  | HeaderBlockType
  | ImgAndContentBlockType
  | PureContentBlockType
  | PureImageBlockType
  | ReferencesBlockType

export interface BlogContentDataType {
  _id: string;
  author_id: string;
  blog_blocks: BlogBlockType[];
}
