
import connectToDatabase from './db';
import User, { IUser } from './models/user';
import mongoose from 'mongoose';
import {
  PBKDF2_ITERATIONS,
  PBKDF2_KEY_LENGTH,
  PBKDF2_DIGEST,
  SALT_BYTES
} from './constants'; // Import hashing constants

// Node.js 'crypto' for server-side operations (like password hashing)
let nodeCrypto: typeof import('crypto') | undefined;
if (typeof process !== 'undefined') {
  nodeCrypto = require('crypto');
}

const ALGORITHM_AES_GCM = 'AES-GCM';
const IV_LENGTH_BYTES = 16; // 128 bits for AES-GCM IV
const AUTH_TAG_LENGTH_BITS = 128; // 128 bits for GCM auth tag

// Ensure the secret key is defined
const secretKeyHex = process.env.AUTH_SECRET;
if (!secretKeyHex) {
  throw new Error('AUTH_SECRET environment variable is not set.');
}

let encryptionKey: CryptoKey | undefined;

async function getEncryptionKey(): Promise<CryptoKey> {
  if (encryptionKey) {
    return encryptionKey;
  }
  

  //@ts-ignore
  const keyBuffer = Buffer.from(secretKeyHex, 'hex');
  encryptionKey = await (globalThis.crypto || nodeCrypto?.webcrypto).subtle.importKey(
    'raw',
    //@ts-ignore
    keyBuffer,
    ALGORITHM_AES_GCM,
    false,
    ['encrypt', 'decrypt']
  );
  return encryptionKey;
}

/**
 * Encrypts a payload (e.g., a user ID) using Web Crypto API.
 * Uses AES-256-GCM to provide both confidentiality and authenticity.
 * @param payload The string data to encrypt.
 * @returns A string containing the iv, auth tag, and encrypted data, separated by colons.
 */
export async function encryptAndSign(payload: string): Promise<string> {
  const key = await getEncryptionKey();
  const iv = (globalThis.crypto || nodeCrypto?.webcrypto).getRandomValues(new Uint8Array(IV_LENGTH_BYTES));
  const encodedPayload = new TextEncoder().encode(payload);

  const encryptedBuffer = await (globalThis.crypto || nodeCrypto?.webcrypto).subtle.encrypt(
    {
      name: ALGORITHM_AES_GCM,
      iv: iv,
      tagLength: AUTH_TAG_LENGTH_BITS,
    },
    key,
    encodedPayload
  );

  const ciphertext = new Uint8Array(encryptedBuffer.slice(0, encryptedBuffer.byteLength - (AUTH_TAG_LENGTH_BITS / 8)));
  const authTag = new Uint8Array(encryptedBuffer.slice(encryptedBuffer.byteLength - (AUTH_TAG_LENGTH_BITS / 8)));

  return `${Buffer.from(iv).toString('hex')}:${Buffer.from(authTag).toString('hex')}:${Buffer.from(ciphertext).toString('hex')}`;
}

/**
 * Decrypts a token and verifies its integrity using Web Crypto API.
 * @param token The token string created by encryptAndSign.
 * @returns The original payload if decryption and verification are successful; otherwise, null.
 */
export async function decryptAndVerify(token: string): Promise<string | null> {
  try {
    const key = await getEncryptionKey();
    const parts = token.split(':');
    if (parts.length !== 3) {
      // Invalid format
      return null;
    }

    const [ivHex, authTagHex, ciphertextHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const ciphertext = Buffer.from(ciphertextHex, 'hex');

    // Combine ciphertext and authTag into a single buffer for decryption
    const encryptedBuffer = new Uint8Array(ciphertext.byteLength + authTag.byteLength);
    encryptedBuffer.set(ciphertext, 0);
    encryptedBuffer.set(authTag, ciphertext.byteLength);

    const decryptedBuffer = await (globalThis.crypto || nodeCrypto?.webcrypto).subtle.decrypt(
      {
        name: ALGORITHM_AES_GCM,
        iv: iv,
        tagLength: AUTH_TAG_LENGTH_BITS,
      },
      key,
      encryptedBuffer
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

/**
 * Ensures the root user exists in the database. If not, it creates one.
 * This function uses Node.js 'crypto' and should only be called in a Node.js environment.
 */
export async function insertRootUser(): Promise<void> {
    if (!nodeCrypto) {
        console.error('Node.js crypto not available. Cannot run insertRootUser in this environment.');
        return;
    }

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
            const salt = nodeCrypto.randomBytes(SALT_BYTES).toString('hex');
            const hash = nodeCrypto.pbkdf2Sync(ROOT_PASSWORD, salt, PBKDF2_ITERATIONS, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST).toString('hex');

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

