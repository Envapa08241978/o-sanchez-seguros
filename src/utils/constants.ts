export const SITE_CONFIG = {
  name: "O Sanchez Seguros",
  fullName: "Oscar Sánchez Aguirre",
  tagline: "Especialista en Seguros desde 2009",
  description:
    "Protege lo que más importa con la experiencia de más de 16 años en seguros. Gastos Médicos Mayores, Seguros Fronterizos, Vida, Auto y Empresariales en Hermosillo, Sonora.",
  phone: "+52 662 182 2481",
  phoneDisplay: "662 182 2481",
  whatsapp: "526621822481",
  whatsappUrl: "https://wa.me/526621822481",
  email: "oscareduardosanchezaguirre@gmail.com",
  address: "Hermosillo, Sonora, México",
  yearFounded: 2009,
  yearsOfExperience: 16,
  socialMedia: {
    tiktok: "https://www.tiktok.com/@oscarsanchez4600",
    instagram: "https://www.instagram.com/oscar.sanchezag",
    facebook: "https://www.facebook.com/share/1DnREkRfRw/",
    linkedin: "https://www.linkedin.com/in/oscar-e-sanchez-aguirre-946bb3129",
  },
  officeHours: "Lunes a Viernes: 9:00 AM - 6:00 PM",
} as const;

export const INSURANCE_PRODUCTS = [
  {
    id: "vida",
    title: "Seguros de Vida",
    shortTitle: "Vida",
    description:
      "Garantiza el bienestar financiero de tu familia. Planes flexibles para protección integral.",
    icon: "❤️",
    href: "/seguros/vida",
    color: "#DC2626",
    highlights: [
      "Protección familiar integral",
      "Cobertura por invalidez",
      "Garantía de futuro",
      "Beneficios fiscales",
    ],
  },
  {
    id: "gmm",
    title: "Gastos Médicos Mayores",
    shortTitle: "GMM",
    description:
      "Protección médica de primer nivel con acceso a la mejor red hospitalaria de Hermosillo. Hospital CIMA, San José y más.",
    icon: "🏥",
    href: "/seguros/gastos-medicos",
    color: "#2563EB",
    highlights: [
      "Red hospitalaria premium",
      "Cobertura nacional e internacional",
      "Atención en Hospital CIMA y San José",
      "Maternidad y padecimientos mayores",
    ],
  },
  {
    id: "auto",
    title: "Seguros de Auto",
    shortTitle: "Auto",
    description:
      "La mejor protección para tu vehículo con coberturas amplias y asistencia vial 24/7.",
    icon: "🚗",
    href: "/seguros/auto",
    color: "#7C3AED",
    highlights: [
      "Cobertura amplia y limitada",
      "Asistencia vial 24/7",
      "Daños a terceros",
      "Robo total y parcial",
    ],
  },
  {
    id: "vida-ahorro",
    title: "Seguros de Vida con Ahorro",
    shortTitle: "Vida con Ahorro",
    description:
      "Construye tu futuro mientras te proteges. Planes garantizados para el retiro o la educación de tus hijos.",
    icon: "📈",
    href: "/seguros/vida-con-ahorro",
    color: "#1E3A8A",
    highlights: [
      "Planes de retiro garantizados",
      "Fideicomiso educativo",
      "Rendimientos competitivos",
      "Seguro de vida integrado",
    ],
  },
  {
    id: "empresarial",
    title: "Seguros Empresariales",
    shortTitle: "Empresarial",
    description:
      "Protege tu negocio, empleados y patrimonio empresarial con soluciones integrales.",
    icon: "🏢",
    href: "/seguros/empresarial",
    color: "#B45309",
    highlights: [
      "Seguros de grupo para empleados",
      "Responsabilidad civil empresarial",
      "Protección de activos",
      "Fianzas y garantías",
    ],
  },
  {
    id: "fronterizo",
    title: "Seguros Fronterizos",
    shortTitle: "Fronterizos/USA",
    description:
      "Cobertura especial para quienes cruzan la frontera. Protección médica y vehicular en Estados Unidos.",
    icon: "🌎",
    href: "/seguros/fronterizos",
    color: "#059669",
    highlights: [
      "Cobertura médica en USA",
      "Seguro vehicular transfronterizo",
      "Asistencia en carretera binacional",
      "Trámites simplificados",
    ],
  },
] as const;

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon: string }[];
}

