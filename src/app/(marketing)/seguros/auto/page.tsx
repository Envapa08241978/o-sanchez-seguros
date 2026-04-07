import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Seguros de Auto",
  description:
    "Seguros de auto con cobertura amplia, limitada y responsabilidad civil. Asistencia vial 24/7 en Hermosillo. AXA, CHUBB, Qualitas. Cotiza con O Sanchez Seguros.",
};

const COVERAGES = [
  {
    title: "Cobertura Amplia",
    description:
      "Protección total contra robo, daños materiales, responsabilidad civil y gastos médicos. La opción más completa para tu tranquilidad.",
    icon: "🛡️",
    highlights: [
      "Daños materiales",
      "Robo total y parcial",
      "Responsabilidad civil",
      "Gastos médicos ocupantes",
    ],
    recommended: true,
  },
  {
    title: "Cobertura Limitada",
    description:
      "Protección esencial contra robo total y responsabilidad civil. Ideal para vehículos con algunos años de antigüedad.",
    icon: "🔒",
    highlights: [
      "Robo total",
      "Responsabilidad civil",
      "Gastos médicos",
      "Asistencia vial",
    ],
    recommended: false,
  },
  {
    title: "Responsabilidad Civil",
    description:
      "Cobertura mínima obligatoria. Cubre daños que causes a terceros en un accidente vehicular.",
    icon: "📋",
    highlights: [
      "Daños a terceros",
      "Gastos médicos terceros",
      "Defensa legal",
      "Asistencia vial básica",
    ],
    recommended: false,
  },
];

const INSURERS = [
  { name: "Qualitas", description: "Líder en seguros de auto en México" },
  { name: "AXA", description: "Cobertura premium con red de talleres amplia" },
  { name: "CHUBB", description: "Protección integral y servicio de excelencia" },
  { name: "GNP", description: "Planes flexibles y asistencia vial 24/7" },
  { name: "Mapfre", description: "Experiencia global, servicio local" },
  { name: "Zurich", description: "Soluciones personalizadas para tu vehículo" },
];

export default function AutoPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D2B5Edd 0%, #1A4A8Acc 100%)",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-5xl mb-5 block">🚗</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Seguros de Auto
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              La mejor protección para tu vehículo con coberturas amplias y
              asistencia vial 24/7. Qualitas, AXA, CHUBB y más.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Cotizar Seguro de Auto
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand mb-4">
                Elige tu <span className="text-muted">Cobertura</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Tenemos el plan perfecto para ti, desde la protección básica
                hasta la cobertura más completa del mercado.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COVERAGES.map((coverage, index) => (
              <ScrollReveal key={coverage.title} delay={index * 100}>
                <div
                  className={`relative p-7 rounded-2xl border h-full transition-all hover-lift ${
                    coverage.recommended
                      ? "bg-brand text-white border-brand shadow-xl"
                      : "bg-white border-border hover:border-brand/15"
                  }`}
                >
                  {coverage.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-md">
                      Recomendado
                    </span>
                  )}
                  <span className="text-3xl mb-4 block">{coverage.icon}</span>
                  <h3
                    className={`font-display text-xl font-bold mb-3 ${
                      coverage.recommended ? "text-white" : "text-brand"
                    }`}
                  >
                    {coverage.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-5 ${
                      coverage.recommended ? "text-white/80" : "text-muted"
                    }`}
                  >
                    {coverage.description}
                  </p>
                  <ul className="space-y-2">
                    {coverage.highlights.map((h) => (
                      <li
                        key={h}
                        className={`flex items-center gap-2 text-sm ${
                          coverage.recommended
                            ? "text-white/90"
                            : "text-brand/80"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 flex-shrink-0 ${
                            coverage.recommended
                              ? "text-accent-light"
                              : "text-accent/60"
                          }`}
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
                  <Link
                    href="/contacto"
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-bold transition-colors ${
                      coverage.recommended
                        ? "text-accent-light hover:text-white"
                        : "text-accent hover:text-accent-dark"
                    }`}
                  >
                    Cotizar este plan →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insurers */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand">
                Aseguradoras <span className="text-muted">Disponibles</span>
              </h2>
              <p className="text-muted mt-4 max-w-2xl mx-auto">
                Comparamos entre las mejores aseguradoras de auto en México para
                encontrarte la mejor tarifa.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INSURERS.map((insurer, index) => (
              <ScrollReveal key={insurer.name} delay={index * 80}>
                <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-border/50">
                  <div className="flex items-center justify-center w-12 h-12 bg-brand/5 rounded-xl text-brand font-bold text-sm">
                    {insurer.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-brand">
                      {insurer.name}
                    </h3>
                    <p className="text-xs text-muted">{insurer.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Protege tu vehículo hoy
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Comparamos por ti entre las mejores aseguradoras para darte la
              mejor cobertura al mejor precio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg"
              >
                Cotizar Ahora
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
