"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { SITE_CONFIG } from "@/utils/constants";

const INSURANCE_OPTIONS = [
  { value: "vida", label: "Seguros de Vida" },
  { value: "gmm", label: "Gastos Médicos Mayores" },
  { value: "auto", label: "Seguros de Auto" },
  { value: "vida-ahorro", label: "Seguros de Vida con Ahorro" },
  { value: "empresarial", label: "Seguros Empresariales" },
  { value: "fronterizo", label: "Seguros Fronterizos" },
  { value: "otro", label: "Otro" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactoPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      birthDate: formData.get("birthDate") as string,
      gender: formData.get("gender") as string,
      zipCode: formData.get("zipCode") as string,
      insuranceType: formData.get("insuranceType") as string,
      message: formData.get("message") as string,
      privacyConsent: formData.get("privacyConsent") === "on",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.details) {
          const fieldErrors: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(result.details)) {
            fieldErrors[key] = (msgs as string[])[0];
          }
          setErrors(fieldErrors);
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
      
      // WhatsApp Handoff
      const seguroLabel = INSURANCE_OPTIONS.find(opt => opt.value === data.insuranceType)?.label || data.insuranceType;
      const mensaje = `Hola Oscar, acabo de contactarte desde la página web buscando información de ${seguroLabel || 'seguros'}. Soy ${data.fullName}.`;
      const waUrl = `https://wa.me/526621822481?text=${encodeURIComponent(mensaje)}`;
      
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 1000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 gradient-hero overflow-hidden">
        <div className="absolute inset-0 gradient-radial-gold opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest rounded-full border border-white/15 mb-6">
              Contacto
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Estamos para{" "}
              <span className="text-accent">ayudarte</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Solicita una cotización sin compromiso o resuelve tus dudas con
              nuestro equipo de expertos.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="bg-surface rounded-2xl border border-border p-8 md:p-10 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-brand mb-2">
                    Solicita tu Cotización
                  </h2>
                  <p className="text-muted text-sm mb-8">
                    Completa el formulario y te contactaremos en menos de 24
                    horas.
                  </p>

                  {/* Success Message */}
                  {status === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in-up">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-bold text-green-800">¡Mensaje enviado!</p>
                          <p className="text-xs text-green-700">Te contactaremos en menos de 24 horas.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {status === "error" && Object.keys(errors).length === 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up">
                      <p className="text-sm font-bold text-red-800">Error al enviar. Intenta de nuevo o llámanos directamente.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-brand mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="fullName"
                          required
                          className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all`}
                          placeholder="Tu nombre"
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-brand mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          required
                          className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all`}
                          placeholder="662 000 0000"
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-brand mb-2">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          required
                          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-birthdate" className="block text-sm font-medium text-brand mb-2">
                          Fecha de nacimiento *
                        </label>
                        <input
                          type="date"
                          id="contact-birthdate"
                          name="birthDate"
                          required
                          className={`w-full px-4 py-3 rounded-xl border ${errors.birthDate ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all`}
                        />
                        {errors.birthDate && <p className="mt-1 text-xs text-red-600">{errors.birthDate}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-gender" className="block text-sm font-medium text-brand mb-2">
                          Sexo *
                        </label>
                        <select
                          id="contact-gender"
                          name="gender"
                          required
                          className={`w-full px-4 py-3 rounded-xl border ${errors.gender ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all`}
                        >
                          <option value="">Selecciona</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Otro">Otro</option>
                          <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-zipcode" className="block text-sm font-medium text-brand mb-2">
                          Código Postal *
                        </label>
                        <input
                          type="text"
                          id="contact-zipcode"
                          name="zipCode"
                          required
                          className={`w-full px-4 py-3 rounded-xl border ${errors.zipCode ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all`}
                          placeholder="Ej. 83000"
                        />
                        {errors.zipCode && <p className="mt-1 text-xs text-red-600">{errors.zipCode}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-insurance" className="block text-sm font-medium text-brand mb-2">
                        Tipo de seguro de interés *
                      </label>
                      <select
                        id="contact-insurance"
                        name="insuranceType"
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${errors.insuranceType ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all`}
                      >
                        <option value="">Selecciona una opción</option>
                        {INSURANCE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      {errors.insuranceType && <p className="mt-1 text-xs text-red-600">{errors.insuranceType}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-brand mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${errors.message ? "border-red-400 ring-2 ring-red-100" : "border-border"} bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none`}
                        placeholder="Cuéntanos sobre tus necesidades de seguro..."
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="contact-privacy"
                        name="privacyConsent"
                        required
                        className="mt-1 w-4 h-4 rounded border-border text-brand focus:ring-brand"
                      />
                      <label htmlFor="contact-privacy" className="text-xs text-muted leading-relaxed">
                        He leído y acepto el{" "}
                        <Link href="/aviso-privacidad" className="text-accent hover:text-accent-dark underline">
                          Aviso de Privacidad
                        </Link>{" "}
                        y autorizo el uso de mis datos para los fines descritos.
                      </label>
                    </div>
                    {errors.privacyConsent && <p className="text-xs text-red-600">{errors.privacyConsent}</p>}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {status === "submitting" ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Enviar Solicitud
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal delay={100}>
                <div className="bg-surface rounded-2xl border border-border p-7 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-brand mb-6">
                    Información de Contacto
                  </h3>
                  <ul className="space-y-5">
                    <li>
                      <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-4 group">
                        <span className="flex items-center justify-center w-12 h-12 bg-brand/5 text-brand rounded-xl group-hover:bg-brand group-hover:text-white transition-all">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-xs text-muted">Teléfono</p>
                          <p className="text-sm font-semibold text-brand">{SITE_CONFIG.phoneDisplay}</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <span className="flex items-center justify-center w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl group-hover:bg-[#25D366] group-hover:text-white transition-all">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-xs text-muted">WhatsApp</p>
                          <p className="text-sm font-semibold text-brand">Enviar mensaje</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-4 group">
                        <span className="flex items-center justify-center w-12 h-12 bg-brand/5 text-brand rounded-xl group-hover:bg-brand group-hover:text-white transition-all">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-xs text-muted">Email</p>
                          <p className="text-sm font-semibold text-brand">{SITE_CONFIG.email}</p>
                        </div>
                      </a>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-12 h-12 bg-brand/5 text-brand rounded-xl">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-xs text-muted">Horario</p>
                        <p className="text-sm font-semibold text-brand">{SITE_CONFIG.officeHours}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-brand rounded-2xl p-7 text-white">
                  <h3 className="font-display text-lg font-bold mb-3">
                    ¿Urgencia o siniestro?
                  </h3>
                  <p className="text-sm text-white/70 mb-5 leading-relaxed">
                    Si tienes una emergencia médica o necesitas reportar un
                    siniestro, contáctanos de inmediato.
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-bold rounded-full hover:bg-accent-dark transition-all shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Línea de Emergencia 24/7
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
