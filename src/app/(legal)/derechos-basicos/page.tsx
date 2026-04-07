import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Derechos Básicos del Asegurado",
  description:
    "Conoce tus derechos como asegurado conforme a la CNSF y la CONDUSEF. Folleto de derechos básicos del usuario de seguros.",
};

const RIGHTS = [
  {
    number: "1",
    title: "Derecho a la información",
    description: "Tienes derecho a recibir información clara, oportuna y suficiente sobre las condiciones de tu póliza de seguro.",
  },
  {
    number: "2",
    title: "Derecho a elegir",
    description: "Puedes elegir libremente la aseguradora y el producto de seguro que mejor se adapte a tus necesidades.",
  },
  {
    number: "3",
    title: "Derecho al servicio",
    description: "La aseguradora y tu agente están obligados a brindarte un servicio profesional, oportuno y de calidad.",
  },
  {
    number: "4",
    title: "Derecho a la protección",
    description: "Tus datos personales deben ser protegidos conforme a la ley. La aseguradora no puede negar el servicio sin justificación.",
  },
  {
    number: "5",
    title: "Derecho a la reclamación",
    description: "Si no estás de acuerdo con una decisión, puedes presentar una queja ante la CONDUSEF.",
  },
  {
    number: "6",
    title: "Derecho a la indemnización",
    description: "Ante un siniestro cubierto, tienes derecho a recibir el pago de la indemnización en los plazos establecidos.",
  },
];

export default function DerechosBasicosPage() {
  return (
    <>
      <section className="relative py-20 md:py-24 gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Derechos Básicos del Asegurado
            </h1>
            <p className="text-white/60 text-sm">
              Conforme a la CNSF y la CONDUSEF
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-muted leading-relaxed mb-10">
              Como usuario de servicios de seguros en México, la Comisión
              Nacional de Seguros y Fianzas (CNSF) y la Comisión Nacional para
              la Protección y Defensa de los Usuarios de Servicios Financieros
              (CONDUSEF) garantizan los siguientes derechos:
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {RIGHTS.map((right, index) => (
              <ScrollReveal key={right.number} delay={index * 80}>
                <div className="flex gap-5 p-6 bg-surface rounded-2xl border border-border hover:border-brand/15 transition-all">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-brand/5 text-brand font-bold rounded-xl text-sm">
                    {right.number}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-brand mb-1">
                      {right.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {right.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="mt-10 p-6 bg-surface-elevated rounded-xl border border-border">
              <h3 className="font-display text-sm font-bold text-brand mb-3">
                ¿Tienes alguna queja o inconformidad?
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                Puedes acudir a la CONDUSEF para recibir orientación y
                presentar tu queja de forma gratuita.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.condusef.gob.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                >
                  CONDUSEF →
                </a>
                <a
                  href="https://www.cnsf.gob.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                >
                  CNSF →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
