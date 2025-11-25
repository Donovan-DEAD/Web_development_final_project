import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { getCurrentUser } from '@/lib/server-auth';
import User from '@/lib/models/user';

import mongoose from 'mongoose';
import { inversePermsMap } from '@/lib/user';

const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
const PAGE_SIZE = 50;

// --- GET Handler: List Users ---
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.perms !== ADMIN_PERM) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const field = searchParams.get('field');
    const query = searchParams.get('query');
    
    await connectToDatabase();
    
    let dbQuery = {};
    if (field && query) {
      dbQuery = { [field]: { $regex: query, $options: 'i' } };
    }

    const totalUsers = await User.countDocuments(dbQuery);
    const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

    const users = await User.find(dbQuery)
      .select('-__v -salt -hash') // Exclude sensitive fields
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    return NextResponse.json({
      users,
      totalPages,
      currentPage: page,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// --- POST Handler: Update User Permissions ---
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.perms !== ADMIN_PERM) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id, perm } = await request.json();
    if (!id || !perm || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid user ID or permission.' }, { status: 400 });
    }
    
    const permString = inversePermsMap()[perm];

    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { perms: permString } },
      { new: true, runValidators: true }
    ).select('-__v -salt -hash');

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error('Error updating user permissions:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}

// --- DELETE Handler: Delete a User ---
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.perms !== ADMIN_PERM) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    
    const { id } = await request.json();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid user ID.' }, { status: 400 });
    }
    
    // Prevent root user deletion
    if (id === process.env.ROOT_ID) {
        return NextResponse.json({ message: 'Cannot delete root user.' }, { status: 403 });
    }

    await connectToDatabase();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
