export const SITE_CONFIG = {
  name: "O Sanchez Seguros",
  fullName: "Oscar Sánchez Aguirre",
  tagline: "Especialista en Seguros desde 2009",
  description:
    "Protege lo que más importa con la experiencia de más de 16 años en seguros. Gastos Médicos Mayores, Seguros Fronterizos, Vida, Auto y Empresariales en Hermosillo, Sonora.",
  phone: "+52 662 182 2481",
  phoneDisplay: "662 182 2481",
  whatsapp: "5216621822481",
  whatsappUrl: "https://wa.me/5216621822481",
  email: "admon@osanchezseguros.com",
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
  {
    id: "vida",
    title: "Seguros de Vida",
    shortTitle: "Vida",
    description:
      "Garantiza el bienestar financiero de tu familia. Planes flexibles con ahorro e inversión.",
    icon: "❤️",
    href: "/seguros/vida",
    color: "#DC2626",
    highlights: [
      "Protección familiar integral",
      "Ahorro e inversión",
      "Cobertura por invalidez",
      "Beneficios fiscales",
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
  { name: "AXA Seguros", logo: "/images/insurers/axa.svg" },
  { name: "CHUBB", logo: "/images/insurers/chubb.svg" },
  { name: "Qualitas", logo: "/images/insurers/qualitas.svg" },
  { name: "Allianz", logo: "/images/insurers/allianz.svg" },
  { name: "GNP Seguros", logo: "/images/insurers/gnp.svg" },
  { name: "MetLife", logo: "/images/insurers/metlife.svg" },
  { name: "Seguros Monterrey", logo: "/images/insurers/monterrey.svg" },
  { name: "Zurich", logo: "/images/insurers/zurich.svg" },
  { name: "BUPA", logo: "/images/insurers/bupa.svg" },
  { name: "Mapfre", logo: "/images/insurers/mapfre.svg" },
  { name: "Inbursa", logo: "/images/insurers/inbursa.svg" },
  { name: "Banorte Seguros", logo: "/images/insurers/banorte.svg" },
  { name: "Atlas", logo: "/images/insurers/atlas.svg" },
  { name: "General de Salud", logo: "/images/insurers/gds.svg" },
] as const;
