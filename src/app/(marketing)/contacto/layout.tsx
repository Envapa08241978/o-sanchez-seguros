import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizar Seguros en Hermosillo | Contacto",
  description:
    "Solicita una cotización de seguros sin compromiso en Hermosillo, Sonora. Gastos Médicos Mayores, Auto, Vida, Fronterizos y Empresariales. Respuesta en menos de 24 horas.",
  keywords: [
    "cotizar seguros hermosillo",
    "contacto agente seguros",
    "cotización gastos médicos",
    "cotizar seguro auto hermosillo",
    "seguros fronterizos cotizar",
  ],
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
