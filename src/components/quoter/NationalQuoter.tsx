"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getStateFromZipCode,
  calculateNationalQuote,
  type CalculatedPlan,
  type QuoteCalculationResult,
} from "@/lib/calculators/nationalQuoterEngine";
import { SITE_CONFIG } from "@/utils/constants";

type TargetOption = "solo" | "pareja" | "familia" | "padres";

export default function NationalQuoter() {
  const [step, setStep] = useState<number>(1);
  const [target, setTarget] = useState<TargetOption>("solo");
  const [titularAge, setTitularAge] = useState<number>(35);
  const [titularGender, setTitularGender] = useState<"H" | "M">("H");
  const [partnerAge, setPartnerAge] = useState<number>(33);
  const [partnerGender, setPartnerGender] = useState<"H" | "M">("M");
  const [childrenAges, setChildrenAges] = useState<number[]>([5]);
  const [zipCode, setZipCode] = useState<string>("83205"); // Hermosillo por defecto, editable
  const [selectedDeductible, setSelectedDeductible] = useState<number>(25000);
  const [paymentMode, setPaymentMode] = useState<"monthly" | "annual">("monthly");

  // Lead Gate inputs
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(true);

  // Status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<QuoteCalculationResult | null>(null);

  // Autodetección en tiempo real del estado de la República Mexicana
  const detectedState = useMemo(() => {
    return getStateFromZipCode(zipCode || "83205");
  }, [zipCode]);

  // Recalcular en tiempo real si el usuario cambia el deducible en el paso 5
  const activePlans = useMemo<CalculatedPlan[]>(() => {
    if (!calculationResult) return [];
    const recalc = calculateNationalQuote({
      target,
      titularAge,
      titularGender,
      partnerAge: target === "pareja" || target === "familia" ? partnerAge : undefined,
      partnerGender: target === "pareja" || target === "familia" ? partnerGender : undefined,
      childrenAges: target === "familia" ? childrenAges : undefined,
      zipCode,
      deductible: selectedDeductible,
    });
    return recalc.plans;
  }, [calculationResult, target, titularAge, titularGender, partnerAge, partnerGender, childrenAges, zipCode, selectedDeductible]);

  const handleAddChild = () => {
    if (childrenAges.length < 5) {
      setChildrenAges([...childrenAges, 3]);
    }
  };

  const handleRemoveChild = (index: number) => {
    setChildrenAges(childrenAges.filter((_, idx) => idx !== index));
  };

  const handleChildAgeChange = (index: number, age: number) => {
    const updated = [...childrenAges];
    updated[index] = age;
    setChildrenAges(updated);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage("Por favor llena todos los campos de contacto.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Ingresa un número de teléfono o WhatsApp válido a 10 dígitos.");
      return;
    }
    if (!privacyConsent) {
      setErrorMessage("Debes aceptar el aviso de privacidad para continuar.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        target,
        titularAge,
        titularGender,
        partnerAge: target === "pareja" || target === "familia" ? partnerAge : undefined,
        partnerGender: target === "pareja" || target === "familia" ? partnerGender : undefined,
        childrenAges: target === "familia" ? childrenAges : undefined,
        zipCode,
        deductible: selectedDeductible,
      };

      const res = await fetch("/api/cotizador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Ocurrió un error al procesar la cotización.");
      }

      setCalculationResult(data.calculation);
      setStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateWhatsAppLink = (plan: CalculatedPlan) => {
    const cleanPhone = SITE_CONFIG.whatsapp;
    const priceText =
      paymentMode === "monthly"
        ? `$${plan.monthly12MSI.toLocaleString("es-MX")} MXN/mes (12 MSI)`
        : `$${plan.annualTotal.toLocaleString("es-MX")} MXN/año`;

    const text = `Hola Oscar, coticé en línea en *osanchezseguros.com* para *${detectedState.name}* (C.P. ${zipCode}):

🛡️ *Plan de Interés:* ${plan.name}
💰 *Presupuesto Estimado:* ${priceText}
🏥 *Deducible:* $${selectedDeductible.toLocaleString("es-MX")} MXN
👤 *Prospecto:* ${fullName}
📞 *Teléfono:* ${phone}
👥 *Integrantes:* ${calculationResult?.membersSummary || "1 persona"}

Me gustaría revisar los detalles y validar mi propuesta para contratación.`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-brand mb-2">
          <span className="uppercase tracking-wider">
            {step === 5 ? "Tus Resultados Oficiales" : `Paso ${step} de 4 · Cotizador Nacional`}
          </span>
          <span className="text-muted">{step === 5 ? "100%" : `${step * 25}%`}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 rounded-full"
            style={{ width: `${step === 5 ? 100 : step * 25}%` }}
          />
        </div>
      </div>

      {/* ===================== PASO 1: ¿A QUIÉN QUIERES PROTEGER? ===================== */}
      {step === 1 && (
        <div className="bg-surface rounded-3xl p-6 sm:p-10 shadow-xl border border-border animate-fade-in-up">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3.5 py-1.5 bg-brand/10 text-brand text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              Paso 1 de 4
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand tracking-tight">
              ¿A quién deseas <span className="text-accent">proteger?</span>
            </h2>
            <p className="text-muted mt-2 text-sm sm:text-base">
              Cotiza en menos de 2 minutos con acceso a los mejores hospitales de toda la República Mexicana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            {/* Opción 1: Solo a mí */}
            <button
              type="button"
              onClick={() => setTarget("solo")}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                target === "solo"
                  ? "border-accent bg-accent/5 shadow-md -translate-y-0.5"
                  : "border-border hover:border-brand/40 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-2xl shrink-0">
                🙋‍♂️
              </div>
              <div>
                <strong className="block text-brand text-base font-bold">Solo a mí</strong>
                <span className="text-xs text-muted">Cobertura médica individual</span>
              </div>
            </button>

            {/* Opción 2: Mi pareja y yo */}
            <button
              type="button"
              onClick={() => setTarget("pareja")}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                target === "pareja"
                  ? "border-accent bg-accent/5 shadow-md -translate-y-0.5"
                  : "border-border hover:border-brand/40 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-2xl shrink-0">
                💑
              </div>
              <div>
                <strong className="block text-brand text-base font-bold">Mi pareja y yo</strong>
                <span className="text-xs text-muted">2 adultos con tarifa conyugal</span>
              </div>
            </button>

            {/* Opción 3: Mi familia */}
            <button
              type="button"
              onClick={() => setTarget("familia")}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                target === "familia"
                  ? "border-accent bg-accent/5 shadow-md -translate-y-0.5"
                  : "border-border hover:border-brand/40 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-2xl shrink-0">
                👨‍👩‍👧‍👦
              </div>
              <div>
                <strong className="block text-brand text-base font-bold">Mi familia</strong>
                <span className="text-xs text-muted">Titular + pareja + hijos con descuento</span>
              </div>
            </button>

            {/* Opción 4: Mis papás o hijos */}
            <button
              type="button"
              onClick={() => setTarget("padres")}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                target === "padres"
                  ? "border-accent bg-accent/5 shadow-md -translate-y-0.5"
                  : "border-border hover:border-brand/40 bg-white"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-2xl shrink-0">
                👴
              </div>
              <div>
                <strong className="block text-brand text-base font-bold">Mis padres o terceros</strong>
                <span className="text-xs text-muted">Asegura a un familiar querido</span>
              </div>
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full sm:w-auto px-10 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              Continuar al Paso 2 →
            </button>
          </div>
        </div>
      )}

      {/* ===================== PASO 2: EDADES Y GÉNERO ===================== */}
      {step === 2 && (
        <div className="bg-surface rounded-3xl p-6 sm:p-10 shadow-xl border border-border animate-fade-in-up">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3.5 py-1.5 bg-brand/10 text-brand text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              Paso 2 de 4
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand tracking-tight">
              Edades y <span className="text-accent">Género</span>
            </h2>
            <p className="text-muted mt-2 text-sm sm:text-base">
              Las tarifas oficiales de Gastos Médicos Mayores se calculan con exactitud por grupo de edad.
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-6 mb-8">
            {/* Titular */}
            <div className="bg-background rounded-2xl p-5 border border-border">
              <label className="block text-xs font-bold text-brand uppercase tracking-wider mb-2">
                Titular de la Póliza
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1">Edad ({titularAge} años)</label>
                  <input
                    type="range"
                    min={18}
                    max={75}
                    value={titularAge}
                    onChange={(e) => setTitularAge(parseInt(e.target.value, 10))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted mt-1">
                    <span>18 años</span>
                    <span className="font-bold text-brand">{titularAge} años</span>
                    <span>75 años</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted mb-1">Sexo</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTitularGender("H")}
                      className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition-all ${
                        titularGender === "H"
                          ? "bg-brand text-white border-brand"
                          : "bg-white text-brand border-border hover:bg-gray-50"
                      }`}
                    >
                      Hombre 👨
                    </button>
                    <button
                      type="button"
                      onClick={() => setTitularGender("M")}
                      className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition-all ${
                        titularGender === "M"
                          ? "bg-brand text-white border-brand"
                          : "bg-white text-brand border-border hover:bg-gray-50"
                      }`}
                    >
                      Mujer 👩
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pareja (si aplica) */}
            {(target === "pareja" || target === "familia") && (
              <div className="bg-background rounded-2xl p-5 border border-border">
                <label className="block text-xs font-bold text-brand uppercase tracking-wider mb-2">
                  Cónyuge / Pareja
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted mb-1">Edad ({partnerAge} años)</label>
                    <input
                      type="range"
                      min={18}
                      max={75}
                      value={partnerAge}
                      onChange={(e) => setPartnerAge(parseInt(e.target.value, 10))}
                      className="w-full accent-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-muted mt-1">
                      <span>18 años</span>
                      <span className="font-bold text-brand">{partnerAge} años</span>
                      <span>75 años</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted mb-1">Sexo</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPartnerGender("H")}
                        className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition-all ${
                          partnerGender === "H"
                            ? "bg-brand text-white border-brand"
                            : "bg-white text-brand border-border hover:bg-gray-50"
                        }`}
                      >
                        Hombre 👨
                      </button>
                      <button
                        type="button"
                        onClick={() => setPartnerGender("M")}
                        className={`flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition-all ${
                          partnerGender === "M"
                            ? "bg-brand text-white border-brand"
                            : "bg-white text-brand border-border hover:bg-gray-50"
                        }`}
                      >
                        Mujer 👩
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hijos (si aplica) */}
            {target === "familia" && (
              <div className="bg-background rounded-2xl p-5 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-brand uppercase tracking-wider">
                    Hijos ({childrenAges.length})
                  </label>
                  {childrenAges.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddChild}
                      className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      + Agregar hijo/a
                    </button>
                  )}
                </div>

                {childrenAges.length === 0 ? (
                  <p className="text-xs text-muted">No has agregado hijos aún.</p>
                ) : (
                  <div className="space-y-3">
                    {childrenAges.map((age, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border">
                        <span className="text-xs font-bold text-brand w-16">Hijo #{idx + 1}:</span>
                        <input
                          type="number"
                          min={0}
                          max={25}
                          value={age}
                          onChange={(e) => handleChildAgeChange(idx, parseInt(e.target.value, 10) || 0)}
                          className="w-20 px-2 py-1 text-sm border border-border rounded-lg text-center font-bold text-brand"
                        />
                        <span className="text-xs text-muted">años</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveChild(idx)}
                          className="ml-auto text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1"
                        >
                          ✕ Quitar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-border text-brand font-semibold rounded-full hover:bg-gray-100 transition-all text-sm"
            >
              ← Regresar
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-10 py-3.5 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all duration-200 shadow-lg text-base"
            >
              Continuar al Paso 3 →
            </button>
          </div>
        </div>
      )}

      {/* ===================== PASO 3: CÓDIGO POSTAL Y COBERTURA NACIONAL ===================== */}
      {step === 3 && (
        <div className="bg-surface rounded-3xl p-6 sm:p-10 shadow-xl border border-border animate-fade-in-up">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3.5 py-1.5 bg-brand/10 text-brand text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              Paso 3 de 4 · Cobertura República Mexicana
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand tracking-tight">
              ¿En qué estado te <span className="text-accent">encuentras?</span>
            </h2>
            <p className="text-muted mt-2 text-sm sm:text-base">
              Ingresa tu Código Postal para asociar la red de hospitales privados de tu entidad y nivel nacional.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <label className="block text-xs font-bold text-brand uppercase tracking-wider mb-2">
              Código Postal (5 dígitos)
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={5}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                placeholder="Ej. 83205 o 01000"
                className="w-full px-5 py-4 text-xl tracking-widest text-brand font-bold bg-background border-2 border-border focus:border-brand rounded-2xl focus:outline-none transition-all shadow-inner text-center"
              />
            </div>

            {/* Badge de detección geográfica */}
            <div className="mt-5 p-4 rounded-2xl bg-brand/5 border border-brand/15">
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">📍</span>
                <div>
                  <strong className="block text-brand text-sm sm:text-base font-bold">
                    {detectedState.name}
                  </strong>
                  <span className="text-xs text-muted block">
                    {detectedState.zoneName} · Cobertura completa en toda la República
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-brand/10">
                <span className="text-[11px] font-bold text-brand uppercase tracking-wider block mb-1">
                  Red hospitalaria disponible en tu región:
                </span>
                <ul className="text-xs text-muted space-y-1">
                  {detectedState.topHospitals.map((hosp, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-accent font-bold">✓</span> {hosp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-border text-brand font-semibold rounded-full hover:bg-gray-100 transition-all text-sm"
            >
              ← Regresar
            </button>
            <button
              type="button"
              disabled={zipCode.length < 4}
              onClick={() => setStep(4)}
              className="px-10 py-3.5 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all duration-200 shadow-lg text-base disabled:opacity-50"
            >
              Continuar al Paso 4 →
            </button>
          </div>
        </div>
      )}

      {/* ===================== PASO 4: LEAD GATE / DESBLOQUEO ===================== */}
      {step === 4 && (
        <div className="bg-surface rounded-3xl p-6 sm:p-10 shadow-xl border border-border animate-fade-in-up">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3.5 py-1.5 bg-accent/10 text-accent text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              Paso Final · Desbloqueo Inmediato
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand tracking-tight">
              Desbloquea tus <span className="text-accent">3 Opciones Oficiales</span>
            </h2>
            <p className="text-muted mt-2 text-sm sm:text-base">
              Ingresa tus datos para calcular los costos oficiales en tiempo real y enviarte tu cotización detallada.
            </p>
          </div>

          <form onSubmit={handleSubmitLead} className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand uppercase tracking-wider mb-1">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Roberto Martínez Gómez"
                className="w-full px-4 py-3 bg-background border border-border focus:border-brand rounded-xl focus:outline-none text-brand text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand uppercase tracking-wider mb-1">
                Teléfono Celular / WhatsApp *
              </label>
              <input
                type="tel"
                required
                maxLength={15}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej. 662 182 2481"
                className="w-full px-4 py-3 bg-background border border-border focus:border-brand rounded-xl focus:outline-none text-brand text-sm"
              />
              <span className="text-[11px] text-muted block mt-1">
                Te enviaremos el resumen en PDF de tu cotización a este WhatsApp.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand uppercase tracking-wider mb-1">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="roberto@ejemplo.com"
                className="w-full px-4 py-3 bg-background border border-border focus:border-brand rounded-xl focus:outline-none text-brand text-sm"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted">
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-0.5 accent-accent w-4 h-4 rounded"
                />
                <span>
                  Acepto el{" "}
                  <Link href="/aviso-privacidad" target="_blank" className="text-brand font-semibold underline">
                    Aviso de Privacidad
                  </Link>{" "}
                  y autorizo el envío de mi cotización médica.
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all duration-200 shadow-xl text-base disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Calculando tarifas oficiales...
                  </>
                ) : (
                  <>Ver Mis Opciones Oficiales →</>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs text-muted hover:text-brand transition-colors text-center py-2"
              >
                ← Volver al paso anterior
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================== PASO 5: RESULTADOS COMPARATIVOS OFICIALES ===================== */}
      {step === 5 && calculationResult && (
        <div className="animate-fade-in-up space-y-8">
          {/* Header de resultados */}
          <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xl border border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 mb-2">
                  ✓ Cotización Actuarial Calculada
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand">
                  Propuesta para {fullName}
                </h2>
                <p className="text-sm text-muted mt-1">
                  Ubicación: <strong className="text-brand">{calculationResult.state.name}</strong> ·{" "}
                  {calculationResult.membersSummary}
                </p>
              </div>

              {/* Selector de Forma de Pago */}
              <div className="flex items-center bg-background p-1.5 rounded-2xl border border-border self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setPaymentMode("monthly")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    paymentMode === "monthly"
                      ? "bg-brand text-white shadow-md"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  Hasta 12 MSI 💳
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode("annual")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    paymentMode === "annual"
                      ? "bg-brand text-white shadow-md"
                      : "text-muted hover:text-brand"
                  }`}
                >
                  Pago Anual
                </button>
              </div>
            </div>

            {/* Ajuste de Deducible interactivo */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-brand uppercase tracking-wider">
                Ajustar Deducible:
              </span>
              {[15000, 25000, 35000, 50000].map((ded) => (
                <button
                  key={ded}
                  type="button"
                  onClick={() => setSelectedDeductible(ded)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedDeductible === ded
                      ? "bg-accent text-white shadow-sm"
                      : "bg-background border border-border text-muted hover:text-brand hover:border-brand/40"
                  }`}
                >
                  ${ded.toLocaleString("es-MX")} MXN
                </button>
              ))}
              <span className="text-[11px] text-muted italic ml-auto hidden sm:inline">
                * Coaseguro 10% con tope de $64,000 MXN en todos los planes.
              </span>
            </div>
          </div>

          {/* Grid de las 3 tarjetas de planes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {activePlans.map((plan) => {
              const isRec = plan.isRecommended;
              const waLink = generateWhatsAppLink(plan);

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-3xl bg-surface p-6 sm:p-7 transition-all duration-300 ${
                    isRec
                      ? "border-2 border-accent shadow-2xl lg:-translate-y-2 ring-4 ring-accent/10"
                      : "border border-border shadow-lg hover:shadow-xl hover:border-brand/30"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span
                        className={`px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm text-white ${
                          isRec ? "bg-accent" : "bg-brand"
                        }`}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Header del Plan */}
                    <div className="text-center mt-2 mb-4">
                      <span className="text-xs font-bold text-muted uppercase tracking-wider">
                        {plan.insurer}
                      </span>
                      <h3 className="font-display text-xl font-bold text-brand mt-1">
                        {plan.name.replace("AXA Flex Plus ", "")}
                      </h3>
                      <p className="text-xs text-muted mt-1 leading-snug">{plan.tagline}</p>
                    </div>

                    {/* Precio */}
                    <div className="bg-background rounded-2xl p-4 text-center my-4 border border-border">
                      <span className="text-[11px] font-bold text-muted uppercase block">
                        {paymentMode === "monthly" ? "Desde (12 Meses Sin Intereses)" : "Costo Anual Total"}
                      </span>
                      <div className="font-display text-3xl font-extrabold text-brand mt-1">
                        ${(paymentMode === "monthly" ? plan.monthly12MSI : plan.annualTotal).toLocaleString("es-MX")}
                        <span className="text-sm font-semibold text-muted">
                          {paymentMode === "monthly" ? " MXN/mes" : " MXN"}
                        </span>
                      </div>
                      {paymentMode === "monthly" && (
                        <span className="text-[11px] text-muted block mt-1">
                          Equivalente a ${plan.annualTotal.toLocaleString("es-MX")} MXN anual
                        </span>
                      )}
                    </div>

                    {/* Especificaciones clave */}
                    <div className="space-y-2 text-xs py-2 border-y border-border my-4">
                      <div className="flex justify-between">
                        <span className="text-muted">Suma Asegurada:</span>
                        <strong className="text-brand font-bold">{plan.insuredSum}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Deducible:</span>
                        <strong className="text-brand font-bold">
                          ${selectedDeductible.toLocaleString("es-MX")} MXN
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Coaseguro:</span>
                        <strong className="text-brand font-bold">10% (Tope $64,000)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Gama Hospitalaria:</span>
                        <strong className="text-brand font-bold">{plan.hospitalLevel}</strong>
                      </div>
                    </div>

                    {/* Beneficios */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold text-brand uppercase tracking-wider block">
                        Beneficios incluidos:
                      </span>
                      {plan.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                          <span className="text-accent font-bold">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botón WhatsApp */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 px-4 rounded-full font-bold text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg ${
                        isRec
                          ? "bg-accent text-white hover:bg-accent-dark hover:-translate-y-0.5"
                          : "bg-brand text-white hover:bg-brand-light"
                      }`}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                      Solicitar este Plan por WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner de confianza y contacto directo */}
          <div className="bg-brand text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl shrink-0">
                🛡️
              </div>
              <div>
                <h4 className="font-display text-xl font-bold">
                  ¿Deseas personalizar coberturas para tu familia?
                </h4>
                <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl">
                  Oscar Sánchez cuenta con más de 16 años de experiencia y cédula CNSF. Te asesoramos sin costo para adecuar el deducible, sumar ayuda de maternidad o comparar con GNP y otras aseguradoras.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all text-xs sm:text-sm text-center shadow-lg"
              >
                Hablar con Oscar Sánchez
              </a>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all text-xs sm:text-sm text-center border border-white/20"
              >
                Nueva Cotización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
