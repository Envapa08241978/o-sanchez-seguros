import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { PageJsonLd } from "@/components/shared/JsonLd";

// Placeholder for future blog posts
const POSTS = [
  {
    title: "¿Cuánto cuesta un Seguro de Gastos Médicos Mayores en Hermosillo en 2026?",
    excerpt: "Descubre los factores que determinan el costo de tu póliza y cómo elegir la mejor opción para tu presupuesto y necesidades médicas.",
    date: "Proximamente",
    category: "Gastos Médicos",
    href: "#", // To be implemented
  },
  {
    title: "Diferencias clave entre Seguro de Vida con Ahorro y AFORE",
    excerpt: "Analizamos los pros y contras de cada instrumento financiero para que tomes la mejor decisión sobre tu fondo de retiro.",
    date: "Proximamente",
    category: "Ahorro y Vida",
    href: "#",
  },
  {
    title: "Guía para cruzar a Arizona: Qué seguro de auto fronterizo necesitas",
    excerpt: "Todo lo que debes saber antes de cruzar la frontera en auto. Evita multas y viaja tranquilo con la cobertura adecuada.",
    date: "Proximamente",
    category: "Fronterizos",
    href: "#",
  }
];

export default function BlogPage() {
  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Inicio", url: "https://www.osanchezseguros.com" },
          { name: "Blog", url: "https://www.osanchezseguros.com/blog" },
        ]}
      />
      <section className="relative py-20 md:py-28 overflow-hidden bg-surface-elevated">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand mb-4">
              Blog de <span className="text-accent">Seguros</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Educación financiera, consejos útiles y todo lo que necesitas saber para tomar las mejores decisiones sobre tu protección y patrimonio.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((post, index) => (
              <ScrollReveal key={post.title} delay={index * 100}>
                <Link href={post.href} className="group block h-full">
                  <div className="bg-white rounded-2xl border border-border overflow-hidden h-full flex flex-col transition-all group-hover:border-brand/30 group-hover:shadow-lg group-hover:-translate-y-1">
                    <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                      <span className="text-4xl opacity-50">📰</span>
                      <div className="absolute inset-0 bg-brand/5 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted/70 font-medium">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-brand mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="mt-6 flex items-center text-accent text-sm font-bold">
                        Leer artículo
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
