// Constants for password hashing parameters
export const PBKDF2_ITERATIONS = 10000;
export const PBKDF2_KEY_LENGTH = 512; // in bits, commonly 256 or 512
export const PBKDF2_DIGEST = 'sha512'; // Hashing algorithm
export const SALT_BYTES = 16; // in bytes, for randomBytes
