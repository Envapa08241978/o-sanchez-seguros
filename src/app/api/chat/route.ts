import { streamText, convertToModelMessages } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Inicialización dentro del runtime para que tome el valor de la variable de entorno
    // actualizado, resolviendo problemas de variables en caché de Vercel.
    const googleAuth = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "", 
    });

    const { messages } = await req.json();

    const systemPrompt = `
    Eres el Asistente Virtual Oficial de "O Sanchez Seguros", una agencia de seguros confiable y premium ubicada en Hermosillo, Sonora.
    El Agente principal es Oscar Sánchez Aguirre, autorizado por la CNSF.
    Venden seguros de: Gastos Médicos Mayores, Autos, Vida, Empresariales y Seguros Fronterizos (USA).
    Aseguradoras Aliadas: AXA, CHUBB, Qualitas, Allianz, entre otras.

    Tus instrucciones son:
    1. Tu objetivo es perfilar al usuario (saber qué seguro busca) y pedir sutilmente su Nombre y Número de Teléfono (o WhatsApp) para que un agente se comunique.
    2. Sé amable, profesional, conciso y transmite muchísima confianza. No escribas enormes bloques de texto. 
    3. Nunca des precios exactos, ya que todo seguro depende del perfil. Menciona que manejamos excelentes planes a la medida.
    4. Resuelve dudas básicas de seguros (ej. "qué es un deducible", "me cubre en USA"), pero siempre invitando a la asesoría personalizada real.
    `;

    // Convert UIMessage format (v6) to model messages for Gemini
    const modelMessages = await convertToModelMessages(messages);

    // Provide the model, messages, and system instructions
    const result = await streamText({
      model: googleAuth("gemini-2.5-flash"), 
      messages: modelMessages,
      system: systemPrompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
