import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de Privacidad Integral de O Sanchez Seguros conforme a la Ley Federal de Protección de Datos Personales.",
};

export default function AvisoPrivacidadPage() {
  return (
    <>
      <section className="relative py-20 md:py-24 gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Aviso de Privacidad Integral
            </h1>
            <p className="text-white/60 text-sm">
              Última actualización: Abril 2026
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
              <h2 className="font-display text-xl font-bold text-brand">
                I. Identidad y Domicilio del Responsable
              </h2>
              <p>
                <strong>{SITE_CONFIG.fullName}</strong>, con nombre comercial{" "}
                <strong>&quot;{SITE_CONFIG.name}&quot;</strong>, con domicilio en{" "}
                {SITE_CONFIG.address}, es responsable del tratamiento de sus
                datos personales.
              </p>
              <p>
                Correo electrónico: {SITE_CONFIG.email}
                <br />
                Teléfono: {SITE_CONFIG.phoneDisplay}
              </p>

              <h2 className="font-display text-xl font-bold text-brand">
                II. Datos Personales que Recabamos
              </h2>
              <p>Para las finalidades señaladas, recabamos las siguientes categorías de datos personales:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Datos de identificación: nombre completo, fecha de nacimiento, CURP, RFC.</li>
                <li>Datos de contacto: domicilio, teléfono, correo electrónico.</li>
                <li>Datos laborales: ocupación, empresa donde labora.</li>
                <li>Datos financieros: información para cotización de seguros.</li>
                <li>Datos de salud: historial médico (cuando aplique para seguros de GMM).</li>
              </ul>

              <h2 className="font-display text-xl font-bold text-brand">
                III. Finalidades del Tratamiento
              </h2>
              <p><strong>Finalidades primarias (necesarias):</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cotización y emisión de pólizas de seguro.</li>
                <li>Gestión de siniestros y trámites ante aseguradoras.</li>
                <li>Atención de consultas, quejas y solicitudes.</li>
                <li>Cumplimiento de obligaciones legales ante la CNSF y CONDUSEF.</li>
              </ul>
              <p><strong>Finalidades secundarias:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Envío de comunicaciones informativas sobre servicios y productos.</li>
                <li>Realización de encuestas de satisfacción.</li>
                <li>Envío de recordatorios de renovación de póliza.</li>
              </ul>

              <h2 className="font-display text-xl font-bold text-brand">
                IV. Mecanismos para Ejercer Derechos ARCO
              </h2>
              <p>
                Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse
                (derechos ARCO) al tratamiento de sus datos personales. Para
                ejercer estos derechos, envíe su solicitud al correo:{" "}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-brand hover:text-brand-light"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>

              <h2 className="font-display text-xl font-bold text-brand">
                V. Transferencia de Datos
              </h2>
              <p>
                Sus datos podrán ser transferidos a compañías aseguradoras con
                las que {SITE_CONFIG.name} mantiene relación comercial, con el
                único fin de brindarle los servicios contratados. No se
                realizarán transferencias que requieran su consentimiento sin
                solicitarlo previamente.
              </p>

              <h2 className="font-display text-xl font-bold text-brand">
                VI. Cambios al Aviso de Privacidad
              </h2>
              <p>
                Cualquier modificación al presente Aviso de Privacidad será
                notificada a través de nuestro sitio web. Le recomendamos
                revisarlo periódicamente.
              </p>

              <div className="mt-10 p-6 bg-surface-elevated rounded-xl border border-border">
                <p className="text-xs text-muted">
                  Este aviso se emite en cumplimiento de la Ley Federal de
                  Protección de Datos Personales en Posesión de los Particulares
                  (LFPDPPP), su Reglamento y los Lineamientos del Aviso de
                  Privacidad, publicados en el Diario Oficial de la Federación.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
