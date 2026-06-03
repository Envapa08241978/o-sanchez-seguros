import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Seguros | Consejos, Guías y Noticias",
  description:
    "Aprende sobre seguros de auto, gastos médicos, vida y ahorro en México. Consejos prácticos de O Sanchez Seguros para proteger tu patrimonio.",
  keywords: [
    "blog de seguros",
    "consejos seguros mexico",
    "guia seguro de auto",
    "como elegir gastos medicos",
    "educacion financiera seguros",
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/blog",
  },
  openGraph: {
    title: "Blog de Seguros | O Sanchez Seguros",
    description: "Consejos prácticos, guías y noticias sobre el mundo de los seguros en México.",
    url: "https://www.osanchezseguros.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