export const NAVIGATION: { main: NavItem[]; legal: NavItem[] } = {
  main: [
    { label: "Inicio", href: "/" },
    {
      label: "Seguros",
      href: "/seguros",
      children: INSURANCE_PRODUCTS.map((p) => ({
        label: p.title,
        href: p.href,
        icon: p.icon,
      })),
    },
    { label: "Red Hospitalaria", href: "/red-hospitalaria" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  legal: [
    { label: "Aviso de Privacidad", href: "/aviso-privacidad" },
    { label: "Cédula del Agente", href: "/cedula-agente" },
    { label: "Derechos Básicos", href: "/derechos-basicos" },
  ],
};

export const INSURERS = [
  { name: "AXA Seguros", logo: "/images/axxa.jpeg", quoteUrl: "https://www.axa.mx/cotizador" },
  { name: "CHUBB", logo: "/images/chubb.jpeg", quoteUrl: "https://www.chubb.com/mx-es/" },
  { name: "Allianz", logo: "/images/ALLIANZ.jpeg", quoteUrl: "https://www.allianz.com.mx/" },
  { name: "Qualitas", logo: "/images/quALITAS.jpeg", quoteUrl: "https://www.qualitas.com.mx/cotizador" },
  { name: "BX+", logo: "/images/SEGUROS_BX.jpeg", quoteUrl: "https://www.vepormas.com/seguros/" },
  { name: "GNP Seguros", logo: "/images/GNP.jpeg", quoteUrl: "https://www.gnp.com.mx/cotizador" },
  { name: "Plan Seguro", logo: "/images/PLAN SEGURO.jpeg", quoteUrl: "https://www.planseguro.com.mx/" },
  { name: "Zurich", logo: "", quoteUrl: "https://www.zurich.com.mx/" },
  { name: "Mapfre", logo: "/images/MAPFRE.jpeg", quoteUrl: "https://www.mapfre.com.mx/cotizador" },
  { name: "Inbursa", logo: "/images/INBURSA SEGUROS.jpeg", quoteUrl: "https://www.inbursa.com/Seguros" },
  { name: "Banorte Seguros", logo: "/images/BANORTE SEGUROS.jpeg", quoteUrl: "https://www.banorte.com/seguros" },
  { name: "Atlas", logo: "/images/SEGUROS ALTLAS.jpeg", quoteUrl: "https://www.segurosatlas.com.mx/" },
  { name: "General de Seguros", logo: "/images/GENERAL DE SEGUROS.jpeg", quoteUrl: "https://www.gseguros.com.mx/" },
  { name: "SURA", logo: "/images/SURA.jpeg", quoteUrl: "https://www.segurossura.com.mx/" },
  { name: "HDI", logo: "/images/HDI.jpeg", quoteUrl: "https://www.hdi.com.mx/cotizador" },
  { name: "GMX", logo: "/images/GMX SEGUROS.jpeg", quoteUrl: "https://www.gmx.com.mx/" },
  { name: "Ana Seguros", logo: "/images/ANA SEGUROS.jpeg", quoteUrl: "https://www.anaseguros.com.mx/" },
  { name: "Primero Seguros", logo: "/images/PRIMERO SEGUROS.jpeg", quoteUrl: "https://www.primeroseguros.com/" },
  { name: "El Potosí", logo: "/images/SEGUROS EL POTOSI.jpeg", quoteUrl: "https://www.elpotosi.com.mx/" },
  { name: "Aserta", logo: "/images/ASERTA SEGUROS.jpeg", quoteUrl: "https://www.aserta.com.mx/" },
] as const;
