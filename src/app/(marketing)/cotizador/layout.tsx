import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizador Digital de Gastos Médicos Mayores 24/7 | OSanchez Seguros",
  description:
    "Calcula tu Seguro de Gastos Médicos Mayores en menos de 2 minutos. Planes oficiales AXA Flex Plus con cobertura en toda la República Mexicana y las mejores redes hospitalarias privadas. Opciones a 3, 5 y 6 Meses Sin Intereses.",
  keywords: [
    "cotizador gastos medicos mayores",
    "cotizador digital axa seguros",
    "cotizar seguro medico mexico",
    "seguro de gastos medicos mayores precios 2026",
    "axa flex plus cotizador",
    "cuanto cuesta un seguro de gastos medicos mayores",
    "seguro de gastos medicos hermosillo sonora",
    "seguro gastos medicos cdmx monterrey guadalajara",
    "comparar seguros de gastos medicos mayores",
    "seguro de gastos medicos a meses sin intereses",
    "agente de seguros certificado cnsf amasfac",
    "osanchez seguros cotizador",
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/cotizador",
  },
  openGraph: {
    title: "Cotizador Digital de Gastos Médicos Mayores | OSanchez Seguros",
    description:
      "Calcula en 2 minutos tu presupuesto personalizado para ti o tu familia con acceso a los mejores hospitales privados de México.",
    url: "https://www.osanchezseguros.com/cotizador",
    siteName: "OSanchez Seguros",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://www.osanchezseguros.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cotizador Gastos Médicos Mayores - OSanchez Seguros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotizador Digital de Gastos Médicos Mayores | OSanchez Seguros",
    description:
      "Calcula en tiempo real tus opciones de Gastos Médicos Mayores para ti y tu familia en cualquier estado de México.",
    images: ["https://www.osanchezseguros.com/images/og-image.png"],
  },
};

export default function CotizadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
