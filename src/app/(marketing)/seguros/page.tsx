import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { INSURANCE_PRODUCTS } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Seguros",
  description:
    "Descubre nuestra gama completa de seguros: Gastos Médicos Mayores, Seguros Fronterizos/USA, Vida, Auto y Empresariales en Hermosillo, Sonora.",
};

export default function SegurosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest rounded-full border border-white/15 mb-6">
              Catálogo de Seguros
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              La protección que{" "}
                            <span className="text-accent">mereces</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Soluciones de seguros personalizadas para cada etapa de tu vida
              y negocio. Conoce nuestros productos.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INSURANCE_PRODUCTS.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 100}>
                <Link
                  href={product.href}
                  className="group block bg-surface rounded-2xl border border-border overflow-hidden hover:border-brand/15 transition-all duration-300 hover-lift"
                >
                  {/* Colored Header */}
                  <div
                    className="p-8 text-white relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}dd 0%, ${product.color}99 100%)`,
                    }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <span className="text-4xl mb-4 block">{product.icon}</span>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      {product.title}
                    </h2>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-4">
                      Coberturas Principales
                    </h3>
                    <ul className="space-y-3">
                      {product.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-3 text-sm text-brand"
                        >
                          <svg
                            className="w-5 h-5 text-brand flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-border">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:text-accent-dark transition-colors">
                        Solicitar cotización
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
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
