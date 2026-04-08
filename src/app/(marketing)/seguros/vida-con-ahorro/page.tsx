import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Seguros de Vida con Ahorro",
  description:
    "Construye tu futuro financiero mientras proteges a los que más amas. Planes garantizados para el retiro o la educación con O Sanchez Seguros.",
};

const COVERAGES = [
  {
    title: "Retiro Garantizado",
    description: "Asegura un ingreso vitalicio para mantener tu estilo de vida cuando más lo necesites.",
    icon: "🌅",
  },
  {
    title: "Fondo Educativo",
    description: "Garantiza la educación universitaria de tus hijos sin importar lo que pase.",
    icon: "🎓",
  },
  {
    title: "Crecimiento Financiero",
    description: "Tu dinero crece con el tiempo, protegiéndose contra la inflación.",
    icon: "📈",
  },
  {
    title: "Protección de Vida",
    description: "Suma asegurada que protege económicamente a tu familia desde el día uno.",
    icon: "❤️",
  },
  {
    title: "Beneficios Fiscales",
    description: "Aprovecha la deducibilidad de impuestos en planes enfocados al retiro.",
    icon: "💰",
  },
  {
    title: "Aportes Flexibles",
    description: "Posibilidad de hacer aportaciones adicionales para mejorar tu ahorro.",
    icon: "🎯",
  },
];

export default function VidaAhorroPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #1e3a8add 0%, #17255499 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-5xl mb-5 block">📈</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Seguros de Vida con Ahorro
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Construye tu futuro mientras te proteges. Planes garantizados para el retiro, patrimonio sostenido o la educación de tus hijos.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 font-bold rounded-full hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Cotizar Plan de Ahorro
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
                Protección y <span className="text-muted">Crecimiento</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Los Seguros de Vida con Ahorro te permiten blindar económicamente a tu familia, a la vez que generas un fondo para cumplir metas a futuro.
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

      {/* Two Columns Info Block */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-extrabold text-brand">
                  Tu mejor inversión a largo plazo
                </h2>
                <p className="text-muted text-lg leading-relaxed">
                  A diferencia de un instrumento de ahorro tradicional, el seguro de vida con ahorro es un fideicomiso legal inembargable que asegura el patrimonio de tu familia mientras tu dinero trabaja para ti.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Garantía de cumplimiento sin importar eventualidades",
                    "Asegura la etapa universitaria desde los primeros meses",
                    "Instrumentos financieros estables a prueba de crisis",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-brand-light font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-brand rounded-3xl p-8 sm:p-12 text-white">
                <div className="mb-6 inline-flex p-3 bg-white/10 rounded-2xl">
                  <span className="text-4xl">🏛️</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">Múltiples Opciones Flexibles</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Contamos con diferentes divisas y sistemas de rendimiento con aliados importantes como aseguradoras líderes que garantizan los planes bajo la CNSF.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block text-accent-light font-semibold hover:text-white transition-colors"
                >
                  Asesórate con expertos →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-6">
              El tiempo es el mejor aliado de tu ahorro
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
              No esperes más para planificar tu retiro o asegurar el futuro académico de tus hijos. Inicia hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg"
              >
                Solicitar Cotización
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
