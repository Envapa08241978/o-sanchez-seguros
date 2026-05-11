import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Red Hospitalaria y Dental en Sonora y Nacional | Buscadores Oficiales",
  description:
    "Consulta la red hospitalaria y dental cubierta por tu seguro. Accede a los buscadores oficiales de AXA, GNP, BX+ Seguros y Centauro Clínica Dental para encontrar hospitales, médicos y dentistas cerca de ti.",
  keywords: [
    "red hospitalaria seguros hermosillo",
    "buscador hospitales AXA seguros",
    "directorio médicos GNP seguros",
    "red hospitalaria BX+ seguros",
    "red dental Centauro",
    "hospitales cubiertos seguro gastos médicos",
    "buscar hospital seguro hermosillo",
    "red médica aseguradoras sonora",
    "directorio proveedores médicos seguros",
    "cobertura hospitalaria seguros México",
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/red-hospitalaria",
  },
  openGraph: {
    title: "Red Hospitalaria y Dental — Buscadores Oficiales | O Sanchez Seguros",
    description:
      "Encuentra hospitales, médicos y dentistas cubiertos por tu seguro. Buscadores oficiales de AXA, GNP, BX+ y Centauro.",
    url: "https://www.osanchezseguros.com/red-hospitalaria",
  },
};

export default function RedHospitalariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
