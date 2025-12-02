/**
 * @fileoverview User Management API Route
 * @description Handles user listing, permission updates, and user deletion.
 * All endpoints require admin authentication. Users are returned with pagination support.
 * 
 * @module api/users
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { getCurrentUser } from '@/lib/server-auth';
import User from '@/lib/models/user';

import mongoose from 'mongoose';
import { inversePermsMap } from '@/lib/user';

/** @constant {string} ADMIN_PERM - Admin permission level string */
const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
/** @constant {number} PAGE_SIZE - Number of users per page for pagination */
const PAGE_SIZE = 50;

/**
 * GET /api/users
 * 
 * @async
 * @function GET
 * @param {NextRequest} request - The incoming request with optional search parameters
 * @returns {Promise<NextResponse>} JSON response with paginated user list
 * 
 * @description Retrieves a paginated list of all users. Supports filtering by field and query string.
 * Excludes sensitive fields (salt, hash). Only admins can access this endpoint.
 * 
 * Requires authentication. User must have admin permissions.
 * 
 * @query {number} page - Page number for pagination (default: 1, optional)
 * @query {string} field - Field name to filter by (e.g., 'email', 'username') (optional)
 * @query {string} query - Search query for the specified field (case-insensitive regex) (optional)
 * 
 * @response {200} Users retrieved successfully
 *   @response {Array<Object>} users - Array of user objects
 *   @response {string} users[].id - User MongoDB ID
 *   @response {string} users[].email - User email address
 *   @response {string} users[].username - User username
 *   @response {string} users[].perms - User permission level
 *   @response {number} totalPages - Total number of pages available
 *   @response {number} currentPage - Current page number
 * 
 * @response {403} Not authorized
 *   @response {string} message - "Unauthorized"
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection or query failures
 */
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

/**
 * POST /api/users
 * 
 * @async
 * @function POST
 * @param {NextRequest} request - The incoming request with user ID and new permission
 * @returns {Promise<NextResponse>} JSON response with updated user object
 * 
 * @description Updates the permission level of a specific user. Uses inversePermsMap to convert
 * permission labels to internal permission strings. Only admins can modify permissions.
 * Returns the updated user object with sensitive fields excluded.
 * 
 * Requires authentication. User must have admin permissions.
 * 
 * @request {Object} request.body - JSON body
 * @request {string} request.body.id - MongoDB ID of user to update (required, must be valid ObjectId)
 * @request {string} request.body.perm - New permission level (e.g., 'viewer', 'editor', 'admin') (required)
 * 
 * @response {200} Permission updated successfully
 *   @response {Object} - Updated user object (without salt/hash)
 *   @response {string} ._id - User MongoDB ID
 *   @response {string} .email - User email
 *   @response {string} .username - User username
 *   @response {string} .perms - New permission level
 *   @response {string} .permsLabel - Human-readable permission label
 * 
 * @response {400} Invalid input
 *   @response {string} message - "Invalid user ID or permission."
 * 
 * @response {403} Not authorized
 *   @response {string} message - "Unauthorized"
 * 
 * @response {404} User not found
 *   @response {string} message - "User not found."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection or validation failures
 */
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

/**
 * DELETE /api/users
 * 
 * @async
 * @function DELETE
 * @param {NextRequest} request - The incoming request with user ID to delete
 * @returns {Promise<NextResponse>} JSON response confirming deletion
 * 
 * @description Deletes a user account from the system. Prevents deletion of the root user.
 * Only admins can delete users. Once deleted, the user cannot be recovered unless manually
 * restored from backup. Any associated data (blogs, permissions) becomes orphaned.
 * 
 * Requires authentication. User must have admin permissions.
 * 
 * Security: Root user (process.env.ROOT_ID) cannot be deleted to prevent system lockout.
 * 
 * @request {Object} request.body - JSON body
 * @request {string} request.body.id - MongoDB ID of user to delete (required, must be valid ObjectId)
 * 
 * @response {200} User deleted successfully
 *   @response {string} message - "User deleted successfully."
 * 
 * @response {400} Invalid input
 *   @response {string} message - "Invalid user ID."
 * 
 * @response {403} Not authorized or protected user
 *   @response {string} message - "Unauthorized" OR "Cannot delete root user."
 * 
 * @response {404} User not found
 *   @response {string} message - "User not found."
 * 
 * @response {500} Server error
 *   @response {string} message - "An internal server error occurred."
 * 
 * @throws {Error} Database connection or deletion failures
 */
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
