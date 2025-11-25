import { NextRequest, NextResponse } from 'next/server';
import { makeConsultToGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const context = formData.get('context') as string | null;
    const imageFile = formData.get('image') as File | null;

    if (!context && !imageFile) {
      return NextResponse.json({ message: 'Context or an image is required.' }, { status: 400 });
    }

    let imageBase64: string | undefined;
    let mimeType: string | undefined;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageBase64 = buffer.toString('base64');
      mimeType = imageFile.type;
    }

    const geminiResponse = await makeConsultToGemini(context || '', imageBase64, mimeType);
    // console.log('Gemini response:', geminiResponse);
    if (!geminiResponse) {
      return NextResponse.json({ message: 'Error processing the request with the AI model.' }, { status: 500 });
    }

    // The old router had logic to create toast messages based on the response.
    // In a pure API, we return the data and let the client decide how to display it.
    return NextResponse.json(geminiResponse, { status: 200 });

  } catch (error) {
    console.error('Error in AI consult route:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
