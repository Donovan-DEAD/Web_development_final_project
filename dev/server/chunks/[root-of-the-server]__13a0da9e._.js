module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/models/user.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    perms: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    }
});
// Define permsMap to ensure it's initialized with correct values or fallbacks
const getPermsMap = ()=>{
    const map = {};
    map[process.env.ADMIN_PERM_STR || 'admin_perm'] = 'admin';
    map[process.env.USER_PERM_STR || 'user_perm'] = 'user';
    map[process.env.EDITOR_PERM_STR || 'editor_perm'] = 'editor';
    return map;
};
// Use a dynamic import or ensure process.env is ready if this is causing issues in some contexts
// For a standard Next.js API route/server component, process.env should be available.
const permsMap = getPermsMap();
// Log the permsMap to verify its content during initialization
console.log('User model permsMap initialized:', permsMap);
userSchema.virtual('permsLabel').get(function() {
    return permsMap[this.perms] || 'desconocido';
});
userSchema.set('toObject', {
    virtuals: true
});
userSchema.set('toJSON', {
    virtuals: true
});
// The passport-local-mongoose plugin is removed as we are using a custom JWT-based auth.
// User authentication logic (password hashing and comparison) will be handled in the API routes.
// Prevent model overwrite in Next.js hot-reloading environments
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('User', userSchema);
const __TURBOPACK__default__export__ = User;
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/constants.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Constants for password hashing parameters
__turbopack_context__.s([
    "PBKDF2_DIGEST",
    ()=>PBKDF2_DIGEST,
    "PBKDF2_ITERATIONS",
    ()=>PBKDF2_ITERATIONS,
    "PBKDF2_KEY_LENGTH",
    ()=>PBKDF2_KEY_LENGTH,
    "SALT_BYTES",
    ()=>SALT_BYTES
]);
const PBKDF2_ITERATIONS = 10000;
const PBKDF2_KEY_LENGTH = 512; // in bits, commonly 256 or 512
const PBKDF2_DIGEST = 'sha512'; // Hashing algorithm
const SALT_BYTES = 16; // in bytes, for randomBytes
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decryptAndVerify",
    ()=>decryptAndVerify,
    "encryptAndSign",
    ()=>encryptAndSign,
    "insertRootUser",
    ()=>insertRootUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/models/user.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/constants.ts [app-route] (ecmascript)"); // Import hashing constants
;
;
;
;
// Node.js 'crypto' for server-side operations (like password hashing)
let nodeCrypto;
if (typeof process !== 'undefined') {
    nodeCrypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
}
const ALGORITHM_AES_GCM = 'AES-GCM';
const IV_LENGTH_BYTES = 16; // 128 bits for AES-GCM IV
const AUTH_TAG_LENGTH_BITS = 128; // 128 bits for GCM auth tag
// Ensure the secret key is defined
const secretKeyHex = process.env.AUTH_SECRET;
if (!secretKeyHex) {
    throw new Error('AUTH_SECRET environment variable is not set.');
}
let encryptionKey;
async function getEncryptionKey() {
    if (encryptionKey) {
        return encryptionKey;
    }
    const keyBuffer = Buffer.from(secretKeyHex, 'hex');
    encryptionKey = await (globalThis.crypto || nodeCrypto.webcrypto).subtle.importKey('raw', keyBuffer, ALGORITHM_AES_GCM, false, [
        'encrypt',
        'decrypt'
    ]);
    return encryptionKey;
}
async function encryptAndSign(payload) {
    const key = await getEncryptionKey();
    const iv = (globalThis.crypto || nodeCrypto.webcrypto).getRandomValues(new Uint8Array(IV_LENGTH_BYTES));
    const encodedPayload = new TextEncoder().encode(payload);
    const encryptedBuffer = await (globalThis.crypto || nodeCrypto.webcrypto).subtle.encrypt({
        name: ALGORITHM_AES_GCM,
        iv: iv,
        tagLength: AUTH_TAG_LENGTH_BITS
    }, key, encodedPayload);
    const ciphertext = new Uint8Array(encryptedBuffer.slice(0, encryptedBuffer.byteLength - AUTH_TAG_LENGTH_BITS / 8));
    const authTag = new Uint8Array(encryptedBuffer.slice(encryptedBuffer.byteLength - AUTH_TAG_LENGTH_BITS / 8));
    return `${Buffer.from(iv).toString('hex')}:${Buffer.from(authTag).toString('hex')}:${Buffer.from(ciphertext).toString('hex')}`;
}
async function decryptAndVerify(token) {
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
        const decryptedBuffer = await (globalThis.crypto || nodeCrypto.webcrypto).subtle.decrypt({
            name: ALGORITHM_AES_GCM,
            iv: iv,
            tagLength: AUTH_TAG_LENGTH_BITS
        }, key, encryptedBuffer);
        return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
}
async function insertRootUser() {
    if (!nodeCrypto) {
        console.error('Node.js crypto not available. Cannot run insertRootUser in this environment.');
        return;
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
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
        const rootUser = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId(ROOT_ID));
        if (!rootUser) {
            const salt = nodeCrypto.randomBytes(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SALT_BYTES"]).toString('hex');
            const hash = nodeCrypto.pbkdf2Sync(ROOT_PASSWORD, salt, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PBKDF2_ITERATIONS"], __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PBKDF2_KEY_LENGTH"], __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PBKDF2_DIGEST"]).toString('hex');
            const newUser = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId(ROOT_ID),
                username: ROOT_EMAIL,
                email: ROOT_EMAIL,
                name: ROOT_NAME,
                perms: ADMIN_PERM_STR,
                hash: hash,
                salt: salt
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
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/auth.ts [app-route] (ecmascript)");
;
;
const MONGODB_URI = process.env.DATABASE_URL;
if (!MONGODB_URI) {
    throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */ let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insertRootUser"])();
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectToDatabase;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/models/user.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/constants.ts [app-route] (ecmascript)"); // Import hashing constants
;
;
;
;
;
;
// Node.js 'crypto' for server-side operations
let nodeCrypto;
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    nodeCrypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
} else {
    throw new Error('Node.js crypto is required for this API route.');
}
// Promisify the crypto.pbkdf2 function
const pbkdf2Async = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(nodeCrypto.pbkdf2);
async function verifyPassword(password, salt, hashHex) {
    const derivedKey = await pbkdf2Async(password, salt, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PBKDF2_ITERATIONS"], __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PBKDF2_KEY_LENGTH"], __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PBKDF2_DIGEST"]); // Buffer
    const hashBuffer = Buffer.from(hashHex, 'hex');
    // timingSafeEqual requiere longitudes iguales
    if (derivedKey.length !== hashBuffer.length) return false;
    return nodeCrypto.timingSafeEqual(derivedKey, hashBuffer);
}
async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Email and password are required.'
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // passport-local-mongoose uses 'username' for the email field in this setup
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            email: email
        });
        if (!user || !user.salt || !user.hash) {
            // User not found or user record is missing password fields
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Invalid credentials.'
            }, {
                status: 401
            });
        }
        const isValidPassword = await verifyPassword(password, user.salt, user.hash);
        if (!isValidPassword) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Invalid credentials.'
            }, {
                status: 401
            });
        }
        // --- Authentication successful ---
        // 1. Create a secure token
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptAndSign"])(user._id.toString());
        // 2. Set the cookie
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Login successful'
        }, {
            status: 200
        });
        response.cookies.set('user', token, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        });
        return response;
    } catch (error) {
        console.error('Login error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'An internal server error occurred.'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__13a0da9e._.js.map