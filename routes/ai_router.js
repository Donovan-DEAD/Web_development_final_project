// Import the necessary modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { MakeConsultToGemini } = require('./utils/geminiApi');

/**
 * @file ai_router.js
 * @description This file contains the routes for the AI assistant.
 * @module routes/ai_router
 * 
 * @requires express
 * @requires multer
 * @requires ./utils/geminiApi
 * 
 * @exports router
 * 
 * @see ./utils/geminiApi
 * @see ./views/ia_assistance.ejs
 * @see ./views/ia_response.ejs
 * 
 */

// Configure multer for image uploads
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
    fileFilter: (req, file, cb) => { // Filter files to only allow images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

/**
 * @name POST /
 * @description This route handles the AI assistant requests. It receives a context and an image, and then it makes a consult to the Gemini API.
 * 
 * @param {object} req - The request object.
 * @param {object} req.body - The request body.
 * @param {string} req.body.context - The context for the AI assistant.
 * @param {object} req.file - The image file.
 * @param {object} res - The response object.
 * 
 * @returns {void}
 * 
 * @redirects /ia-response
 * 
 * @see ./utils/geminiApi
 * @see ./views/ia_assistance.ejs
 * @see ./views/ia_response.ejs
 * 
 */
router.post('/', async (req, res) => {
    const uploadMiddleware = upload.single('image'); // Middleware to upload a single image

    uploadMiddleware(req, res, async(err) => { // Handle the image upload
        if (err instanceof multer.MulterError) { // If there is a multer error
            if (err.code === 'LIMIT_FILE_SIZE') { // If the file size is too large
                req.session.apiResponse = { error: 'Image exceeds the 10MB size limit.', showButton: true };
            } else { // If there is another multer error
                req.session.apiResponse = { error: err.message, showButton: true };
            }
            return res.redirect('/ia-response');
        } else if (err) { // If there is another error
            req.session.apiResponse = { error: err.message, showButton: true };
            return res.redirect('/ia-response');
        }

        const { context } = req.body; // Get the context from the request body
        const image = req.file; // Get the image from the request

        let image64 = ''; // Initialize the image64 variable
        let mimeType = ''; // Initialize the mimeType variable

        if (image) { // If there is an image
            image64 = image.buffer.toString('base64'); // Convert the image to base64
            mimeType = image.mimetype; // Get the mime type of the image
        } else if (!context) { // If there is no context
            req.session.apiResponse = { error: "Favor de utilizar esta herramienta correctamente mandando información que tenga que ver con el tema por favor.", showButton: true };
            return res.redirect('/ia-response');
        }

        const geminiResponse = await MakeConsultToGemini(context, image64, mimeType); // Make the consult to the Gemini API
        
        if (!geminiResponse) { // If there is no response from the Gemini API
            req.session.apiResponse = { error: "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.", showButton: true };
            return res.redirect('/ia-response');
        }

        const { correct_image, correct_context } = geminiResponse; // Get the correctness of the image and context from the Gemini API response

        if (!correct_image && !correct_context) { // If both the image and the context are incorrect
            req.session.apiResponse = { error: "Favor de utilizar esta herramienta correctamente mandando información que tenga que ver con el tema por favor.", showButton: true };
            return res.redirect('/ia-response');
        }

        let toastMessage = null; // Initialize the toast message
        if (!correct_image) { // If the image is incorrect
            toastMessage = "La imagen proporcionada no parece estar relacionada con la agricultura.";
        } else if (!correct_context) { // If the context is incorrect
            toastMessage = "El contexto proporcionado no parece estar relacionado con la agricultura.";
        }

        req.session.apiResponse = { // Set the apiResponse in the session
            data: geminiResponse || {
                error : "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
                showButton: true,
                toastMessage: null,
                data : {}
            },
            toastMessage: toastMessage,
            error: null,
            showButton: false
        };

        res.redirect('/ia-response'); // Redirect to the ia-response page
    });
});

module.exports = router; // Export the router