import { SITE_CONFIG } from "@/utils/constants";

// ============================================================
// Schema.org JSON-LD para SEO — O Sanchez Seguros
// ============================================================

/** Schema principal: InsuranceAgency + LocalBusiness */
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": "https://www.osanchezseguros.com/#organization",
    name: SITE_CONFIG.name,
    alternateName: "O Sanchez Seguros",
    url: "https://www.osanchezseguros.com",
    logo: "https://www.osanchezseguros.com/images/logo-header.svg",
    image: "https://www.osanchezseguros.com/images/og-image.png",
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: "admon@osanchezseguros.com",
    foundingDate: "2009",
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
      jobTitle: "Agente de Seguros Certificado CNSF",
      url: "https://www.osanchezseguros.com/nosotros",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hermosillo",
      addressRegion: "Sonora",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.0729,
      longitude: -110.9559,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Hermosillo",
        "@id": "https://www.wikidata.org/wiki/Q81540",
      },
      {
        "@type": "State",
        name: "Sonora",
      },
      {
        "@type": "Country",
        name: "México",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      SITE_CONFIG.socialMedia.facebook,
      SITE_CONFIG.socialMedia.instagram,
      SITE_CONFIG.socialMedia.linkedin,
      SITE_CONFIG.socialMedia.tiktok,
    ],
    priceRange: "$$",
    currenciesAccepted: "MXN",
    paymentAccepted: "Efectivo, Tarjeta de crédito, Transferencia bancaria",
  };
}

/** Schema del sitio web con acción de búsqueda */
function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.osanchezseguros.com/#website",
    name: SITE_CONFIG.name,
    url: "https://www.osanchezseguros.com",
    description: SITE_CONFIG.description,
    publisher: {
      "@id": "https://www.osanchezseguros.com/#organization",
    },
    inLanguage: "es-MX",
  };
}

/** Schema de servicios de seguros */
function getServicesSchema() {
  const services = [
    {
      name: "Seguros de Vida",
      description:
        "Protección financiera integral para tu familia. Planes flexibles con cobertura por invalidez y beneficios fiscales.",
      url: "https://www.osanchezseguros.com/seguros/vida",
    },
    {
      name: "Gastos Médicos Mayores",
      description:
        "Seguro de Gastos Médicos Mayores con acceso a Hospital CIMA, San José y la mejor red hospitalaria de Hermosillo.",
      url: "https://www.osanchezseguros.com/seguros/gastos-medicos",
    },
    {
      name: "Seguros de Auto",
      description:
        "Cobertura amplia, limitada y responsabilidad civil con asistencia vial 24/7. Qualitas, AXA, CHUBB.",
      url: "https://www.osanchezseguros.com/seguros/auto",
    },
    {
      name: "Seguros de Vida con Ahorro",
      description:
        "Planes de ahorro para retiro y educación con rendimientos garantizados y seguro de vida integrado.",
      url: "https://www.osanchezseguros.com/seguros/vida-con-ahorro",
    },
    {
      name: "Seguros Empresariales",
      description:
        "Protección integral para negocios: seguros de grupo, responsabilidad civil empresarial, activos y fianzas.",
      url: "https://www.osanchezseguros.com/seguros/empresarial",
    },
    {
      name: "Seguros Fronterizos y USA",
      description:
        "Cobertura vehicular y médica para cruzar la frontera a Estados Unidos. Arizona, California y Texas.",
      url: "https://www.osanchezseguros.com/seguros/fronterizos",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de Seguros",
    description: "Todos los tipos de seguros que ofrecemos en O Sanchez Seguros",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
          "@id": "https://www.osanchezseguros.com/#organization",
        },
        areaServed: {
          "@type": "State",
          name: "Sonora",
        },
      },
    })),
  };
}

/** Schema BreadcrumbList */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Schema FAQPage */
export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ============================================================
// Componentes React
// ============================================================

/** Inyecta un bloque JSON-LD en el <head> */
function JsonLdBlock({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Componente principal de JSON-LD para el layout global.
 * Incluye: Organization + WebSite + Services
 */
export default function JsonLd() {
  return (
    <>
      <JsonLdBlock data={getOrganizationSchema()} />
      <JsonLdBlock data={getWebSiteSchema()} />
      <JsonLdBlock data={getServicesSchema()} />
    </>
  );
}

/**
 * JSON-LD para una página individual con breadcrumbs.
 */
export function PageJsonLd({
  breadcrumbs,
  faq,
}: {
  breadcrumbs?: { name: string; url: string }[];
  faq?: { question: string; answer: string }[];
}) {
  return (
    <>
      {breadcrumbs && <JsonLdBlock data={getBreadcrumbSchema(breadcrumbs)} />}
      {faq && <JsonLdBlock data={getFaqSchema(faq)} />}
    </>
  );
}
