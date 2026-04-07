import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/lead.schema";
import { createContactSubmission } from "@/lib/firebase/firestore";
import { sendEmailNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const id = await createContactSubmission(result.data);

    // Enviar correo de alerta
    await sendEmailNotification(
      `🟡 NUEVO MENSAJE DE CONTACTO: ${result.data.fullName}`,
      `
      <h2>Recibiste un mensaje desde el formulario principal</h2>
      <p><strong>Nombre:</strong> ${result.data.fullName}</p>
      <p><strong>Teléfono:</strong> ${result.data.phone}</p>
      <p><strong>Correo:</strong> ${result.data.email}</p>
      <p><strong>Interés:</strong> ${result.data.insuranceType || "General"}</p>
      <br />
      <p><strong>Mensaje del cliente:</strong></p>
      <blockquote>${result.data.message || "No dejó mensaje adicional."}</blockquote>
      `
    );

    return NextResponse.json(
      { success: true, id, message: "Mensaje enviado correctamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
