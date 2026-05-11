import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizar Seguros en Hermosillo | Contacto",
  description:
    "Solicita una cotización de seguros sin compromiso en Hermosillo, Sonora. Gastos Médicos Mayores, Auto, Vida, Empresariales y Vida con Ahorro. Respuesta en menos de 24 horas.",
  keywords: [
    "cotizar seguros hermosillo",
    "contacto agente seguros hermosillo",
    "cotización gastos médicos mayores",
    "cotizar seguro auto hermosillo",
    "cotizar seguro de vida hermosillo",
    "cotizar seguro empresarial sonora",
    "asesor de seguros hermosillo contacto",
    "seguros en hermosillo cotización gratis",
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/contacto",
  },
  openGraph: {
    title: "Cotiza tu Seguro sin Compromiso | O Sanchez Seguros",
    description:
      "Solicita una cotización personalizada de seguros en Hermosillo. Gastos Médicos, Auto, Vida, Empresariales. Respuesta en menos de 24 horas.",
    url: "https://www.osanchezseguros.com/contacto",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
