import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Seguros Fronterizos y USA",
  description:
    "Seguros fronterizos para cruzar a Estados Unidos con tranquilidad. Cobertura médica y vehicular binacional. Cotiza con O Sanchez Seguros en Hermosillo.",
};

const COVERAGES = [
  {
    title: "Seguro Vehicular Fronterizo",
    description:
      "Cobertura completa para tu vehículo al cruzar la frontera. Responsabilidad civil, daños a terceros y asistencia vial en territorio estadounidense.",
    icon: "🚗",
  },
  {
    title: "Gastos Médicos en USA",
    description:
      "Cobertura médica de emergencia en Estados Unidos. Hospitales, consultas y medicamentos cubiertos durante tu estancia.",
    icon: "🏥",
  },
  {
    title: "Seguro de Viajero Internacional",
    description:
      "Protección integral para viajes al extranjero. Cancelación de vuelos, pérdida de equipaje y emergencias médicas.",
    icon: "✈️",
  },
  {
    title: "Responsabilidad Civil USA",
    description:
      "Cumple con los requisitos legales de responsabilidad civil en los estados fronterizos: Arizona, California y Texas.",
    icon: "📋",
  },
  {
    title: "Asistencia en Carretera",
    description:
      "Grúa, auxilio mecánico y asistencia vial disponible 24/7 tanto en México como en Estados Unidos.",
    icon: "🛣️",
  },
  {
    title: "Cobertura Binacional",
    description:
      "Una sola póliza que te protege en ambos países. Sin preocuparte por cambiar de seguro al cruzar la frontera.",
    icon: "🌎",
  },
];

const FAQS = [
  {
    q: "¿Puedo usar mi seguro mexicano en USA?",
    a: "La mayoría de seguros mexicanos no tienen validez en Estados Unidos. Necesitas una póliza específica fronteriza o binacional que cubra ambos países.",
  },
  {
    q: "¿Qué estados cubre el seguro fronterizo?",
    a: "Ofrecemos coberturas para Arizona, California, Texas y Nuevo México. También tenemos opciones para cobertura en todo Estados Unidos.",
  },
  {
    q: "¿Cuánto cuesta un seguro fronterizo?",
    a: "El costo varía según el tipo de cobertura, duración del viaje y valor del vehículo. Desde $500 MXN por día para cobertura básica. Cotiza sin compromiso.",
  },
  {
    q: "¿Se puede comprar el seguro el mismo día del viaje?",
    a: "Sí, podemos emitir tu póliza el mismo día. Sin embargo, recomendamos tramitarla con al menos 24 horas de anticipación para una cobertura óptima.",
  },
];

export default function FronterizosPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0D2B5Edd 0%, #1A4A8A99 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand/30 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-5xl mb-5 block">🌎</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Seguros Fronterizos y USA
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Cruza la frontera con total tranquilidad. Cobertura vehicular y
              médica que te protege en ambos lados de la línea.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Cotizar Seguro Fronterizo
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
                ¿Qué <span className="text-muted">cubrimos</span>?
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Protección completa para quienes cruzan la frontera México-USA
                con frecuencia o esporádicamente.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COVERAGES.map((coverage, index) => (
              <ScrollReveal key={coverage.title} delay={index * 80}>
                <div className="p-6 bg-white rounded-2xl border border-border hover:border-brand/15 transition-all hover-lift h-full">
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

      {/* FAQ */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand mb-4">
                Preguntas <span className="text-muted">Frecuentes</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="font-display text-base font-bold text-brand mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
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
              ¿Viajas a USA pronto?
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
              No esperes a la frontera. Cotiza tu seguro ahora y cruza con la
              tranquilidad de estar protegido.
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
