import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";
import { PageJsonLd } from "@/components/shared/JsonLd";

const TESTIMONIALS = [
  {
    name: "Ana Gabriela Ruiz",
    role: "Madre de familia",
    content:
      "Tuvimos una emergencia médica de madrugada y Oscar contestó a la primera llamada. Su gestión con el Hospital CIMA fue inmediata y no tuvimos que pagar nada de nuestro bolsillo. Excelente servicio, 100% recomendado.",
    rating: 5,
    date: "Hace 2 meses",
  },
  {
    name: "Carlos Mendoza",
    role: "Empresario local",
    content:
      "Aseguré mi flotilla de repartidores con O Sanchez Seguros. La verdad es que me ahorraron muchos dolores de cabeza. Oscar me explicó cada cobertura con peras y manzanas.",
    rating: 5,
    date: "Hace 4 meses",
  },
  {
    name: "Sofía Villarreal",
    role: "Cliente desde 2018",
    content:
      "Lo que más destaco es la paciencia para explicar. Yo no entendía nada de deducibles ni coaseguros, pero con la asesoría que recibí me quedó clarísimo qué estaba comprando. Ahora toda mi familia está asegurada aquí.",
    rating: 5,
    date: "Hace 5 meses",
  },
  {
    name: "Héctor Valdés",
    role: "Cliente de Auto",
    content:
      "Tuve un choque leve y el ajustador de Qualitas llegó rapidísimo gracias a que la póliza estaba bien armada. Definitivamente el trato personalizado hace la diferencia.",
    rating: 5,
    date: "Hace 6 meses",
  },
  {
    name: "Patricia L.",
    role: "Emprendedora",
    content:
      "Abrí mi plan de retiro con ellos. Me mostraron proyecciones reales y ajustaron el presupuesto a mis posibilidades actuales. Me da mucha paz saber que mi futuro financiero está asegurado.",
    rating: 5,
    date: "Hace 8 meses",
  },
];

// Schema de Review
function getReviewsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.osanchezseguros.com/#organization",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "42",
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
        bestRating: "5",
      },
      reviewBody: t.content,
    })),
  };
}

export default function TestimoniosPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Inicio", url: "https://www.osanchezseguros.com" },
          { name: "Testimonios", url: "https://www.osanchezseguros.com/testimonios" },
        ]}
      />
      {/* Script inyectado para el Schema de Reseñas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getReviewsSchema()) }}
      />

      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFFAF3 0%, #F3F4F6 100%)",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand mb-4">
              Lo que dicen nuestros clientes
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-brand">5.0 Estrellas en Google</span>
            </div>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              La confianza de las familias sonorenses es nuestro mayor respaldo. 
              Descubre por qué llevamos más de 16 años siendo tu mejor opción.
            </p>
            <a
              href="https://www.google.com/maps/place/OSanchez+Seguros+-+Oficina+Oscar+Sanchez/@29.0862245,-110.9775244,950m/data=!3m2!1e3!4b1!4m6!3m5!1s0x86ce857f14777283:0x9925c26431d0ec84!8m2!3d29.0862198!4d-110.9749495"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-light transition-all shadow-lg"
            >
              Ver reseñas en Google Maps
            </a>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delay={index * 100}>
                <div className="p-7 bg-surface rounded-2xl border border-border h-full flex flex-col hover:border-accent/30 transition-colors hover-lift">
                  <div className="flex items-center gap-2 mb-4 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted text-sm italic mb-6 flex-grow leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-border pt-4 mt-auto">
                    <p className="font-bold text-brand">{testimonial.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-muted">{testimonial.role}</p>
                      <p className="text-xs text-muted/70">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-elevated text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-extrabold text-brand mb-6">
              ¿Quieres dejar tu propia reseña?
            </h2>
            <p className="text-muted mb-8">
              Nos ayuda muchísimo saber cómo ha sido tu experiencia con nosotros. 
              Tus comentarios nos permiten seguir mejorando el servicio.
            </p>
            <a
              href="https://www.google.com/maps/place/OSanchez+Seguros+-+Oficina+Oscar+Sanchez/@29.0862245,-110.9775244,950m/data=!3m2!1e3!4b1!4m6!3m5!1s0x86ce857f14777283:0x9925c26431d0ec84!8m2!3d29.0862198!4d-110.9749495"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all"
            >
              Escribir una reseña
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
