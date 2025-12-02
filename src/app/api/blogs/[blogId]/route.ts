/**
 * @fileoverview Blog Update and Delete API Route
 * @description Handles updating and deleting blog posts. Only authors and admins can modify.
 * Provides authorization checks and cascading deletion of associated metadata.
 * 
 * @module api/blogs/[blogId]
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { getCurrentUser } from '@/lib/server-auth';
import BlogContent from '@/lib/models/blogContent';
import BlogMeta from '@/lib/models/blogMeta';
import mongoose from 'mongoose';

/** @constant {string} ADMIN_PERM - Admin permission level string */
const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
/** @constant {string} EDITOR_PERM - Editor permission level string */
const EDITOR_PERM = process.env.EDITOR_PERM_STR || 'editor_perm';

/**
 * Route parameters type definition
 * @typedef {Object} RouteParams
 * @property {Promise<{blogId: string}>} params - Route parameters promise
 */
type RouteParams = {
  params: Promise<{ blogId: string }>
}

/**
 * PUT /api/blogs/[blogId]
 * 
 * @async
 * @function PUT
 * @param {NextRequest} request - The incoming request with updated blog data
 * @param {RouteParams} options - Route parameters containing blogId
 * @returns {Promise<NextResponse>} JSON response with update status
 * 
 * @description Updates an existing blog post's content blocks.
 * Only the blog author or admins can update. Validates blog existence and permissions.
 * 
 * @request {Object} request.body
 * @request {Object} request.body.content - Updated blog content
 * @request {Array} request.body.content.blocks - Updated array of blog blocks
 * 
 * @response {200} Blog updated successfully
 *   @response {string} message - "Blog post updated successfully."
 * 
 * @response {400} Invalid blog ID format or missing content
 *   @response {string} message - Detailed error message
 * 
 * @response {401} Not authenticated
 *   @response {string} message - "Authentication required."
 * 
 * @response {403} Insufficient permissions or not author
 *   @response {string} message - Permission or authorship error
 * 
 * @response {404} Blog not found
 *   @response {string} message - "Blog post not found."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection failures
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { blogId } = await params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: 'Invalid blog ID format.' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const hasPermission = user.perms === ADMIN_PERM || user.perms === EDITOR_PERM;
    if (!hasPermission) {
      return NextResponse.json({ message: 'You do not have permission to update blogs.' }, { status: 403 });
    }

    const blogPost = await BlogContent.findById(blogId);
    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found.' }, { status: 404 });
    }

    // Ownership check: Only the author can update their post (admins can bypass this if needed)
    if (blogPost.author_id.toString() !== user._id.toString() && user.perms !== ADMIN_PERM) {
      return NextResponse.json({ message: 'You are not the author of this post.' }, { status: 403 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || !content.blocks) {
      return NextResponse.json({ message: 'Invalid request body. Missing content blocks.' }, { status: 400 });
    }

    // Update the blog content
    blogPost.blog_blocks = content.blocks;
    await blogPost.save();

    return NextResponse.json({ message: 'Blog post updated successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}


/**
 * DELETE /api/blogs/[blogId]
 * 
 * @async
 * @function DELETE
 * @param {NextRequest} request - The incoming request
 * @param {RouteParams} options - Route parameters containing blogId
 * @returns {Promise<NextResponse>} JSON response with deletion status
 * 
 * @description Deletes a blog post and its associated metadata.
 * Only the blog author or admins can delete. Cascades deletion to BlogMeta.
 * 
 * @response {200} Blog deleted successfully
 *   @response {string} message - "Blog post deleted successfully."
 * 
 * @response {400} Invalid blog ID format
 *   @response {string} message - "Invalid blog ID format."
 * 
 * @response {401} Not authenticated
 *   @response {string} message - "Authentication required."
 * 
 * @response {403} Insufficient permissions or not author
 *   @response {string} message - Permission or authorship error
 * 
 * @response {404} Blog not found
 *   @response {string} message - "Blog post not found."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection failures
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { blogId } = await params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: 'Invalid blog ID format.' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const hasPermission = user.perms === ADMIN_PERM || user.perms === EDITOR_PERM;
    if (!hasPermission) {
      return NextResponse.json({ message: 'You do not have permission to delete blogs.' }, { status: 403 });
    }

    const blogPost = await BlogContent.findById(blogId);
    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found.' }, { status: 404 });
    }

    // Ownership check
    if (blogPost.author_id.toString() !== user._id.toString() && user.perms !== ADMIN_PERM) {
      return NextResponse.json({ message: 'You are not the author of this post.' }, { status: 403 });
    }

    // Perform the deletion
    await BlogContent.deleteOne({ _id: blogId });
    await BlogMeta.deleteOne({ blog_id: blogId });

    return NextResponse.json({ message: 'Blog post deleted successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
