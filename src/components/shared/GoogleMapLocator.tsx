"use client";

import { SITE_CONFIG } from "@/utils/constants";

export default function GoogleMapLocator() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=O%20Sanchez%20Seguros,%20Blvd.%20Juan%20Navarrete%20154,%20Hermosillo,%20Sonora&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full bg-surface rounded-2xl border border-border shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
      {/* Left Info Panel */}
      <div className="lg:col-span-4 p-6 md:p-8 bg-[#182458] text-white flex flex-col justify-between">
        <div>
          <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-xs font-semibold rounded-full border border-white/20 mb-4">
            📍 Oficina Principal
          </span>

          <h3 className="font-display text-2xl font-bold mb-3 text-white">
            O Sanchez Seguros
          </h3>

          <p className="text-white/80 text-sm leading-relaxed mb-6">
            Atención personalizada por el Agente Oscar Sánchez Aguirre y equipo especialista.
          </p>

          <div className="space-y-4 text-sm text-white/90">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <strong className="block text-white font-medium">Dirección:</strong>
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong className="block text-white font-medium">Horario de Atención:</strong>
                <span>{SITE_CONFIG.officeHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <strong className="block text-white font-medium">Teléfono:</strong>
                <a href={`tel:${SITE_CONFIG.whatsapp}`} className="hover:underline text-white">
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <a
            href={SITE_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Abrir en Google Maps
          </a>
        </div>
      </div>

      {/* Right Map Panel */}
      <div className="lg:col-span-8 relative min-h-[350px] lg:min-h-full bg-slate-100">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "350px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación O Sanchez Seguros en Hermosillo"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
