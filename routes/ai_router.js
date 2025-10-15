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
            // A Multer error occurred when uploading.
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'Image exceeds the 10MB size limit.' });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(400).json({ message: err.message });
        }

        // Everything went fine.
        const { context } = req.body;
        const image = req.file;

        if (!image || !context) {
            return res.status(400).render('ia_response', { 
                error: "Favor de utilizar esta herramienta correctamente mandando información que tenga que ver con el tema por favor.",
                showButton: true
            });
        }

        const image64 = image.buffer.toString('base64');
        const mimeType = image.mimetype;

        const geminiResponse = await MakeConsultToGemini(context, image64, mimeType);
        console.log(geminiResponse)
        
        if (!geminiResponse) {
            return res.status(500).render('ia_response', {
                error: "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
                showButton: true
            });
        }

        const { correct_image, correct_context } = geminiResponse;

        if (!correct_image && !correct_context) {
            return res.render('ia_response', {
                error: "Favor de utilizar esta herramienta correctamente mandando información que tenga que ver con el tema por favor.",
                showButton: true
            });
        }

        let toastMessage = null;
        if (!correct_image) {
            toastMessage = "La imagen proporcionada no parece estar relacionada con la agricultura.";
        } else if (!correct_context) {
            toastMessage = "El contexto proporcionado no parece estar relacionado con la agricultura.";
        }

        res.render("ia_response", {
            data: geminiResponse,
            toastMessage: toastMessage,
            error: null,
            showButton: false,
            username : req.user ? req.user.name.split(" ")[0] : null,
            current_page: ''
        });
    });
});

module.exports = router;