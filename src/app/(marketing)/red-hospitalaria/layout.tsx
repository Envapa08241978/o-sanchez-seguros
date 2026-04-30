import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Red Hospitalaria en Hermosillo y Sonora | Hospitales Cubiertos",
  description:
    "Conoce los hospitales cubiertos por tu seguro de Gastos Médicos Mayores en Hermosillo: Hospital CIMA, San José, Clínica del Noroeste y Hospital Licona. Especialidades, direcciones y mapas.",
  keywords: [
    "red hospitalaria hermosillo",
    "hospitales seguros hermosillo",
    "hospital cima hermosillo seguros",
    "hospital san jose hermosillo",
    "clinica del noroeste hermosillo",
    "gastos medicos mayores hospitales sonora",
  ],
};

export default function RedHospitalariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
