import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";
import { PageJsonLd } from "@/components/shared/JsonLd";

const BENEFITS = [
  {
    title: "Ayuda Económica (Pago)",
    description: "Recibe un monto desde $35,000 hasta $170,000 pesos según el plan contratado.",
    icon: "💰",
  },
  {
    title: "Atención Hospitalaria",
    description: "Cobertura de parto normal o cesárea en los mejores hospitales de Hermosillo.",
    icon: "🏥",
  },
  {
    title: "Complicaciones del Embarazo",
    description: "Protección financiera ante cualquier eventualidad o complicación gestacional.",
    icon: "🛡️",
  },
  {
    title: "Cobertura al Recién Nacido",
    description: "Tu bebé nace asegurado desde el primer minuto con protección integral.",
    icon: "👶",
  },
];

const FAQS = [
  {
    question: "¿Tienen un seguro para parto y cómo funciona?",
    answer:
      "El seguro con cobertura de maternidad (comúnmente buscado como seguro para parto) te brinda una ayuda económica significativa que puedes usar para los gastos de hospitalización. La regla más importante es el tiempo de espera: debes contratar la póliza y cumplir al menos 10 meses de antigüedad antes del nacimiento del bebé para que se efectúe el pago.",
  },
  {
    question: "¿Existen seguros para embarazadas si ya estoy gestando?",
    answer:
      "Para recibir el beneficio económico de maternidad, es necesario adquirir la póliza antes de quedar embarazada, ya que todas las aseguradoras piden un periodo de espera de 10 meses. Sin embargo, contáctanos para revisar opciones que protejan ante complicaciones mayores.",
  },
  {
    question: "¿Qué monto me entregan por maternidad?",
    answer:
      "Dependiendo del plan y aseguradora que elijas con nosotros (AXA, GNP, etc.), la ayuda de maternidad extendida va desde los $35,000 hasta los $170,000 pesos.",
  },
];

export default function MaternidadPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Inicio", url: "https://www.osanchezseguros.com" },
          { name: "Seguros", url: "https://www.osanchezseguros.com/seguros" },
          { name: "Gastos Médicos Mayores", url: "https://www.osanchezseguros.com/seguros/gastos-medicos" },
          { name: "Maternidad", url: "https://www.osanchezseguros.com/seguros/gastos-medicos/maternidad" },
        ]}
      />
      
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #a21caf 0%, #7e22ce 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-5xl mb-5 block">🍼</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Seguro con Pago de Maternidad
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 font-medium">
              Planifica el nacimiento de tu bebé y recibe una ayuda económica desde <strong className="text-white text-xl border-b-2 border-white/50 pb-0.5">$35,000 hasta $170,000 pesos</strong>.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-full hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Cotizar Plan de Maternidad
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Regla de Oro Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 md:p-12 shadow-sm">
              <span className="text-4xl mb-4 block">⏳</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-amber-900 mb-4">
                La Regla de Oro: 10 Meses de Espera
              </h2>
              <p className="text-amber-800/80 text-lg leading-relaxed">
                Para garantizar que la aseguradora cubra tu parto o cesárea y entregue la ayuda de maternidad, 
                <strong> el bebé debe nacer cuando la póliza tenga al menos 10 meses de antigüedad.</strong><br/><br/>
                Es decir: debes adquirir la póliza, esperar un par de meses para "encargar", y así asegurar que el bebé nazca con cobertura total.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand mb-4">
                ¿Qué <span className="text-muted">incluye</span>?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 80}>
                <div className="p-8 bg-surface rounded-2xl border border-border hover:border-purple-200 transition-all hover-lift h-full flex flex-col items-center text-center">
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <h3 className="font-display text-xl font-bold text-brand mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SEO Section */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-brand mb-10 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              {FAQS.map((faq, index) => (
                <div key={index} className="bg-surface p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg text-brand mb-2">{faq.question}</h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
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
              Planifica tu futuro con tranquilidad
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
              No esperes hasta que sea tarde. Asegura tu maternidad hoy mismo.
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
