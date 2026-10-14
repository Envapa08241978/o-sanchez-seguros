import NationalQuoter from "@/components/quoter/NationalQuoter";
import JsonLd from "@/components/shared/JsonLd";

const COTIZADOR_FAQS = [
  {
    question: "¿Este cotizador tiene cobertura en toda la República Mexicana?",
    answer:
      "Sí. El cotizador calcula las tarifas actuariales oficiales ajustadas a tu estado y municipio (desde Sonora, Sinaloa y Baja California hasta CDMX, Nuevo León, Jalisco y toda la República). Al emitir tu póliza, cuentas con atención médica en los hospitales privados de prestigio de tu localidad y a nivel nacional.",
  },
  {
    question: "¿Los precios calculados son oficiales de AXA Seguros?",
    answer:
      "Las cifras corresponden a los tabuladores paramétricos de AXA Flex Plus con las opciones oficiales de Gama Hospitalaria (Esencial, Confort y Diamante Elite) con deducibles estándar. Al comunicarte con Oscar Sánchez, se validan los cuestionarios de salud definitivos para la emisión formal.",
  },
  {
    question: "¿Puedo pagar a Meses Sin Intereses?",
    answer:
      "Sí, con O Sanchez Seguros puedes diferir el pago de tu póliza de Gastos Médicos Mayores a 3, 5 y 6 Meses Sin Intereses con tarjetas de crédito participantes de los principales bancos de México.",
  },
  {
    question: "¿Qué pasa después de completar mi cotización en línea?",
    answer:
      "Al presionar el botón de WhatsApp, se abre un enlace directo con Oscar Sánchez (agente certificado CNSF y AMASFAC) con el desglose exacto de tu cotización ya prellenado. Te ayudaremos a resolver dudas, ajustar coberturas especiales (maternidad, enfermedades catastróficas) y formalizar tu trámite de forma 100% digital sin salir de casa.",
  },
];

export default function CotizadorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative gradient-hero py-16 sm:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20 mb-6">
            🇲🇽 Cobertura en Toda la República Mexicana · Agente Certificado CNSF y AMASFAC
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Cotizador Digital de <span className="text-accent">Gastos Médicos Mayores</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Calcula en menos de 2 minutos tu presupuesto personalizado para ti o tu familia con acceso a la mejor red hospitalaria privada de México.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="text-accent font-bold">✓</span> Cálculo Actuarial Instantáneo
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent font-bold">✓</span> 3, 5 y 6 Meses Sin Intereses con tarjetas participantes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent font-bold">✓</span> Asesoría Directa 1-a-1 por WhatsApp
            </span>
          </div>
        </div>
      </section>

      {/* Main Quoter Component */}
      <section className="relative -mt-8 pb-16">
        <NationalQuoter />
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-16 bg-white border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              Preguntas Frecuentes
            </span>
            <h2 className="font-display text-3xl font-extrabold text-brand mt-1">
              Todo lo que necesitas saber antes de contratar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COTIZADOR_FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-background border border-border">
                <h3 className="font-bold text-brand text-base mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
