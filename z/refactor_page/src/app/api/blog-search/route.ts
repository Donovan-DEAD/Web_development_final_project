import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import BlogMeta from '@/lib/models/blogMeta';

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
