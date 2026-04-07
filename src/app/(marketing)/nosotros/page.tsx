import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce a Oscar Sánchez Aguirre — Especialista en seguros desde 1997 en Hermosillo, Sonora. Más de ${SITE_CONFIG.yearsOfExperience} años protegiendo familias y empresas.`,
};

const TIMELINE = [
  { year: "1997", title: "Inicio de trayectoria", description: "Oscar Sánchez Aguirre comienza su carrera como agente de seguros en Hermosillo, Sonora." },
  { year: "2005", title: "Consolidación regional", description: "Se establece como referente en Gastos Médicos Mayores y seguros fronterizos en la región." },
  { year: "2015", title: "Alianzas premium", description: "Convenios consolidados con Hospital CIMA, San José y las principales aseguradoras del país." },
  { year: "2024", title: "Transformación digital", description: "Lanzamiento de la plataforma digital con atención 24/7 y asesoría potenciada por inteligencia artificial." },
];

const VALUES = [
  { icon: "🤝", title: "Confianza", description: "Tu tranquilidad es nuestra prioridad. Cada recomendación está respaldada por décadas de experiencia." },
  { icon: "🎯", title: "Personalización", description: "No hay dos familias iguales. Diseñamos soluciones a la medida de tus necesidades reales." },
  { icon: "⚡", title: "Agilidad", description: "Ante un siniestro, cada minuto cuenta. Actuamos rápido para que tú estés tranquilo." },
  { icon: "🔒", title: "Transparencia", description: "Sin letras chiquitas. Te explicamos cada detalle de tu póliza de forma clara y honesta." },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest rounded-full border border-white/15 mb-6">
              Nuestra Historia
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Más de {SITE_CONFIG.yearsOfExperience} años{" "}
              <span className="text-accent">protegiendo</span> lo que
              importa
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Desde 1997, Oscar Sánchez Aguirre ha dedicado su carrera a brindar
              la mejor asesoría en seguros a familias y empresas de Hermosillo,
              Sonora.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Oscar */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-surface-elevated border border-border overflow-hidden flex items-center justify-center">
                  <div className="text-center p-10">
                    <span className="text-8xl mb-4 block">👨‍💼</span>
                    <p className="text-lg font-display font-bold text-brand">
                      Oscar Sánchez Aguirre
                    </p>
                    <p className="text-sm text-muted mt-1">
                      Especialista en Seguros
                    </p>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-brand text-white px-6 py-3 rounded-2xl shadow-lg">
                  <p className="text-2xl font-bold font-display">
                    +{SITE_CONFIG.yearsOfExperience}
                  </p>
                  <p className="text-xs font-medium text-white/80">
                    Años de experiencia
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <h2 className="font-display text-3xl font-extrabold text-brand mb-6">
                  Un aliado que entiende tus{" "}
                  <span className="text-muted">necesidades</span>
                </h2>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    Con más de {SITE_CONFIG.yearsOfExperience} años en el
                    mercado asegurador de Sonora, Oscar Sánchez Aguirre se ha
                    convertido en un referente de confianza para familias y
                    empresas en Hermosillo.
                  </p>
                  <p>
                    Especializado en{" "}
                    <strong className="text-brand">
                      Gastos Médicos Mayores
                    </strong>{" "}
                    y{" "}
                    <strong className="text-brand">Seguros Fronterizos</strong>,
                    conoce a profundidad la red hospitalaria local — Hospital
                    CIMA, San José — y las necesidades únicas de la región
                    fronteriza.
                  </p>
                  <p>
                    Su enfoque personalizado y compromiso con la transparencia
                    han construido relaciones duraderas con clientes que confían
                    en su criterio experto.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand">
                Nuestros <span className="text-muted">Valores</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 100}>
                <div className="bg-surface rounded-2xl border border-border p-7 text-center h-full hover-lift">
                  <span className="text-4xl mb-4 block">{value.icon}</span>
                  <h3 className="font-display text-lg font-bold text-brand mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand">
                Nuestra <span className="text-muted">Trayectoria</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-12">
              {TIMELINE.map((item, index) => (
                <ScrollReveal key={item.year} delay={index * 150}>
                  <div
                    className={`relative flex items-start gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-brand rounded-full border-4 border-background -translate-x-1.5 mt-2 z-10" />

                    {/* Content */}
                    <div
                      className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                        index % 2 === 0 ? "" : "md:text-right"
                      }`}
                    >
                      <span className="text-sm font-bold text-brand">
                        {item.year}
                      </span>
                      <h3 className="font-display text-lg font-bold text-brand mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
