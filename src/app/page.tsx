import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import LeadForm from "@/components/shared/LeadForm";
import { SITE_CONFIG, INSURANCE_PRODUCTS, INSURERS } from "@/utils/constants";

export default function HomePage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Subtle radial accent */}
        <div className="absolute inset-0 gradient-radial-gold opacity-50" />
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full border border-white/15 mb-8">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Especialista en seguros desde 2009
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Protege lo que{" "}
              <span className="text-accent">más importa</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
              Más de{" "}
              <strong className="text-white">
                {SITE_CONFIG.yearsOfExperience} años
              </strong>{" "}
              asesorando familias y empresas en toda la 
              República Mexicana, Expertos en Planes de Ahorro - Retiro - Educación 
              - Gastos Médicos Mayores y Menores - Autos - Riesgos Empresariales y mucho mas...
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Solicitar Cotización
              </Link>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-base backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Directo
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="animate-fade-in-up delay-500 mt-14 flex flex-wrap items-center gap-8 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Agente certificado CNSF
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                +{SITE_CONFIG.yearsOfExperience} años de experiencia
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent/70" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Asesoría personalizada
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-16 md:h-24" preserveAspectRatio="none">
            <path
              d="M0,96L60,90.7C120,85,240,75,360,74.7C480,75,600,85,720,90.7C840,96,960,96,1080,90.7C1200,85,1320,75,1380,69.3L1440,64V120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ==================== PRODUCTS ==================== */}
      <section className="section-padding bg-white" id="seguros">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-brand/5 text-brand text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Nuestros Seguros
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand mb-4">
                Soluciones que se adaptan a ti
              </h2>
              <p className="text-muted max-w-2xl mx-auto text-lg">
                Cada persona y empresa es única. Encontramos la protección
                perfecta para tus necesidades específicas.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSURANCE_PRODUCTS.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 100}>
                <Link
                  href={product.href}
                  className="group block p-7 bg-white rounded-2xl border border-border hover:border-brand/20 hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <span className="flex items-center justify-center w-14 h-14 bg-brand/5 rounded-xl text-2xl group-hover:scale-110 transition-transform duration-300">
                      {product.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-brand group-hover:text-brand-light transition-colors">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {product.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-brand/80">
                        <svg className="w-4 h-4 text-accent/60 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                    Conocer más
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY US ==================== */}
      <section className="section-padding bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                ¿Por qué elegirnos?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand mb-4">
                La diferencia de la experiencia
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: `+${SITE_CONFIG.yearsOfExperience} Años`,
                description: "De experiencia continua en el mercado asegurador de Sonora. Conocemos cada detalle del negocio.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "AXA · CHUBB · Allianz",
                description: "Trabajamos con las mejores aseguradoras: AXA, CHUBB, Allianz, Qualitas, BX+, GNP, Plan Seguro, Zurich y muchas más.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: "Atención 24/7",
                description: "Ante un siniestro, estamos disponibles las 24 horas para guiarte paso a paso en el proceso.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Hermosillo, Sonora",
                description: "Presencia local con conocimiento de la red hospitalaria y necesidades de la región fronteriza.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100}>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-border/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/5 text-brand rounded-2xl mb-5">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INSURERS ==================== */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-sm font-medium text-muted uppercase tracking-widest mb-10">
              Trabajamos con las mejores aseguradoras
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {INSURERS.map((insurer, i) => (
                insurer.logo ? (
                  <div 
                    key={insurer.name} 
                    className="relative h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center bg-white p-2 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 grayscale hover:grayscale-0 opacity-75 hover:opacity-100"
                    title={insurer.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={insurer.logo} 
                      alt={`Logotipo de ${insurer.name}`} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                ) : (
                  <div
                    key={insurer.name}
                    className="h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center bg-white p-2 text-center rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 text-sm font-bold text-brand"
                    title={insurer.name}
                  >
                    {insurer.name}
                  </div>
                )
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CTA FINAL & LEAD FORM ==================== */}
      <section className="section-padding bg-brand relative overflow-hidden" id="cotizar">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <ScrollReveal>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                Protege lo que más importa <br className="hidden lg:block"/>
                <span className="text-accent">hoy mismo</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
                Completa el formulario en dos sencillos pasos y un asesor certificado se pondrá en contacto contigo para presentarte las mejores opciones del mercado sin compromiso.
              </p>
              
              <div className="flex items-center gap-6 mb-10">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                     <div key={i} className="w-12 h-12 rounded-full bg-surface border-2 border-brand flex items-center justify-center text-xs font-bold text-brand shadow-sm">
                       <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                       </svg>
                     </div>
                  ))}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Únete a <span className="text-white font-bold block sm:inline">cientos de clientes protegidos</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar Ahora
                </a>
              </div>
            </ScrollReveal>

            {/* Lead Tracking Form */}
            <ScrollReveal delay={200}>
              <div className="w-full max-w-md mx-auto lg:max-w-none">
                <LeadForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
