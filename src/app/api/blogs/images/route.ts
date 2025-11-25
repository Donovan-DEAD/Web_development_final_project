import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/server-auth';
import { uploadImageToSupabase, deleteImageFromSupabase } from '@/lib/supabase';

const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
const EDITOR_PERM = process.env.EDITOR_PERM_STR || 'editor_perm';

// --- POST Handler: Upload an Image ---
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const hasPermission = user.perms === ADMIN_PERM || user.perms === EDITOR_PERM;
    if (!hasPermission) {
      return NextResponse.json({ message: 'You do not have permission to upload images.' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No image file found in the request.' }, { status: 400 });
    }

    // Convert the File to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Prepare the file object for the upload function
    const fileToUpload = {
      originalname: file.name,
      buffer,
      mimetype: file.type,
    };

    const publicUrl = await uploadImageToSupabase(fileToUpload);

    return NextResponse.json({ imageUrl: publicUrl }, { status: 200 });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ message: 'An internal server error occurred during image upload.' }, { status: 500 });
  }
}

// --- DELETE Handler: Delete an Image ---
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const hasPermission = user.perms === ADMIN_PERM || user.perms === EDITOR_PERM;
    if (!hasPermission) {
      return NextResponse.json({ message: 'You do not have permission to delete images.' }, { status: 403 });
    }

    const { imageUrl } = await request.json();
    if (!imageUrl) {
      return NextResponse.json({ message: 'Image URL is required.' }, { status: 400 });
    }

    await deleteImageFromSupabase(imageUrl);
    
    return NextResponse.json({ message: 'Image deleted successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ message: 'An internal server error occurred during image deletion.' }, { status: 500 });
  }
}
