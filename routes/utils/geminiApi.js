const { GoogleGenAI } = require("@google/genai");

var Client_For_GENAI = null;
var Model_For_Request = null;

const InitializeGeminiClient = async ()=>{
    Client_For_GENAI = new GoogleGenAI({apiKey: process.env.API_KEY_GEMINI});
    Model_For_Request = process.env.MODEL_FOR_REQUEST;
}

const MakeConsultToGemini = async(prompt, image64, mimeType)=>{
    try{
        if (!prompt || typeof prompt !== 'string') throw new Error('Prompt inválido');
        if (!image64 || typeof image64 !== 'string') throw new Error('Imagen base64 inválida');
        if (!mimeType || typeof mimeType !== 'string') throw new Error('MimeType inválido');

        const response = await Client_For_GENAI.models.generateContent({
        model: Model_For_Request,
        contents: [
            {
            parts: [
                {
                inlineData: {
                    mimeType: mimeType,
                    data: image64.replace(/^data:image\/\w+;base64,/, "")
                }
                },
                {
                text: prompt +
                    "\n\nConsidera en tu respuesta que somos una entidad que busca, con información basada en estudios científicos, hacer recomendaciones sobre la situación que se muestra según lo descrito en la imagen y el prompt. Limítate a solo responder lo que tiene que ver con el tema y siempre con profesionalismo sobre la situación que se presenta en agricultura, dando consejos acordes a lo presentado." +
                    " En caso de que la imagen o el prompt no tenga que ver con el tema de agricultura, indícalo en el response schema que te indique con booleanos y responde con la información que se te proporcione que sea correcta. En caso de no ser ninguna, responde con elementos vacíos."
                }
            ]
            }
        ],
        config: {
            candidateCount: 1,
            responseMimeType: "application/json",
            responseSchema: {
            type: "object",
            properties: {
                nivel_de_peligro: { type: "string", enum: ["aprobado", "mejorable", "peligro"] },
                diagnostico: { type: "string" },
                recomendations: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 3 },
                tecnicas_a_usar: {
                    type: "array",
                    minItems: 1,
                    maxItems: 4,
                    items: {
                        type: "object",
                        properties: {
                        name: { type: "string" },
                        description: { type: "string" }
                        },
                        required: ["name", "description"]
                    }
                },
                correct_image: { type: "boolean" },
                correct_context: { type: "boolean" }
                },
                required: ["nivel_de_peligro", "diagnostico", "recomendations", "tecnicas_a_usar", "correct_image", "correct_context"]
            },
            temperature: 0.5
        }
        });
        if (response && response.candidates && response.candidates.length > 0) {
            console.log("Response status: OK");
            return JSON.parse(response.candidates[0].content.parts[0].text);
        } else {
            console.error("Invalid response structure from Gemini API:", response);
            return null;
        }

    } catch(error){
        console.error("Error making consultation to Gemini API:", error);
        if (error.response) {
            console.error("Gemini API response status:", error.response.status);
            console.error("Gemini API response data:", error.response.data);
        }
        return null
    
    }
}

module.exports = {
    InitializeGeminiClient,
    MakeConsultToGemini
}