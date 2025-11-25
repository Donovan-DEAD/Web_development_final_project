import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { getCurrentUser } from '@/lib/server-auth';
import BlogContent from '@/lib/models/blogContent';
import BlogMeta from '@/lib/models/blogMeta';
import mongoose from 'mongoose';

// Permission strings
const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
const EDITOR_PERM = process.env.EDITOR_PERM_STR || 'editor_perm';

type RouteParams = {
  params: {
    blogId: string;
  }
}

// --- PUT Handler: Update a Blog Post ---
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { blogId } = params;
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


// --- DELETE Handler: Delete a Blog Post ---
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { blogId } = params;
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
