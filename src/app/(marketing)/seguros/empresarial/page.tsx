import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Seguros Empresariales",
  description:
    "Seguros empresariales para proteger tu negocio, empleados y patrimonio. Grupo, RC, daños y más. Cotiza con O Sanchez Seguros en Hermosillo.",
};

const PRODUCTS = [
  {
    title: "Seguro de Grupo (GMM)",
    description:
      "Ofrece a tus empleados la mejor cobertura médica como beneficio laboral. Retén talento y cumple con tus obligaciones patronales.",
    icon: "👥",
    highlights: [
      "Gastos médicos para empleados",
      "Deducible de impuestos",
      "Planes desde 5 personas",
      "Red hospitalaria premium",
    ],
  },
  {
    title: "Responsabilidad Civil Empresarial",
    description:
      "Protege tu empresa ante reclamaciones de terceros por daños causados por tus productos, servicios u operaciones.",
    icon: "⚖️",
    highlights: [
      "RC general y profesional",
      "Defensa legal incluida",
      "Contaminación accidental",
      "Productos y operaciones",
    ],
  },
  {
    title: "Seguro de Daños Empresariales",
    description:
      "Protege tus instalaciones, maquinaria, inventario y equipo contra incendio, robo, fenómenos naturales y más.",
    icon: "🏢",
    highlights: [
      "Incendio y explosión",
      "Robo y asalto",
      "Fenómenos naturales",
      "Equipo electrónico",
    ],
  },
  {
    title: "Hombre Clave",
    description:
      "Protege la continuidad de tu empresa ante la ausencia de personas clave. Cobertura por fallecimiento o incapacidad del líder.",
    icon: "👔",
    highlights: [
      "Continuidad operativa",
      "Protección de socios",
      "Cobertura de créditos",
      "Beneficios fiscales",
    ],
  },
  {
    title: "Flotilla Vehicular",
    description:
      "Cobertura integral para la flotilla de vehículos de tu empresa. Tarifas preferenciales por volumen y administración centralizada.",
    icon: "🚛",
    highlights: [
      "Tarifas por volumen",
      "Administración central",
      "Asistencia vial 24/7",
      "Cobertura nacional",
    ],
  },
  {
    title: "Seguro de Transporte de Mercancías",
    description:
      "Protege la mercancía de tu empresa durante el traslado nacional e internacional. Cobertura puerta a puerta.",
    icon: "📦",
    highlights: [
      "Cobertura nacional e internacional",
      "Todo riesgo",
      "Puerta a puerta",
      "Robo en tránsito",
    ],
  },
];

export default function EmpresarialPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D2B5E 0%, #1A4A8Acc 100%)",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-5xl mb-5 block">🏢</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Seguros Empresariales
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Protege tu negocio, empleados y patrimonio empresarial con
              soluciones integrales diseñadas para cada industria.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Cotizar para mi Empresa
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand mb-4">
                Soluciones para tu <span className="text-muted">Empresa</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Cada negocio tiene riesgos únicos. Diseñamos un programa de
                seguros a la medida de tu operación.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, index) => (
              <ScrollReveal key={product.title} delay={index * 80}>
                <div className="p-7 bg-white rounded-2xl border border-border hover:border-brand/15 transition-all hover-lift h-full flex flex-col">
                  <span className="text-3xl mb-4 block">{product.icon}</span>
                  <h3 className="font-display text-lg font-bold text-brand mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-5 flex-grow">
                    {product.description}
                  </p>
                  <ul className="space-y-2">
                    {product.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-sm text-brand/80"
                      >
                        <svg
                          className="w-4 h-4 text-accent/60 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand">
                Industrias que <span className="text-muted">atendemos</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Construcción",
                "Manufactura",
                "Comercio",
                "Restaurantes",
                "Transporte",
                "Agricultura",
                "Minería",
                "Tecnología",
                "Salud",
                "Educación",
                "Maquiladoras",
                "Exportación",
              ].map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-2 bg-white text-brand text-sm font-medium rounded-full border border-border hover:border-brand/20 transition-colors"
                >
                  {industry}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Blindemos tu empresa juntos
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Agenda una asesoría empresarial sin costo. Analizamos los riesgos de
              tu negocio y diseñamos la protección ideal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg"
              >
                Agendar Asesoría Empresarial
              </Link>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                WhatsApp Directo
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
