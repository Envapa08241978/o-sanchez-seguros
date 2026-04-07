import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas/lead.schema";
import { createLead } from "@/lib/firebase/firestore";
import { sendEmailNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const id = await createLead({
      ...result.data,
      source: "website_form",
      city: "Hermosillo",
      state: "Sonora",
    });

    // Enviar alerta interna por correo
    await sendEmailNotification(
      `🔵 NUEVO LEAD: ${result.data.fullName} - ${result.data.insuranceType}`,
      `
      <h2>Has recibido un nuevo Lead en O Sanchez Seguros</h2>
      <p><strong>Nombre:</strong> ${result.data.fullName}</p>
      <p><strong>Teléfono:</strong> ${result.data.phone}</p>
      <p><strong>Correo:</strong> ${result.data.email}</p>
      <p><strong>Interés:</strong> ${result.data.insuranceType}</p>
      <br />
      <p>Este registro también se ha salvaguardado en Firebase Firestore.</p>
      `
    );

    return NextResponse.json(
      { success: true, id, message: "Lead creado correctamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
