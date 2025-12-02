/**
 * @fileoverview Blog Image Upload/Delete API Route
 * @description Handles image uploads to Supabase and deletion of uploaded images.
 * Only admins and editors can upload/delete images. Images are stored in Supabase bucket.
 * 
 * @module api/blogs/images
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/server-auth';
import { uploadImageToSupabase, deleteImageFromSupabase } from '@/lib/supabase';

/** @constant {string} ADMIN_PERM - Admin permission level string */
const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
/** @constant {string} EDITOR_PERM - Editor permission level string */
const EDITOR_PERM = process.env.EDITOR_PERM_STR || 'editor_perm';

/**
 * POST /api/blogs/images
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request with form data
 * @returns {Promise<NextResponse>} JSON response with uploaded image URL
 * 
 * @description Uploads an image file to Supabase storage for use in blog posts.
 * Only admins and editors can upload. Returns a public URL for the uploaded image.
 * 
 * Requires authentication. User must have admin or editor permissions.
 * 
 * @request {FormData} request.body
 * @request {File} request.body.image - Image file to upload (required)
 * 
 * @response {200} Image uploaded successfully
 *   @response {string} imageUrl - Public URL to the uploaded image
 * 
 * @response {400} Missing image file
 *   @response {string} message - "No image file found in the request."
 * 
 * @response {401} Not authenticated
 *   @response {string} message - "Authentication required."
 * 
 * @response {403} Insufficient permissions
 *   @response {string} message - "You do not have permission to upload images."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred during image upload."
 * 
 * @throws {Error} Supabase upload failures
 */
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

/**
 * DELETE /api/blogs/images
 * 
 * @async
 * @function DELETE
 * @param {NextRequest} request - The incoming request with image URL to delete
 * @returns {Promise<NextResponse>} JSON response confirming deletion
 * 
 * @description Deletes an uploaded image from Supabase storage.
 * Only admins and editors can delete images. Takes the image URL and removes it
 * from the Supabase bucket. Used when blog posts are being edited or deleted.
 * 
 * Requires authentication. User must have admin or editor permissions.
 * 
 * @request {Object} request.body - JSON body
 * @request {string} request.body.imageUrl - Public URL of the image to delete (required)
 * 
 * @response {200} Image deleted successfully
 *   @response {string} message - "Image deleted successfully."
 * 
 * @response {400} Missing image URL
 *   @response {string} message - "Image URL is required."
 * 
 * @response {401} Not authenticated
 *   @response {string} message - "Authentication required."
 * 
 * @response {403} Insufficient permissions
 *   @response {string} message - "You do not have permission to delete images."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred during image deletion."
 * 
 * @throws {Error} Supabase deletion failures
 */
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
