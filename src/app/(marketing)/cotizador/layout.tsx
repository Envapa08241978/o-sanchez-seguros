import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizador de Gastos Médicos Mayores en Línea 24/7 | Toda la República Mexicana",
  description:
    "Cotiza tu Seguro de Gastos Médicos Mayores en 2 minutos. Planes oficiales AXA Flex Plus con acceso a los mejores hospitales de México (CIMA, San José, Ángeles, ABC, Médica Sur). Opciones de 3, 5 y 6 Meses Sin Intereses.",
  keywords: [
    "cotizador gastos medicos mayores",
    "cotizar seguro medico mexico",
    "seguro de gastos medicos mayores axa",
    "cotizador seguro de salud online",
    "seguro de gastos medicos hermosillo",
    "seguro de gastos medicos cdmx monterrey guadalajara",
    "comparar seguros de gastos medicos mayores",
    "seguro de gastos medicos a meses sin intereses",
    "oscar sanchez agente de seguros",
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/cotizador",
  },
  openGraph: {
    title: "Cotizador Nacional de Gastos Médicos Mayores 24/7 | O Sanchez Seguros",
    description:
      "Calcula en tiempo real tus opciones de Gastos Médicos Mayores para ti y tu familia en cualquier estado de México.",
    url: "https://osanchezseguros.com/cotizador",
    type: "website",
  },
};

export default function CotizadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
