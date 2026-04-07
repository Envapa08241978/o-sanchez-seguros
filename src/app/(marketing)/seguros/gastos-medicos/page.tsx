import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Gastos Médicos Mayores",
  description:
    "Seguro de Gastos Médicos Mayores en Hermosillo, Sonora. Acceso a Hospital CIMA, San José y la mejor red hospitalaria. Cotiza con O Sanchez Seguros.",
};

const HOSPITALS = [
  {
    name: "Hospital CIMA Hermosillo",
    tier: "Premium",
    specialties: ["Urgencias 24/7", "Cirugía", "Oncología", "Cardiología"],
  },
  {
    name: "Hospital San José Hermosillo",
    tier: "Premium",
    specialties: ["Urgencias 24/7", "Traumatología", "Pediatría", "Ginecología"],
  },
  {
    name: "Star Médica Hermosillo",
    tier: "Estándar",
    specialties: ["Urgencias", "Medicina Interna", "Imagenología"],
  },
];

const COVERAGES = [
  {
    title: "Hospitalización",
    description: "Cobertura completa de internamiento en los mejores hospitales.",
    icon: "🏥",
  },
  {
    title: "Cirugía",
    description: "Procedimientos quirúrgicos cubiertos con las mejores aseguradoras.",
    icon: "⚕️",
  },
  {
    title: "Maternidad",
    description: "Cobertura de parto y cesárea en hospitales de primer nivel.",
    icon: "👶",
  },
  {
    title: "Enfermedades Graves",
    description: "Protección ante cáncer, infartos y padecimientos mayores.",
    icon: "🛡️",
  },
  {
    title: "Cobertura Internacional",
    description: "Atención médica en USA y el extranjero si la necesitas.",
    icon: "🌎",
  },
  {
    title: "Medicamentos",
    description: "Reembolso de medicamentos bajo prescripción médica.",
    icon: "💊",
  },
];

export default function GastosMedicosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #1e40afdd 0%, #1d4ed899 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-5xl mb-5 block">🏥</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Gastos Médicos Mayores
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Protección médica de primer nivel con acceso a la mejor red
              hospitalaria de Hermosillo. Tu salud y la de tu familia, siempre
              protegidas.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Cotizar Gastos Médicos
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand mb-4">
                ¿Qué <span className="text-muted">cubre</span>?
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Un seguro de Gastos Médicos Mayores te protege ante los gastos
                médicos más importantes que podrías enfrentar.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COVERAGES.map((coverage, index) => (
              <ScrollReveal key={coverage.title} delay={index * 80}>
                <div className="p-6 bg-surface rounded-2xl border border-border hover:border-blue-200 transition-all hover-lift h-full">
                  <span className="text-3xl mb-4 block">{coverage.icon}</span>
                  <h3 className="font-display text-lg font-bold text-brand mb-2">
                    {coverage.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {coverage.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Network */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand mb-4">
                Red Hospitalaria en{" "}
                                <span className="text-muted">Hermosillo</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Accede a los mejores hospitales de Hermosillo con tu seguro de
                Gastos Médicos Mayores.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSPITALS.map((hospital, index) => (
              <ScrollReveal key={hospital.name} delay={index * 100}>
                <div className="bg-surface rounded-2xl border border-border p-7 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        hospital.tier === "Premium"
                          ? "bg-brand/5 text-brand-light"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {hospital.tier}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand mb-4">
                    {hospital.name}
                  </h3>
                  <ul className="space-y-2">
                    {hospital.specialties.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <svg
                          className="w-4 h-4 text-brand flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center mt-10">
              <Link
                href="/red-hospitalaria"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
              >
                Ver mapa completo de la red hospitalaria
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Tu salud no puede esperar
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
              Protege a tu familia con la mejor cobertura médica de Hermosillo.
              Cotiza hoy y conoce tus opciones.
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all"
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
