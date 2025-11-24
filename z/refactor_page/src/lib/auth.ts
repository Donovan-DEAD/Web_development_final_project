
import crypto from 'crypto';
import connectToDatabase from './db';
import User, { IUser } from './models/user';
import mongoose from 'mongoose';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

// Ensure the secret key is defined and is the correct length (32 bytes / 64 hex characters)
const secretKeyHex = process.env.AUTH_SECRET;
if (!secretKeyHex || secretKeyHex.length !== 64) {
  throw new Error('AUTH_SECRET environment variable is not set or is not a 32-byte hex string.');
}
const secretKey = Buffer.from(secretKeyHex, 'hex');

/**
 * Encrypts a payload (e.g., a user ID) and signs it.
 * Uses AES-256-GCM to provide both confidentiality and authenticity.
 * @param payload The string data to encrypt.
 * @returns A string containing the iv, auth tag, and encrypted data, separated by colons.
 */
export function encryptAndSign(payload: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Combine IV, authTag, and encrypted data into a single string for storage
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Decrypts a token and verifies its integrity.
 * @param token The token string created by encryptAndSign.
 * @returns The original payload if decryption and verification are successful; otherwise, null.
 */
export function decryptAndVerify(token: string): string | null {
  try {
    const parts = token.split(':');
    if (parts.length !== 3) {
      // Invalid format
      return null;
    }

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, secretKey, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return decrypted.toString('utf8');
  } catch (error) {
    // This can happen if the key is wrong, the auth tag is invalid, or the data is corrupted.
    console.error('Decryption failed:', error);
    return null;
  }
}

/**
 * Ensures the root user exists in the database. If not, it creates one.
 */
export async function insertRootUser(): Promise<void> {
    await connectToDatabase();

    const ROOT_ID = process.env.ROOT_ID;
    const ROOT_EMAIL = process.env.ROOT_EMAIL;
    const ROOT_NAME = process.env.ROOT_NAME;
    const ADMIN_PERM_STR = process.env.ADMIN_PERM_STR;
    const ROOT_PASSWORD = process.env.ROOT_PASSWORD;

    if (!ROOT_ID || !ROOT_EMAIL || !ROOT_NAME || !ADMIN_PERM_STR || !ROOT_PASSWORD) {
        console.error('Missing one or more ROOT environment variables. Cannot create root user.');
        return;
    }

    try {
        const rootUser = await User.findById(new mongoose.Types.ObjectId(ROOT_ID));

        if (!rootUser) {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(ROOT_PASSWORD, salt, 1000, 64, 'sha512').toString('hex');

            const newUser: IUser = new User({
                _id: new mongoose.Types.ObjectId(ROOT_ID),
                username: ROOT_EMAIL,
                email: ROOT_EMAIL,
                name: ROOT_NAME,
                perms: ADMIN_PERM_STR,
                hash: hash,
                salt: salt,
            });

            await newUser.save();
            console.log('Root user created successfully.');
        } else {
            console.log('Root user already exists.');
        }
    } catch (error) {
        console.error('Error ensuring root user:', error);
    }
}
