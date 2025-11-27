import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import BlogContent from '@/lib/models/blogContent';
import mongoose from 'mongoose';

type RouteParams = {
  params: {
    blogId: string;
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    console.log(params, "Estos son los params del back.")
    const { blogId } = (await params);
    console.log(blogId)
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: 'Invalid blog ID format.' }, { status: 400 });
    }

    await connectToDatabase();

    const blogPost = await BlogContent.findById(blogId);
    console.log(blogPost)
    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found.' }, { status: 404 });
    }

    return NextResponse.json(blogPost, { status: 200 });

  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
