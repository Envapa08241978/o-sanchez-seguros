import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Cédula del Agente y Certificaciones",
  description: "Acreditaciones oficiales, Cédula de Agente B y membresía en la Asociación Mexicana de Agentes de Seguros (AMASFAC) de Oscar Sánchez.",
};

export default function CedulaAgentePage() {
  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-5xl mb-6 block">📜</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand mb-6">
              Certificaciones y <span className="text-accent">Acreditaciones</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              La transparencia y el profesionalismo son fundamentales. Aquí puedes consultar y descargar las acreditaciones oficiales que respaldan más de 16 años de trayectoria ininterrumpida.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta Cédula */}
          <ScrollReveal delay={100}>
            <div className="bg-surface rounded-3xl p-8 border border-border shadow-md hover:shadow-xl hover-lift transition-all h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-brand mb-3">
                Cédula de Agente Tipo B
              </h3>
              <p className="text-muted text-sm mb-8 flex-grow">
                Autorización oficial expedida por la Comisión Nacional de Seguros y Fianzas (CNSF) para intermediar riesgos empresariales, vida, autos y daños.
                <br /><br />
                <span className="font-medium text-brand">Folio: C367619</span>
              </p>
              
              <a
                href="/pdf/cedula-agente.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-medium rounded-xl hover:bg-brand-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Ver Cédula Oficial
              </a>
            </div>
          </ScrollReveal>

          {/* Tarjeta AMASFAC */}
          <ScrollReveal delay={200}>
            <div className="bg-surface rounded-3xl p-8 border border-border shadow-md hover:shadow-xl hover-lift transition-all h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-brand mb-3">
                Asociación Mexicana
              </h3>
              <p className="text-muted text-sm mb-8 flex-grow">
                Miembro oficial de la AMASFAC (Asociación Mexicana de Agentes de Seguros y Fianzas A.C.), comprometiéndonos a los más altos estándares éticos de la industria.
                <br /><br />
                <span className="font-medium text-brand">Vigencia Activa</span>
              </p>
              
              <a
                href="/pdf/asociacion-mexicana.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-medium rounded-xl hover:bg-brand-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Ver Certificado AMASFAC
              </a>
            </div>
          </ScrollReveal>

          {/* Tarjeta AXA */}
          <ScrollReveal delay={300}>
            <div className="bg-surface rounded-3xl p-8 border border-border shadow-md hover:shadow-xl hover-lift transition-all h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006 3.504 3.504 0 014.438 0 3.42 3.42 0 001.946 1.006 3.504 3.504 0 012.913 2.913 3.42 3.42 0 001.006 1.946 3.504 3.504 0 010 4.438 3.42 3.42 0 00-1.006 1.946 3.504 3.504 0 01-2.913 2.913 3.42 3.42 0 00-1.946 1.006 3.504 3.504 0 01-4.438 0 3.42 3.42 0 00-1.946-1.006 3.504 3.504 0 01-2.913-2.913 3.42 3.42 0 00-1.006-1.946 3.504 3.504 0 010-4.438 3.42 3.42 0 001.006-1.946 3.504 3.504 0 012.913-2.913z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-brand mb-3">
                Reconocimiento AXA 2025
              </h3>
              <p className="text-muted text-sm mb-8 flex-grow">
                Distinción otorgada por AXA Seguros en reconocimiento a la excelencia, calidad en el servicio y solidez profesional durante el año 2025.
                <br /><br />
                <span className="font-medium text-brand">Socio Estratégico AXA</span>
              </p>
              
              <a
                href="/images/RECONOCIMIENTO AXA 2025.png"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-medium rounded-xl hover:bg-brand-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ver Reconocimiento
              </a>
            </div>
          </ScrollReveal>
        </div>


        <ScrollReveal delay={300}>
          <div className="text-center mt-12">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-brand hover:text-accent font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Regresar o Solicitar Cotización
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
