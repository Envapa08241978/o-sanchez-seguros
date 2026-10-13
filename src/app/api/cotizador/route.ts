import { NextResponse } from "next/server";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { addLeadHistoryEntry } from "@/lib/firebase/firestore";
import { sendEmailNotification } from "@/lib/email";
import { calculateNationalQuote } from "@/lib/calculators/nationalQuoterEngine";

const quoterRequestSchema = z.object({
  fullName: z.string().min(2, "El nombre es obligatorio"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  target: z.enum(["solo", "pareja", "familia", "padres"]),
  titularAge: z.number().min(18).max(99),
  titularGender: z.enum(["H", "M"]),
  partnerAge: z.number().min(18).max(99).optional(),
  partnerGender: z.enum(["H", "M"]).optional(),
  childrenAges: z.array(z.number().min(0).max(30)).optional(),
  zipCode: z.string().min(4).max(10),
  deductible: z.number().default(25000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = quoterRequestSchema.parse(body);

    // 1. Calcular cotización actuarial nacional
    const calculation = calculateNationalQuote({
      target: validatedData.target,
      titularAge: validatedData.titularAge,
      titularGender: validatedData.titularGender,
      partnerAge: validatedData.partnerAge,
      partnerGender: validatedData.partnerGender,
      childrenAges: validatedData.childrenAges,
      zipCode: validatedData.zipCode,
      deductible: validatedData.deductible,
    });

    const cleanPhone = validatedData.phone.replace(/\D/g, "");

    // 2. Guardar prospecto en Firestore (Colección leads)
    const leadDoc = {
      fullName: validatedData.fullName,
      phone: cleanPhone,
      email: validatedData.email,
      insuranceType: "gmm",
      source: "Cotizador Web Nacional",
      status: "new",
      priority: "hot",
      score: 85,
      city: calculation.state.name,
      state: calculation.state.name,
      zipCode: validatedData.zipCode,
      privacyConsent: true,
      notes: `Cotización GMM en línea para ${calculation.membersSummary}. Estado: ${calculation.state.name} (${calculation.state.zoneName}). Plan Confort estimado: $${calculation.plans[1].annualTotal.toLocaleString("es-MX")} MXN/año ($${calculation.plans[1].monthly12MSI.toLocaleString("es-MX")} MSI). Deducible seleccionado: $${validatedData.deductible.toLocaleString("es-MX")}.`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      privacyConsentDate: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "leads"), leadDoc);

    // Auto-registrar en timeline de CRM
    await addLeadHistoryEntry(docRef.id, {
      type: "quote",
      note: `Prospecto cotizó GMM en el Cotizador Nacional. Estado: ${calculation.state.name}. ${calculation.membersSummary}. Deducible: $${validatedData.deductible.toLocaleString("es-MX")}.`,
    });

    // 3. Enviar email de notificación al buzón oficial de Oscar
    const emailSubject = `🔴 NUEVO LEAD NACIONAL: ${validatedData.fullName} cotizó GMM en ${calculation.state.name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #202F71; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 20px;">🛡️ Nuevo Prospecto — Cotizador Nacional 24/7</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">O Sanchez Seguros · Cobertura República Mexicana</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <h2 style="font-size: 16px; color: #D32020; margin-top: 0;">Datos del Prospecto</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Nombre:</td><td>${validatedData.fullName}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Teléfono / WA:</td><td><a href="https://wa.me/52${cleanPhone}" style="color: #25D366; font-weight: bold; text-decoration: none;">+52 ${cleanPhone} (Abrir en WhatsApp)</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Correo:</td><td><a href="mailto:${validatedData.email}" style="color: #202F71;">${validatedData.email}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Ubicación:</td><td><strong>${calculation.state.name}</strong> (C.P. ${validatedData.zipCode})</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Integrantes:</td><td>${calculation.membersSummary}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Deducible:</td><td>$${validatedData.deductible.toLocaleString("es-MX")} MXN</td></tr>
          </table>

          <h3 style="font-size: 15px; color: #202F71; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">Presupuestos Estimados Mostrados en Pantalla:</h3>
          <ul style="font-size: 13px; line-height: 1.6; color: #475569;">
            <li><strong>Flex Esencial:</strong> $${calculation.plans[0].annualTotal.toLocaleString("es-MX")} MXN/año ($${calculation.plans[0].monthly12MSI.toLocaleString("es-MX")}/mes 12 MSI)</li>
            <li><strong>Flex Confort (Recomendado):</strong> $${calculation.plans[1].annualTotal.toLocaleString("es-MX")} MXN/año ($${calculation.plans[1].monthly12MSI.toLocaleString("es-MX")}/mes 12 MSI)</li>
            <li><strong>Flex Diamante Elite VIP:</strong> $${calculation.plans[2].annualTotal.toLocaleString("es-MX")} MXN/año ($${calculation.plans[2].monthly12MSI.toLocaleString("es-MX")}/mes 12 MSI)</li>
          </ul>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://wa.me/52${cleanPhone}?text=Hola%20${encodeURIComponent(validatedData.fullName)}%2C%20soy%20Oscar%20S%C3%A1nchez%20de%20O%20Sanchez%20Seguros.%20Vi%20tu%20cotizaci%C3%B3n%20de%20Gastos%20M%C3%A9dicos%20en%20nuestro%20portal%20para%20${encodeURIComponent(calculation.state.name)}.%20%C2%BFEn%20qu%C3%A9%20momento%20podemos%20platicar%20para%20afinar%20los%20detalles%20de%20tu%20p%C3%B3liza%3F" 
               style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Contactar por WhatsApp ahora 💬
            </a>
          </div>
        </div>
      </div>
    `;

    // Intentar envío de email (no bloquea el response)
    sendEmailNotification(emailSubject, emailHtml).catch((err) =>
      console.error("Error enviando email de cotizador nacional:", err)
    );

    // 4. Devolver cálculo + ID de lead al frontend
    return NextResponse.json({
      success: true,
      leadId: docRef.id,
      calculation,
    });
  } catch (error: any) {
    console.error("Error en /api/cotizador:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos o inválidos", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error al procesar la cotización. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
