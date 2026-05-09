"use client";

import Image from "next/image";
import Link from "next/link";

const NETWORK_LINKS = [
  {
    id: 1,
    insurer: "AXA Seguros",
    logo: "/images/axxa.jpeg",
    description:
      "Busca hospitales, médicos y especialistas en toda la red nacional de AXA Seguros. Filtra por estado, ciudad y especialidad.",
    label: "Buscador de Hospitales y Médicos Nacional",
    url: "https://axa.mx/servicios/buscador-de-servicios",
    color: "#00008f",
    colorLight: "#1a1aaf",
  },
  {
    id: 2,
    insurer: "GNP Seguros",
    logo: "/images/GNP.jpeg",
    description:
      "Consulta el directorio completo de proveedores médicos de GNP. Encuentra hospitales, clínicas y especialistas cerca de ti.",
    label: "Directorio de Proveedores Médicos",
    url: "https://www.gnp.com.mx/directorio-proveedores-medicos",
    color: "#e8792b",
    colorLight: "#f09050",
  },
  {
    id: 3,
    insurer: "BX+ Seguros",
    logo: "/images/SEGUROS_BX.jpeg",
    description:
      "Explora la red hospitalaria de BX+ Seguros (Ve por Más). Busca hospitales por ubicación y tipo de servicio.",
    label: "Búsqueda de Red Hospitalaria",
    url: "https://www.vepormas.com/red-medica/hospitalaria/",
    color: "#003366",
    colorLight: "#0a4a80",
  },
  {
    id: 4,
    insurer: "Centauro Clínica Dental",
    logo: "/images/centauro-dental.jpg",
    description:
      "Consulta la red dental externa nacional de Centauro Clínica Dental. Disponible para pólizas en convenio con cobertura dental.",
    label: "Red Dental Nacional",
    url: "https://www.centauro.com.mx/red-dental-externa",
    color: "#00897B",
    colorLight: "#26A69A",
  },
];

export default function RedHospitalariaPage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative px-6 py-24 bg-brand text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-light rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold tracking-wide text-white mb-6 animate-fade-in-up">
            NUESTRA COBERTURA
          </span>
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Red Hospitalaria en{" "}
            <span className="text-accent underline decoration-4 underline-offset-8">
              Sonora y Nacional
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-neutral-200 mb-6 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Contamos con seguros de amplia red médica Nacional de acuerdo al plan
            contratado para garantizarte la mejor atención cuando más lo
            necesitas.
          </p>
          <p
            className="text-base text-neutral-300 max-w-xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            Consulta directamente la red de hospitales y médicos de cada
            aseguradora usando los buscadores oficiales.
          </p>
        </div>
      </section>

      {/* Network Links Cards */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NETWORK_LINKS.map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-border hover:shadow-2xl transition-all duration-500 flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Logo Area */}
              <div className="relative p-8 pb-6 flex flex-col items-center text-center">
                {/* Decorative gradient blob */}
                <div
                  className="absolute top-0 left-0 right-0 h-32 opacity-[0.07] rounded-b-[60%] transition-opacity duration-500 group-hover:opacity-[0.12]"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.colorLight})`,
                  }}
                />

                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg mb-5 border-2 border-neutral-100 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={item.logo}
                    alt={`Logo ${item.insurer}`}
                    fill
                    className="object-contain p-2 bg-white"
                    sizes="96px"
                  />
                </div>

                <h3 className="text-xl font-bold text-brand group-hover:text-brand-light transition-colors">
                  {item.insurer}
                </h3>
                <span
                  className="inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.label}
                </span>
              </div>

              {/* Description */}
              <div className="px-8 pb-4 flex-1">
                <p className="text-sm text-neutral-600 leading-relaxed text-center">
                  {item.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="px-8 pb-8">
                <div
                  className="w-full py-3 rounded-full text-center font-bold text-white text-sm transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.colorLight})`,
                  }}
                >
                  Buscar Red Médica
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-16 bg-brand/5 border border-brand/10 rounded-2xl p-8 text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-brand"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-bold text-brand">
              ¿Tu aseguradora no aparece?
            </h3>
          </div>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto">
            Trabajamos con más de 20 aseguradoras. Si necesitas consultar la red
            hospitalaria de otra compañía, contáctanos y te ayudamos
            directamente.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-light py-16 px-6 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          ¿Tienes dudas sobre las coberturas?
        </h2>
        <p className="text-neutral-200 mb-8 max-w-2xl mx-auto">
          Contacta a nuestro equipo para asegurarte que el hospital de tu
          preferencia está cubierto por tu póliza actual.
        </p>
        <Link
          href="/contacto"
          className="inline-block px-8 py-3 bg-white text-brand rounded-full font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
        >
          Contactar Asesor
        </Link>
      </section>
    </main>
  );
}
