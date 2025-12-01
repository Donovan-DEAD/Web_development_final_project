import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;
let model: GenerativeModel | null = null;

const initializeGeminiClient = () => {
  if (!genAI) {
    const apiKey = process.env.API_KEY_GEMINI;
    if (!apiKey) {
      throw new Error("API_KEY_GEMINI environment variable is not set.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  
  if (!model) {
    const modelName = process.env.MODEL_FOR_REQUEST;
    if (!modelName) {
      throw new Error("MODEL_FOR_REQUEST environment variable is not set.");
    }
    // Define the response schema based on the original project
    const generationConfig = {
      responseMimeType: "application/json",
      // The schema is complex and better defined inline where it's used
    };
    model = genAI.getGenerativeModel({ model: modelName, generationConfig });
  }
};


export const makeConsultToGemini = async (prompt: string, imageBase64?: string, mimeType?: string) => {
  try {
    initializeGeminiClient();

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt provided.');
    }

    const parts: any[] = [{ text: prompt + `

Considera en tu respuesta que somos una entidad que busca, con información basada en estudios científicos, hacer recomendaciones sobre la situación que se muestra según lo descrito en la imagen y el prompt. Limítate a solo responder lo que tiene que ver con el tema y siempre con profesionalismo sobre la situación que se presenta en agricultura, dando consejos acordes a lo presentado.` + ` En caso de que la imagen o el prompt no tenga que ver con el tema de agricultura, indícalo en el response schema que te indique con booleanos y responde con la información que se te proporcione que sea correcta. En caso de no ser ninguna, responde con elementos vacíos. Dame tu respuesta en ingles.` }];

    if (imageBase64 && mimeType) {
      parts.unshift({
        inlineData: {
          mimeType: mimeType,
          data: imageBase64.replace(/^data:image\/\w+;base64,/, "")
        }
      });
    }

    //@ts-ignore
    const result = await model!.generateContent({
        contents: [{ parts }],
        generationConfig: {
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
                is_image_agricultural_related: { type: "boolean" },
                is_context_agricultural_related: { type: "boolean" }
                },
                required: ["nivel_de_peligro", "diagnostico", "recomendations", "tecnicas_a_usar", "is_image_agricultural_related", "is_context_agricultural_related"]
            },
            temperature: 0.5
        }
    });

    const response = result.response;
    const text = response.text();
    return JSON.parse(text);

  } catch (error: any) {
    console.error("Error making consultation to Gemini API:", error);
    if (error.response) {
      console.error("Gemini API response status:", error.response.status);
      console.error("Gemini API response data:", error.response.data);
    }
    return null;
  }
};
