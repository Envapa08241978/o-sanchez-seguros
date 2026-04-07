"use client";

import { useState } from "react";

const HOSPITALS = [
  {
    id: 1,
    name: "Hospital CIMA Hermosillo",
    specialty: "Clínicas Integrales y Especialidad",
    description: "Este hospital destaca por contar con clínicas integrales de alta especialidad (como el Hermosillo Heart Team, la Unidad de Reproducción Asistida y la Clínica de Cirugía Bariátrica).",
    specialtiesList: [
      "Cardiología y Cirugía Cardiovascular: Incluyendo cardiología pediátrica, hemodinamia y cirugía del tórax.",
      "Cirugía: General, oncológica, pediátrica, bariátrica y metabólica, plástica/estética y reconstructiva.",
      "Ginecología y Obstetricia",
      "Pediatría y Neonatología",
      "Medicina Interna",
      "Traumatología y Ortopedia",
      "Neurología y Psiquiatría",
      "Gastroenterología y Endoscopia",
      "Dermatología, Urología, Neumología, Medicina del Deporte, Medicina Crítica, Angiología."
    ],
    address: "Paseo Río Sonora 76, Proyecto Rio Sonora, 83280 Hermosillo, Son.",
    phone: "(662) 259 0900",
    embedMapUrl: "https://maps.google.com/maps?q=Hospital+CIMA+Hermosillo&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 2,
    name: "Hospital San José",
    specialty: "Especialidades y Diagnóstico",
    description: "Es un hospital con un directorio médico extenso, fuertemente enfocado en intervenciones quirúrgicas, medicina preventiva y de diagnóstico.",
    specialtiesList: [
      "Cardiología y Angiología",
      "Cirugía: General, pediátrica, y plástica.",
      "Ginecología y Obstetricia",
      "Neurología y Neurocirugía",
      "Pediatría y Neonatología",
      "Medicina Interna y Medicina Crítica (Terapia Intensiva)",
      "Gastroenterología y Coloproctología",
      "Nefrología, Neumología, Geriatría, Bariatría, Reumatología, Oftalmología, Ortopedia, Psicología."
    ],
    address: "Blvd. José Ma. Morelos 340, Bachoco, 83148 Hermosillo, Son.",
    phone: "(662) 109 0500",
    embedMapUrl: "https://maps.google.com/maps?q=Hospital+San+Jose+Hermosillo&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 3,
    name: "Clínica del Noroeste",
    specialty: "Tradición y Subespecialidades",
    description: "Es uno de los centros médicos con mayor tradición en el centro de la ciudad, abarcando una amplia gama de subespecialidades clínicas y quirúrgicas:",
    specialtiesList: [
      "Cardiología: Incluyendo Cardiología Pediátrica.",
      "Cirugía: General, pediátrica, y plástica, estética y reconstructiva.",
      "Ginecología y Obstetricia",
      "Neurología Clínica y Neurocirugía",
      "Medicina Interna",
      "Especialidades Sistémicas e Inmunológicas (Alergología, Endocrinología).",
      "Dermatología, Endoscopia, Neumología, Oftalmología, Ortopedia, Otorrinolaringología, Psiquiatría."
    ],
    address: "Luis Donaldo Colosio O 14, Centro, 83000 Hermosillo, Son.",
    phone: "(662) 259 4000",
    embedMapUrl: "https://maps.google.com/maps?q=Clinica+del+Noroeste+Hermosillo&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 4,
    name: "Hospital Licona",
    specialty: "Enfoque Selecto y Cirugía",
    description: "Este hospital mantiene un enfoque más selecto, destacando principalmente en áreas quirúrgicas, estéticas y de consulta externa especializada.",
    specialtiesList: [
      "Cirugía General",
      "Cirugía Plástica, Estética y Reconstructiva",
      "Ginecología y Obstetricia",
      "Medicina Interna",
      "Pediatría",
      "Nefrología",
      "Urología y Ortopedia",
      "Dermatología clínica y cosmética, Quirófano de corta estancia y Psicología."
    ],
    address: "Río San Miguel 64, Proyecto Rio Sonora, 83280 Hermosillo, Son.",
    phone: "(662) 217 2740",
    embedMapUrl: "https://maps.google.com/maps?q=Hospital+Licona+Hermosillo&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
];

export default function RedHospitalariaPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHospitals = HOSPITALS.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Red Hospitalaria en <span className="text-accent underline decoration-4 underline-offset-8">Sonora</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Contamos con convenio directo en los mejores hospitales del estado para garantizarte la mejor atención cuando más lo necesitas.
          </p>

          {/* Buscador */}
          <div className="max-w-xl mx-auto relative group animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-neutral-400 group-focus-within:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-brand rounded-full py-4 pl-12 pr-6 shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all font-medium"
            />
          </div>
        </div>
      </section>

      {/* Grid de Hospitales */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {filteredHospitals.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-brand mb-2">No se encontraron hospitales</h3>
            <p className="text-muted">Prueba usando otros términos de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredHospitals.map((hospital) => (
              <div 
                key={hospital.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Contención Título y Datos */}
                <div className="p-8 pb-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-brand group-hover:text-brand-light transition-colors">{hospital.name}</h3>
                      <span className="inline-block mt-2 px-3 py-1 bg-brand/5 text-brand-light text-xs font-bold rounded-full">
                        {hospital.specialty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      {hospital.description}
                    </p>
                    
                    {/* Lista Expandible de Especialidades */}
                    <div className="mb-4">
                      <details className="group/details">
                        <summary className="text-sm font-semibold text-brand cursor-pointer select-none hover:text-accent transition-colors flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-brand/5">
                          Ver Especialidades Principales
                          <svg className="w-4 h-4 transform group-open/details:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <ul className="mt-3 space-y-2 text-sm text-neutral-600 list-inside list-disc">
                          {hospital.specialtiesList.map((spec, i) => (
                            <li key={i} className="pl-2 leading-tight">
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>

                    <div className="pt-4 border-t border-border"></div>

                    <div className="flex items-start gap-3 text-muted">
                      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm font-medium">{hospital.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Mapa Iframe Dinámico */}
                <div className="w-full h-64 bg-neutral-100 relative grayscale hover:grayscale-0 transition-all duration-500">
                  <iframe
                    title={`Ver ${hospital.name} en Google Maps`}
                    src={hospital.embedMapUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Subtle Map Overlay that disappears on hover pointer interactions natively */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-full pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity">
                    <span className="text-xs font-bold text-brand flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      Mapa Interactivo
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-brand-light py-16 px-6 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Tienes dudas sobre las coberturas?</h2>
        <p className="text-neutral-200 mb-8 max-w-2xl mx-auto">
          Contacta a nuestro equipo para asegurarte que el hospital de tu preferencia está cubierto por tu póliza actual.
        </p>
        <button className="px-8 py-3 bg-white text-brand rounded-full font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-xl">
          Contactar Asesor
        </button>
      </section>
    </main>
  );
}
