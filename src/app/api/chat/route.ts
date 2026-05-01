import { streamText, convertToModelMessages } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { createManualLead } from "@/lib/firebase/firestore";
import { sendEmailNotification } from "@/lib/email";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
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
    5. IMPORTANTE: Cuando el usuario te proporcione su nombre Y teléfono (o WhatsApp), DEBES llamar la herramienta "capturarLead" inmediatamente con esos datos.
    6. Después de capturar el lead, confirma al usuario que un agente se pondrá en contacto pronto y agradece su confianza.
    7. Si el usuario también menciona su correo electrónico, inclúyelo. Si no lo menciona, usa una cadena vacía para el email.
    `;

    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: googleAuth("gemini-2.5-flash"), 
      messages: modelMessages,
      system: systemPrompt,
      tools: {
        capturarLead: {
          description: "Captura los datos del prospecto como lead cuando proporciona su nombre y teléfono. Llama esta herramienta inmediatamente cuando el usuario dé su nombre y número.",
          inputSchema: z.object({
            fullName: z.string().describe("Nombre completo del prospecto"),
            phone: z.string().describe("Número de teléfono o WhatsApp del prospecto"),
            email: z.string().optional().describe("Correo electrónico si lo proporcionó"),
            insuranceType: z.string().describe("Tipo de seguro que le interesa (ej: Gastos Médicos, Auto, Vida, Empresarial, Fronterizo)"),
          }),
          execute: async ({ fullName, phone, email, insuranceType }: { fullName: string; phone: string; email?: string; insuranceType: string }) => {
            try {
              const cleanPhone = phone.replace(/\D/g, "");
              
              const leadId = await createManualLead({
                fullName,
                phone: cleanPhone,
                email: email || "",
                insuranceType: insuranceType || "General",
                source: "Chat IA",
                notes: "Lead capturado automáticamente por el asistente virtual.",
              });

              // Send email notification (non-blocking)
              sendEmailNotification(
                `🤖 LEAD IA: ${fullName} - ${insuranceType}`,
                `
                <h2>Nuevo Lead capturado por el Asistente IA</h2>
                <p><strong>Nombre:</strong> ${fullName}</p>
                <p><strong>Teléfono:</strong> ${cleanPhone}</p>
                <p><strong>Correo:</strong> ${email || "No proporcionado"}</p>
                <p><strong>Interés:</strong> ${insuranceType}</p>
                <p><strong>Fuente:</strong> Chat IA (Asistente Virtual)</p>
                `
              ).catch((err: unknown) => console.error("Email notification failed:", err));

              return { 
                success: true, 
                leadId,
                message: `Lead "${fullName}" registrado exitosamente` 
              };
            } catch (err) {
              console.error("Error creating lead from chat:", err);
              return { 
                success: false, 
                message: "Error al registrar el lead" 
              };
            }
          },
        },
      },
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
