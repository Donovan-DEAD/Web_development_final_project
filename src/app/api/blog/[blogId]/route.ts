/**
 * @fileoverview Single Blog Post Retrieval API Route
 * @description Retrieves the full content of a single blog post by ID.
 * Returns all blog blocks with their associated data.
 * 
 * @module api/blog/[blogId]
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import BlogContent from '@/lib/models/blogContent';
import mongoose from 'mongoose';

/**
 * Route parameters type definition
 * @typedef {Object} RouteParams
 * @property {Promise<{blogId: string}>} params - Route parameters promise
 */
type RouteParams = {
  params: Promise<{ blogId: string }>
}

/**
 * GET /api/blog/[blogId]
 * 
 * @async
 * @function GET
 * @param {NextRequest} request - The incoming request
 * @param {RouteParams} options - Route parameters containing blogId
 * @returns {Promise<NextResponse>} JSON response with blog post data
 * 
 * @description Retrieves the complete content of a blog post including all blocks
 * (header, content, images, references, etc.). No authentication required.
 * 
 * @response {200} Blog post found
 *   @response {Object} BlogContent document with:
 *   - _id: ObjectId (blog ID)
 *   - author_id: ObjectId (author's user ID)
 *   - blog_blocks: IBlogBlock[] (array of content blocks)
 * 
 * @response {400} Invalid blog ID format
 *   @response {string} message - "Invalid blog ID format."
 * 
 * @response {404} Blog not found
 *   @response {string} message - "Blog post not found."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection failures
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { blogId } = await params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: 'Invalid blog ID format.' }, { status: 400 });
    }

    await connectToDatabase();

    const blogPost = await BlogContent.findById(blogId);
    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found.' }, { status: 404 });
    }

    return NextResponse.json(blogPost, { status: 200 });

  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
