"use client";

import { useState } from "react";
import Link from "next/link";
import { leadSchema } from "@/lib/schemas/lead.schema";
import type { LeadFormData } from "@/lib/schemas/lead.schema";

const INSURANCE_OPTIONS = [
  { value: "gmm", label: "Gastos Médicos Mayores" },
  { value: "fronterizo", label: "Planes de Ahorro e Inversión" },
  { value: "vida", label: "Seguros de Vida" },
  { value: "auto", label: "Seguros de Auto" },
  { value: "empresarial", label: "Seguros Empresariales" },
  { value: "otro", label: "Otro" },
];

export default function LeadForm({
  defaultInsuranceType = "",
}: {
  defaultInsuranceType?: string;
}) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form State
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    insuranceType: defaultInsuranceType as any,
    privacyConsent: false,
  });

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    if (!formData.insuranceType) {
      newErrors.insuranceType = "Por favor selecciona el seguro de tu interés";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNext();
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      
      // Generar enlace dinámico y abrir WhatsApp (Client Handoff)
      const seguroLabel = INSURANCE_OPTIONS.find(opt => opt.value === formData.insuranceType)?.label || formData.insuranceType;
      const mensaje = `Hola Oscar, acabo de solicitar mi cotización web de ${seguroLabel}. Soy ${formData.fullName}.`;
      const waUrl = `https://wa.me/526621822481?text=${encodeURIComponent(mensaje)}`;
      
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 1000);

    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-green-200 p-8 md:p-10 text-center shadow-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-brand mb-2">¡Solicitud Enviada!</h3>
        <p className="text-muted mb-6">
          Gracias por tu interés, {formData.fullName?.split(" ")[0]}. Un asesor se comunicará contigo pronto.
        </p>
        <button
          onClick={() => {
            setStep(1);
            setStatus("idle");
            setFormData({ insuranceType: undefined, privacyConsent: false });
          }}
          className="text-brand font-bold hover:text-accent transition-colors"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-muted mb-2 px-1">
          <span className={step >= 1 ? "text-accent" : ""}>1. Tu Interés</span>
          <span className={step >= 2 ? "text-accent" : ""}>2. Tus Datos</span>
        </div>
        <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        {/* Step 1: Insurance Type & Message */}
        <div className={`transition-all duration-500 ${step === 1 ? "block opacity-100" : "hidden opacity-0 absolute inset-0 pointer-events-none"}`}>
          <h3 className="font-display text-xl font-bold text-brand mb-6">¿Qué seguro buscas?</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand mb-2">
                Tipo de Seguro *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INSURANCE_OPTIONS.map((opt) => (
                  <label 
                    key={opt.value} 
                    className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.insuranceType === opt.value 
                        ? "border-accent bg-accent/5 ring-1 ring-accent" 
                        : "border-border hover:border-brand/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="insuranceType"
                      value={opt.value}
                      checked={formData.insuranceType === opt.value}
                      onChange={updateFormData}
                      className="sr-only"
                    />
                    <span className={`text-sm ${formData.insuranceType === opt.value ? "text-brand font-bold" : "text-muted"}`}>
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.insuranceType && <p className="mt-2 text-xs text-red-600">{errors.insuranceType}</p>}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full mt-6 py-3.5 bg-brand text-white font-bold rounded-xl hover:bg-[#0A224A] transition-all flex items-center justify-center gap-2"
            >
              Continuar
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Step 2: Personal Details */}
        <div className={`transition-all duration-500 ${step === 2 ? "block opacity-100" : "hidden opacity-0 absolute inset-0 pointer-events-none"}`}>
          <div className="flex items-center gap-3 mb-6">
            <button 
              type="button" 
              onClick={handlePrev}
              className="p-1 rounded-full hover:bg-surface-elevated text-muted hover:text-brand transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h3 className="font-display text-xl font-bold text-brand">Datos de Contacto</h3>
          </div>

          {status === "error" && Object.keys(errors).length === 0 && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg">
              Hubo un error al procesar tu solicitud. Intenta de nuevo.
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="lead-name" className="block text-sm font-medium text-brand mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="lead-name"
                name="fullName"
                value={formData.fullName || ""}
                onChange={updateFormData}
                className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? "border-red-400" : "border-border"} focus:ring-2 focus:ring-brand/20 outline-none transition-all`}
                placeholder="Juan Pérez"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="lead-phone" className="block text-sm font-medium text-brand mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="lead-phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={updateFormData}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400" : "border-border"} focus:ring-2 focus:ring-brand/20 outline-none transition-all`}
                  placeholder="662 000 0000"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>
              
              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium text-brand mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="lead-email"
                  name="email"
                  value={formData.email || ""}
                  onChange={updateFormData}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-border"} focus:ring-2 focus:ring-brand/20 outline-none transition-all`}
                  placeholder="juan@email.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="lead-privacy"
                name="privacyConsent"
                checked={formData.privacyConsent || false}
                onChange={updateFormData}
                className="mt-1 w-4 h-4 rounded border-border text-brand focus:ring-brand"
              />
              <label htmlFor="lead-privacy" className="text-xs text-muted leading-relaxed">
                Acepto el <Link href="/aviso-privacidad" className="text-accent underline">Aviso de Privacidad</Link> y el tratamiento de mis datos personales.
              </label>
            </div>
            {errors.privacyConsent && <p className="text-xs text-red-600 -mt-2">{errors.privacyConsent}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full mt-4 py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Procesando...
                </>
              ) : (
                "Solicitar Asesoría"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
