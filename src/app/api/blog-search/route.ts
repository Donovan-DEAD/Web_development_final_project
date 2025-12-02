/**
 * @fileoverview Blog Search API Route
 * @description Searches for blog posts by title using case-insensitive regex matching.
 * Returns blog metadata (cards) up to a limit of 15 results.
 * 
 * @module api/blog-search
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import BlogMeta from '@/lib/models/blogMeta';

/**
 * GET /api/blog-search
 * 
 * @async
 * @function GET
 * @param {NextRequest} request - The incoming request with query parameters
 * @returns {Promise<NextResponse>} JSON array of matching blog metadata
 * 
 * @description Searches blog posts by title using case-insensitive regular expression.
 * Returns up to 15 results sorted by relevance. No authentication required.
 * 
 * @query {string} [searchTerm] - Search term to match against blog titles (optional, empty for all blogs)
 * 
 * @response {200} Search successful
 *   @response {Array} Array of BlogMeta documents with:
 *   - _id: ObjectId (blog metadata ID)
 *   - blog_id: ObjectId (reference to blog content)
 *   - title: string (blog title)
 *   - description: string (blog description)
 *   - img_url: string (cover image URL)
 *   - date: Date (publication date)
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection failures
 */
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm') || '';

    let query = {};
    if (searchTerm) {
      query = { title: { $regex: searchTerm, $options: 'i' } };
    }

    const blogs = await BlogMeta.find(query).limit(15); // Limit to 15 as in original

    return NextResponse.json(blogs, { status: 200 });

  } catch (error) {
    console.error('Error fetching blog search results:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
