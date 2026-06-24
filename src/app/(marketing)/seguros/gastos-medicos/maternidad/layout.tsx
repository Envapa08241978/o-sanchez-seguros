import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seguro de Maternidad y Apoyo para Parto en Hermosillo",
  description:
    "Obtén ayuda de maternidad extendida desde $35,000 hasta $170,000 pesos. Conoce los seguros para parto y embarazo en Hermosillo. Planifica con 10 meses de anticipación.",
  keywords: [
    "seguro para parto",
    "seguros para embarazadas",
    "seguros que pagan el embarazo",
    "seguros maternos",
    "ayuda de maternidad extendida",
    "seguro con pago de maternidad",
    "gastos medicos embarazo hermosillo",
    "cuanto cuesta un parto en hermosillo 2026",
    "precio cesarea hospital cima hermosillo",
    "costo de parto clinica del noroeste",
    "paquetes de maternidad hospital san jose hermosillo",
    "paquetes de parto hospital san diego de alcala",
    "seguro de gastos medicos para embarazadas hermosillo",
    "seguro para cubrir cesarea hermosillo",
    "mejores seguros para embarazadas hermosillo",
    "hospital licona hermosillo paquetes de maternidad"
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/seguros/gastos-medicos/maternidad",
  },
  openGraph: {
    title: "Seguro de Maternidad y Apoyo para Parto en Hermosillo",
    description:
      "Obtén ayuda de maternidad extendida desde $35,000 hasta $170,000 pesos. Conoce los seguros para parto y embarazo en Hermosillo.",
    url: "https://www.osanchezseguros.com/seguros/gastos-medicos/maternidad",
    type: "website",
  },
};

export default function MaternidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
