import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
// import ChatWidget from "@/components/shared/ChatWidget"; // TEMPORALMENTE DESACTIVADO - trabajar localmente antes de activar
import JsonLd from "@/components/shared/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://osanchezseguros.com"),
  title: {
    default:
      "O Sanchez Seguros | Especialista en Seguros desde 2009 | Hermosillo, Sonora",
    template: "%s | O Sanchez Seguros",
  },
  description:
    "Protege lo que más importa con más de 16 años de experiencia. Gastos Médicos Mayores, Seguros Fronterizos, Vida, Auto y Empresariales en Hermosillo, Sonora. Cotiza ahora.",
  keywords: [
    "seguros en hermosillo",
    "seguros de auto en hermosillo",
    "seguros de vida en hermosillo",
    "gastos médicos mayores hermosillo",
    "asesoría personalizada en seguros",
    "seguro de maternidad",
    "seguro para parto",
    "seguros para embarazadas",
    "seguros empresariales",
    "seguros hermosillo",
    "seguros fronterizos sonora",
    "agente de seguros hermosillo",
    "hospital cima hermosillo seguros",
    "seguros para cruzar a estados unidos",
  ],
  authors: [{ name: "O Sanchez Seguros" }],
  creator: "soy nexo",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://osanchezseguros.com",
    siteName: "O Sanchez Seguros",
    title: "O Sanchez Seguros | Especialista en Seguros desde 2009",
    description:
      "Más de 16 años protegiendo familias y empresas en Hermosillo, Sonora. Gastos Médicos Mayores, Seguros Fronterizos, Vida, Auto y Empresariales.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "O Sanchez Seguros — Hermosillo, Sonora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O Sanchez Seguros | Seguros en Hermosillo",
    description:
      "Especialista en seguros desde 2009. Cotiza Gastos Médicos Mayores, Seguros Fronterizos y más.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/icon-512.png",
  },
  alternates: {
    canonical: "https://www.osanchezseguros.com",
    languages: {
      "es-MX": "https://www.osanchezseguros.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-18 md:pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        {/* <ChatWidget /> TEMPORALMENTE DESACTIVADO */}
        <JsonLd />
        <GoogleAnalytics gaId="G-45R76JVTZS" />
      </body>
    </html>
  );
}
