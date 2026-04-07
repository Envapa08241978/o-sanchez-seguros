import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Cédula del Agente",
  description:
    "Consulta la cédula de agente de seguros autorizado por la Comisión Nacional de Seguros y Fianzas (CNSF).",
};

export default function CedulaAgentePage() {
  return (
    <>
      <section className="relative py-20 md:py-24 gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Cédula del Agente
            </h1>
            <p className="text-white/60 text-sm">
              Comisión Nacional de Seguros y Fianzas (CNSF)
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-surface rounded-2xl border border-border p-8 md:p-10 shadow-sm">
              {/* Agent Card */}
              <div className="text-center mb-8 pb-8 border-b border-border">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-brand/5 text-brand rounded-2xl mb-5">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="font-display text-xl font-bold text-brand mb-1">
                  {SITE_CONFIG.fullName}
                </h2>
                <p className="text-sm text-muted">
                  Agente de Seguros Persona Física
                </p>
              </div>

              {/* Agent Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-sm text-muted">Número de Cédula</span>
                  <span className="text-sm font-semibold text-brand bg-brand/5 px-3 py-1 rounded-lg">
                    Pendiente de actualización
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-sm text-muted">Estatus</span>
                  <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                    En proceso
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-sm text-muted">Domicilio Fiscal</span>
                  <span className="text-sm font-medium text-brand">
                    {SITE_CONFIG.address}
                  </span>
                </div>
              </div>

              {/* Verification link */}
              <div className="mt-8 p-5 bg-surface-elevated rounded-xl">
                <p className="text-xs text-muted leading-relaxed mb-3">
                  Puedes verificar la autenticidad de cualquier agente de seguros
                  en el portal oficial de la CNSF:
                </p>
                <a
                  href="https://www.cnsf.gob.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Buscar Agente en CNSF
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
