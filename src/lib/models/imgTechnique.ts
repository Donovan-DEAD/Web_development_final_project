import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImgTechnique extends Document {
  technique_name: string;
  images_urls: string[];
  explanation: string;
}

const imgTechniqueSchema: Schema<IImgTechnique> = new Schema({
  technique_name: { type: String, required: true },
  images_urls: [{ type: String, required: true }],
  explanation: { type: String, required: true },
});

// Prevent model overwrite in Next.js hot-reloading environments
const ImgTechnique: Model<IImgTechnique> = mongoose.models.ImgTechnique || mongoose.model<IImgTechnique>('ImgTechnique', imgTechniqueSchema);

export default ImgTechnique;
