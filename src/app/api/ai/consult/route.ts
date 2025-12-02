/**
 * @fileoverview AI Agricultural Consultation API Route
 * @description Handles agricultural consultations using Google Gemini AI.
 * Accepts image and/or context text for crop analysis and recommendations.
 * 
 * @module api/ai/consult
 */

import { NextRequest, NextResponse } from 'next/server';
import { makeConsultToGemini } from '@/lib/gemini';
import { getCurrentUser } from '@/lib/server-auth';

/**
 * POST /api/ai/consult
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request with form data
 * @returns {Promise<NextResponse>} JSON response with AI analysis or error
 * 
 * @description Processes an agricultural consultation request with optional image
 * and context text. Returns structured analysis including danger level, diagnosis,
 * recommendations, and suggested techniques.
 * 
 * Requires authentication. User must be logged in to access this endpoint.
 * 
 * @request {FormData} request.body
 * @request {string} [request.body.context] - Agricultural context/description (optional)
 * @request {File} [request.body.image] - Crop image file (optional)
 * 
 * @response {200} Analysis successful
 *   @response {Object} Gemini response data including:
 *   - nivel_de_peligro: 'aprobado' | 'mejorable' | 'peligro'
 *   - diagnostico: string (diagnosis description)
 *   - recomendations: string[] (array of recommendations)
 *   - tecnicas_a_usar: Technique[] (recommended techniques)
 *   - is_image_agricultural_related: boolean
 *   - is_context_agricultural_related: boolean
 * 
 * @response {400} Missing context and image
 *   @response {string} message - "Context or an image is required."
 * 
 * @response {401} Unauthorized
 *   @response {string} message - "Unauthorized"
 * 
 * @response {500} AI model or server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Gemini API failures
 */
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
