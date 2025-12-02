/**
 * @fileoverview Blog Creation API Route
 * @description Handles creation of new blog posts with validation of content structure.
 * Only admins and editors can create blogs. Creates both BlogContent and BlogMeta documents.
 * 
 * @module api/blogs
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { getCurrentUser } from '@/lib/server-auth';
import BlogContent from '@/lib/models/blogContent';
import BlogMeta from '@/lib/models/blogMeta';

/** @constant {string} ADMIN_PERM - Admin permission level string */
const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
/** @constant {string} EDITOR_PERM - Editor permission level string */
const EDITOR_PERM = process.env.EDITOR_PERM_STR || 'editor_perm';

/**
 * POST /api/blogs
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request with blog data
 * @returns {Promise<NextResponse>} JSON response with creation status
 * 
 * @description Creates a new blog post with content blocks and metadata card.
 * Validates user permissions (admin/editor), content structure, and required fields.
 * Automatically sets blog author to current user and creation date.
 * 
 * Requires authentication. User must have admin or editor permissions.
 * 
 * @request {Object} request.body
 * @request {Object} request.body.content - Blog content object
 * @request {Array} request.body.content.blocks - Array of IBlogBlock objects
 * @request {Object} request.body.card - Blog metadata card
 * @request {string} request.body.card.title - Blog title
 * @request {string} request.body.card.description - Blog description
 * @request {string} request.body.card.img_url - Blog cover image URL
 * 
 * @response {201} Blog created successfully
 *   @response {string} message - "Blog created successfully"
 *   @response {string} blogId - ID of created blog content
 * 
 * @response {400} Invalid request body or structure
 *   @response {string} message - Detailed error message about missing/invalid fields
 * 
 * @response {401} Not authenticated
 *   @response {string} message - "Authentication required."
 * 
 * @response {403} Insufficient permissions
 *   @response {string} message - "You do not have permission to create a blog."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection failures
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const user = await getCurrentUser();

    // 1. Authentication and Authorization
    if (!user) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const hasPermission = user.perms === ADMIN_PERM || user.perms === EDITOR_PERM;
    if (!hasPermission) {
      return NextResponse.json({ message: 'You do not have permission to create a blog.' }, { status: 403 });
    }

    // 2. Body validation
    const body = await request.json();
    const { content, card } = body;

    if (!content || !content.blocks || !card || !card.title || !card.description || !card.img_url) {
      return NextResponse.json({ message: 'Invalid request body. Missing required fields.' }, { status: 400 });
    }

    // 3. Structural validation for blocks
    const { blocks } = content;
    if (!Array.isArray(blocks) || blocks.length < 2) {
      return NextResponse.json({ message: 'A blog must have at least a header and references.' }, { status: 400 });
    }

    if (blocks[0].type !== 'Header' || blocks[blocks.length - 1].type !== 'References') {
      return NextResponse.json({ message: 'The blog must start with a Header and end with References.' }, { status: 400 });
    }

    // 4. Create Blog Content
    const newBlogContent = new BlogContent({
      author_id: user._id,
      blog_blocks: content.blocks,
    });

    const savedContent = await newBlogContent.save();

    // 5. Create Blog Meta (Card)
    const newBlogMeta = new BlogMeta({
      blog_id: savedContent._id,
      title: card.title,
      description: card.description,
      img_url: card.img_url,
      date: new Date(),
    });

    await newBlogMeta.save();

    return NextResponse.json({
      message: 'Blog created successfully',
      blogId: savedContent._id
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
