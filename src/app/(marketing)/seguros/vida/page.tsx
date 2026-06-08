import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";
import { PageJsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Seguro de Vida en Hermosillo — Protege a tu Familia",
  description:
    "Seguros de vida en Hermosillo, Sonora. Planes temporales, vida entera e inversión. Protección familiar con ahorro y beneficios fiscales. Cotiza con O Sanchez Seguros.",
  keywords: [
    "seguro de vida hermosillo",
    "seguro vida sonora",
    "cotizar seguro de vida hermosillo",
    "seguro de vida familiar hermosillo",
    "seguro vida con ahorro hermosillo",
    "seguro fallecimiento hermosillo",
    "seguro vida inversión sonora",
    "seguro educacional hermosillo",
    "protección familiar seguros hermosillo",
  ],
  alternates: {
    canonical: "https://www.osanchezseguros.com/seguros/vida",
  },
  openGraph: {
    title: "Seguro de Vida en Hermosillo | Protección Familiar | O Sanchez Seguros",
    description:
      "Planes de vida temporal, entera e inversión. Protege el futuro de tu familia con beneficios fiscales.",
    url: "https://www.osanchezseguros.com/seguros/vida",
  },
};

const PLANS = [
  {
    title: "Vida Temporal",
    description:
      "Protección por un período definido (10, 20 o 30 años). Ideal para cubrir hipotecas, educación de los hijos o deudas importantes.",
    icon: "⏱️",
    highlights: [
      "Primas accesibles",
      "Cobertura por fallecimiento",
      "Períodos flexibles",
    ],
  },
  {
    title: "Vida Entera",
    description:
      "Protección de por vida con componente de ahorro. Tu seguro acumula valor en efectivo que puedes usar en vida.",
    icon: "🛡️",
    highlights: [
      "Cobertura vitalicia",
      "Ahorro garantizado",
      "Valor en efectivo",
    ],
  },
  {
    title: "Vida con Inversión",
    description:
      "Combina protección con rendimientos de inversión. Tu dinero trabaja mientras tu familia está protegida.",
    icon: "📈",
    highlights: [
      "Rendimientos de inversión",
      "Protección + ahorro",
      "Planes flexibles",
    ],
  },
  {
    title: "Seguro Educacional",
    description:
      "Garantiza la educación de tus hijos sin importar qué pase. Fondos disponibles para universidad y estudios superiores.",
    icon: "🎓",
    highlights: [
      "Fondo educativo",
      "Protección familiar",
      "Rendimientos garantizados",
    ],
  },
];

const BENEFITS = [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Protección Familiar",
    description: "Tu familia mantendrá su calidad de vida ante cualquier eventualidad.",
  },
  {
    icon: "💰",
    title: "Ahorro + Inversión",
    description: "Planes que combinan protección con rendimientos financieros atractivos.",
  },
  {
    icon: "🏦",
    title: "Beneficios Fiscales",
    description: "Deduce tu seguro de vida de impuestos según la ley del ISR en México.",
  },
  {
    icon: "📋",
    title: "Sin Complicaciones",
    description: "Proceso de contratación simple. Te guiamos paso a paso.",
  },
];

const FAQS = [
  {
    question: "¿A qué edad es recomendable contratar un seguro de vida?",
    answer: "Lo ideal es contratarlo joven y con buena salud, ya que las tarifas son mucho más accesibles y garantizas tu asegurabilidad futura.",
  },
  {
    question: "¿Qué es un seguro de vida con inversión?",
    answer: "Es un instrumento financiero que combina la protección por fallecimiento con un fondo de inversión, permitiendo que tu dinero genere rendimientos a lo largo del tiempo.",
  },
  {
    question: "¿Los seguros de vida son deducibles de impuestos?",
    answer: "Sí, en México existen planes diseñados específicamente para el retiro (como los PPR) que te permiten deducir aportaciones anuales de acuerdo con la Ley del ISR.",
  },
  {
    question: "¿La nueva aseguradora pública de pensiones reemplaza al seguro de vida privado?",
    answer: "No. La propuesta de aseguradora pública (junio 2026) aplica exclusivamente a rentas vitalicias de pensionados del ISSSTE. Tu seguro de vida privado sigue siendo indispensable como protección complementaria. Lee nuestro análisis completo en el blog.",
  },
];

export default function VidaPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Inicio", url: "https://www.osanchezseguros.com" },
          { name: "Seguros", url: "https://www.osanchezseguros.com/seguros" },
          { name: "Seguros de Vida", url: "https://www.osanchezseguros.com/seguros/vida" },
        ]}
        faq={FAQS}
      />
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D2B5Edd 0%, #1e3a6bcc 100%)",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-5xl mb-5 block">❤️</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Seguros de Vida
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Garantiza el bienestar financiero de tu familia. Planes flexibles
              con ahorro, inversión y protección de por vida.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Cotizar Seguro de Vida
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand mb-4">
                Tipos de <span className="text-muted">Planes</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Cada familia tiene necesidades diferentes. Encuentra el plan que
                mejor se adapte a tu situación.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLANS.map((plan, index) => (
              <ScrollReveal key={plan.title} delay={index * 100}>
                <div className="p-7 bg-white rounded-2xl border border-border hover:border-brand/15 transition-all hover-lift h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-3xl">{plan.icon}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-brand">
                        {plan.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {plan.description}
                  </p>
                  <ul className="space-y-2">
                    {plan.highlights.map((h) => (
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

      {/* Benefits */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand">
                ¿Por qué un <span className="text-muted">Seguro de Vida</span>?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 100}>
                <div className="text-center p-6 bg-white rounded-2xl border border-border/50 h-full">
                  <span className="text-3xl mb-4 block">{benefit.icon}</span>
                  <h3 className="font-display text-base font-bold text-brand mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {benefit.description}
                  </p>
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
              Protege el futuro de tu familia hoy
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              Una decisión hoy puede hacer toda la diferencia mañana. Cotiza sin
              compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg"
              >
                Solicitar Asesoría
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
