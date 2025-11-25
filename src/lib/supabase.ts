import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL and Key must be defined in environment variables.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BUCKET_NAME = 'Images_for_blogs';

interface FileObject {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
}

const sanitize = (str: string) => str.normalize('NFC').replace(/[^\w.-]/g, '_');

export const uploadImageToSupabase = async (file: FileObject): Promise<string> => {
  const fileName = `${randomUUID()}-${sanitize(file.originalname)}`;
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file.buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.mimetype,
    });

  if (error) {
    console.error('Error uploading image to Supabase:', error);
    throw new Error('Error uploading image to Supabase');
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
  return publicUrl;
};

export const deleteImageFromSupabase = async (imageUrl: string): Promise<{ success: boolean }> => {
  try {
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split('/');
    const fileName = pathSegments.pop(); // Get the last segment

    if (!fileName) {
      throw new Error('Invalid image URL: Could not extract file name.');
    }

    // The bucket name is also in the path, let's make sure we're in the right one
    const bucketFromUrl = pathSegments.pop();
    if(bucketFromUrl !== BUCKET_NAME){
        console.warn(`Attempted to delete from a bucket (${bucketFromUrl}) that does not match the configured bucket (${BUCKET_NAME}). The image URL might be incorrect.`);
    }

    const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

    if (error) {
      throw new Error(`Error deleting image from Supabase: ${error.message}`);
    }
    return { success: true };
  } catch (error) {
    console.error('Error in deleteImageFromSupabase:', error);
    throw error;
  }
};
