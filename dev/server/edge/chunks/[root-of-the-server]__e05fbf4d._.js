(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__e05fbf4d._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/db.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/node_modules/mongoose/dist/browser.umd.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/auth.ts [middleware-edge] (ecmascript)");
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
        cached.promise = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["insertRootUser"])();
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectToDatabase;
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/models/user.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/node_modules/mongoose/dist/browser.umd.js [middleware-edge] (ecmascript)");
;
const userSchema = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Schema"]({
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
const User = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].model('User', userSchema);
const __TURBOPACK__default__export__ = User;
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/constants.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/auth.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decryptAndVerify",
    ()=>decryptAndVerify,
    "encryptAndSign",
    ()=>encryptAndSign,
    "insertRootUser",
    ()=>insertRootUser
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = /*#__PURE__*/ __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/db.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/models/user.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/node_modules/mongoose/dist/browser.umd.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/constants.ts [middleware-edge] (ecmascript)"); // Import hashing constants
;
;
;
;
// Node.js 'crypto' for server-side operations (like password hashing)
let nodeCrypto;
if (typeof process !== 'undefined') {
    nodeCrypto = __turbopack_context__.r("[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)");
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
    const keyBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(secretKeyHex, 'hex');
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
    return `${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(iv).toString('hex')}:${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(authTag).toString('hex')}:${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(ciphertext).toString('hex')}`;
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
        const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(ivHex, 'hex');
        const authTag = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(authTagHex, 'hex');
        const ciphertext = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(ciphertextHex, 'hex');
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$db$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])();
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
        const rootUser = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].findById(new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].Types.ObjectId(ROOT_ID));
        if (!rootUser) {
            const salt = nodeCrypto.randomBytes(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SALT_BYTES"]).toString('hex');
            const hash = nodeCrypto.pbkdf2Sync(ROOT_PASSWORD, salt, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PBKDF2_ITERATIONS"], __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PBKDF2_KEY_LENGTH"], __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["PBKDF2_DIGEST"]).toString('hex');
            const newUser = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$models$2f$user$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"]({
                _id: new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$node_modules$2f$mongoose$2f$dist$2f$browser$2e$umd$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].Types.ObjectId(ROOT_ID),
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
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/lib/auth.ts [middleware-edge] (ecmascript)");
;
;
const USER_COOKIE_NAME = 'user';
async function middleware(request) {
    // Clone the request headers to be able to modify them
    const requestHeaders = new Headers(request.headers);
    const tokenCookie = request.cookies.get(USER_COOKIE_NAME);
    if (tokenCookie) {
        const token = tokenCookie.value;
        const decryptedUserId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["decryptAndVerify"])(token);
        if (decryptedUserId) {
            // If the token is valid, pass the user ID in the request headers
            // to API routes and server components.
            requestHeaders.set('x-user-id', decryptedUserId);
        }
    }
    // Create a new response with the updated headers
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: requestHeaders
        }
    });
    return response;
}
const config = {
    matcher: [
        '/api/:path*',
        '/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__e05fbf4d._.js.map