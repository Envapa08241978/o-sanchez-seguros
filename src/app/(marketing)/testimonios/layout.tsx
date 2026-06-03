import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios y Reseñas — Clientes Satisfechos",
  description:
    "Lee lo que nuestros clientes en Hermosillo y todo Sonora dicen sobre nuestro servicio. O Sanchez Seguros: asesoría confiable con 5 estrellas en Google.",
  keywords: [
    "reseñas seguros hermosillo",
    "testimonios oscar sanchez seguros",
    "opiniones seguro gastos medicos hermosillo",
    "mejor agente de seguros hermosillo",
    "agencia seguros 5 estrellas",
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/testimonios",
  },
  openGraph: {
    title: "Testimonios y Opiniones | O Sanchez Seguros",
    description: "Clientes reales, historias reales. Más de 16 años protegiendo el patrimonio de las familias sonorenses.",
    url: "https://www.osanchezseguros.com/testimonios",
  },
};

export default function TestimoniosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
