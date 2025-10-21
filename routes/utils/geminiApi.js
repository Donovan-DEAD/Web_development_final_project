const { GoogleGenAI } = require("@google/genai");

var Client_For_GENAI = null;
var Model_For_Request = null;

const InitializeGeminiClient = async ()=>{
    console.log("Attempting to initialize Gemini Client...");
    console.log("API_KEY_GEMINI:", process.env.API_KEY_GEMINI)
    try {
        Client_For_GENAI = new GoogleGenAI({apiKey: process.env.API_KEY_GEMINI});
        if (Client_For_GENAI) {
            console.log("Gemini Client initialized successfully.");
        } else {
            console.error("Failed to initialize Gemini Client: Client object is null or undefined.");
        }
        Model_For_Request = process.env.MODEL_FOR_REQUEST;
    } catch (error) {
        console.error("Error during Gemini Client initialization:", error);
    }
}

// utils/geminiApi.js (función MakeConsultToGemini)
const MakeConsultToGemini = async (prompt, image64, mimeType) => {
  console.log("Initiating consultation with Gemini API...");

  // Validaciones defensivas tempranas
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt inválido");
  }

  const hasImage = typeof image64 === "string" && image64.length > 0;
  const hasMime = typeof mimeType === "string" && mimeType.length > 0;

  if (hasImage && !hasMime) {
    throw new Error("MimeType inválido cuando se proporciona imagen");
  }

  try {
    // Construimos parts dinámicamente y sólo agregamos inlineData si existe imagen válida
    const parts = [];

    if (hasImage) {
      // si image64 viene con prefijo 'data:...' lo limpiamos; si no, lo dejamos
      const cleanData = image64.startsWith("data:")
        ? image64.replace(/^data:image\/\w+;base64,/, "")
        : image64;

      // sanity: no enviar inlineData si el resultado queda vacío
      if (!cleanData || cleanData.length < 10) {
        throw new Error("Imagen base64 inválida o demasiado corta para procesar");
      }

      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: cleanData
        }
      });
    }

    // siempre agregamos el texto del prompt como otra parte
    parts.push({
      text:
        prompt +
        "\n\nConsidera en tu respuesta que somos una entidad que busca, con información basada en estudios científicos, hacer recomendaciones sobre la situación que se muestra según lo descrito en la imagen y el prompt. Limítate a solo responder lo que tiene que ver con el tema y siempre con profesionalismo sobre la situación que se presenta en agricultura, dando consejos acordes a lo presentado. En caso de que la imagen o el prompt no tenga que ver con el tema de agricultura, indícalo en el response schema que te indique con booleanos y responde con la información que se te proporcione que sea correcta. En caso de no ser ninguna, responde con elementos vacíos."
    });

    const contents = [
      {
        parts
      }
    ];

    // Log de trazabilidad (no exponer base64 completo)
    console.log("Payload summary for Gemini:", {
      model: Model_For_Request,
      contentsPartsCount: contents[0].parts.length,
      includesInlineData: hasImage,
      mimeType: hasImage ? mimeType : null,
      imageBase64Length: hasImage ? (image64.length || 0) : 0
    });

    const response = await Client_For_GENAI.models.generateContent({
      model: Model_For_Request,
      contents,
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

    console.log("Full response from Gemini API (summary):", {
      candidatesLength: Array.isArray(response?.candidates) ? response.candidates.length : 0
    });

    if (response && response.candidates && response.candidates.length > 0) {
      // asumimos que content.parts[0].text existe según tu payload
      const text = response.candidates[0].content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Respuesta de Gemini no contiene el texto esperado");
      }
      return JSON.parse(text);
    } else {
      console.error("Invalid response structure from Gemini API:", response);
      return null;
    }
  } catch (error) {
    console.error("Error making consultation to Gemini API:", error);
    // Si el SDK devuelve info adicional en error.response, loguearla para depuración
    if (error.response) {
      console.error("Gemini API response status:", error.response.status);
      console.error("Gemini API response data keys:", error.response.data ? Object.keys(error.response.data) : null);
    }
    return null;
  }
};

module.exports = {
    InitializeGeminiClient,
    MakeConsultToGemini
}