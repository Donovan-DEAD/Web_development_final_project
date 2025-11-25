import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { getCurrentUser } from '@/lib/server-auth';
import BlogContent from '@/lib/models/blogContent';
import BlogMeta from '@/lib/models/blogMeta';

// Permission strings from environment variables
const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
const EDITOR_PERM = process.env.EDITOR_PERM_STR || 'editor_perm';

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

    // 3. Create Blog Content
    const newBlogContent = new BlogContent({
      author_id: user._id,
      blog_blocks: content.blocks,
    });

    const savedContent = await newBlogContent.save();

    // 4. Create Blog Meta (Card)
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
