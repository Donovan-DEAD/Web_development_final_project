import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/user';
import { decryptAndVerify } from '@/lib/auth';

export async function GET(request: NextRequest) {
  // Leer los headers de la request
  const tokenCookie = request.cookies.get('user');
  if (tokenCookie) {
    const token = tokenCookie.value;
    const decryptedUserId = await decryptAndVerify(token);
    if (decryptedUserId) {
      
      await connectToDatabase();
      const user = await User.findById(decryptedUserId);

      if (!user) {
        return NextResponse.json({ user: null });
      }
      return NextResponse.json({
        user: {
          name: user.name,
          permsLabel: user.permsLabel,
        },
      })
    }
  }
  
  return NextResponse.json({ user: null });
  
}