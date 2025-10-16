const express = require('express');
const router = express.Router();
const multer = require('multer');
const { MakeConsultToGemini } = require('./geminiApi');

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

router.post('/', async (req, res) => {
    const uploadMiddleware = upload.single('image');

    uploadMiddleware(req, res, async(err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                req.session.apiResponse = { error: 'Image exceeds the 10MB size limit.', showButton: true };
            } else {
                req.session.apiResponse = { error: err.message, showButton: true };
            }
            return res.redirect('/ia-response');
        } else if (err) {
            req.session.apiResponse = { error: err.message, showButton: true };
            return res.redirect('/ia-response');
        }

        const { context } = req.body;
        const image = req.file;

        let image64 = '';
        let mimeType = '';

        if (image) {
            image64 = image.buffer.toString('base64');
            mimeType = image.mimetype;
        } else if (!context) {
            req.session.apiResponse = { error: "Favor de utilizar esta herramienta correctamente mandando información que tenga que ver con el tema por favor.", showButton: true };
            return res.redirect('/ia-response');
        }

        const geminiResponse = await MakeConsultToGemini(context, image64, mimeType);
        
        if (!geminiResponse) {
            req.session.apiResponse = { error: "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.", showButton: true };
            return res.redirect('/ia-response');
        }

        const { correct_image, correct_context } = geminiResponse;

        if (!correct_image && !correct_context) {
            req.session.apiResponse = { error: "Favor de utilizar esta herramienta correctamente mandando información que tenga que ver con el tema por favor.", showButton: true };
            return res.redirect('/ia-response');
        }

        let toastMessage = null;
        if (!correct_image) {
            toastMessage = "La imagen proporcionada no parece estar relacionada con la agricultura.";
        } else if (!correct_context) {
            toastMessage = "El contexto proporcionado no parece estar relacionado con la agricultura.";
        }

        req.session.apiResponse = {
            data: geminiResponse,
            toastMessage: toastMessage,
            error: null,
            showButton: false
        };

        res.redirect('/ia-response');
    });
});

module.exports = router;