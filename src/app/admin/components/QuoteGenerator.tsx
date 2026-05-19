"use client";

import { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import QuotePDFTemplate from "./QuotePDFTemplate";
import type { QuoteMember, QuoteSection } from "@/lib/firebase/firestore";

// ── Plan type definitions ──
const PLAN_TYPES = [
  { value: "gmm", label: "Gastos Médicos Mayores", icon: "🏥" },
  { value: "ahorro", label: "Plan de Ahorro", icon: "📈" },
  { value: "vida", label: "Seguro de Vida", icon: "❤️" },
  { value: "auto", label: "Seguro de Auto", icon: "🚗" },
  { value: "empresarial", label: "Empresarial", icon: "🏢" },
  { value: "fronterizo", label: "Fronterizo", icon: "🌎" },
  { value: "personalizado", label: "Personalizado", icon: "⚙️" },
];

const PLAN_FIELDS: Record<string, { key: string; label: string; highlight?: boolean }[]> = {
  gmm: [
    { key: "sumaAsegurada", label: "Suma Asegurada" },
    { key: "gamaHospitalaria", label: "Gama Hospitalaria" },
    { key: "deducible", label: "Deducible" },
    { key: "ceroDeducible", label: "Cero Deducible" },
    { key: "redHospitalaria", label: "Red Hospitalaria" },
    { key: "coberturasEspeciales", label: "Coberturas Especiales" },
    { key: "internacional", label: "Internacional" },
    { key: "costo", label: "Costo Anual", highlight: true },
    { key: "descuentoFamiliar", label: "Descuento Familiar" },
    { key: "costoTotal", label: "Costo Total", highlight: true },
  ],
  ahorro: [
    { key: "sumaAsegurada", label: "Suma Asegurada" },
    { key: "ahorroBuscado", label: "Ahorro Buscado" },
    { key: "inversionAnual", label: "Inversión Anual", highlight: true },
    { key: "ahorroAnio10", label: "Ahorro al Año 10" },
    { key: "ahorroAnio15", label: "Ahorro al Año 15" },
    { key: "ahorroAnio20", label: "Ahorro al Año 20" },
    { key: "recompensasPaquete", label: "Recompensas Paquete" },
    { key: "recompensaEconomica", label: "Recompensa Económica" },
    { key: "indemnizacionSupervivencia", label: "Indemnización por Supervivencia" },
  ],
  vida: [
    { key: "sumaAsegurada", label: "Suma Asegurada" },
    { key: "primaAnual", label: "Prima Anual", highlight: true },
    { key: "beneficiarios", label: "Beneficiarios" },
    { key: "coberturasAdicionales", label: "Coberturas Adicionales" },
    { key: "costoTotal", label: "Costo Total", highlight: true },
  ],
  auto: [
    { key: "vehiculo", label: "Vehículo" },
    { key: "modeloAnio", label: "Modelo / Año" },
    { key: "cobertura", label: "Cobertura" },
    { key: "deducible", label: "Deducible" },
    { key: "prima", label: "Prima", highlight: true },
    { key: "asistenciaVial", label: "Asistencia Vial" },
  ],
  empresarial: [
    { key: "tipoCobertura", label: "Tipo de Cobertura" },
    { key: "numEmpleados", label: "No. de Empleados" },
    { key: "sumaAsegurada", label: "Suma Asegurada" },
    { key: "prima", label: "Prima", highlight: true },
    { key: "coberturas", label: "Coberturas" },
  ],
  fronterizo: [
    { key: "paisCobertura", label: "País de Cobertura" },
    { key: "vigencia", label: "Vigencia" },
    { key: "tipoCobertura", label: "Tipo de Cobertura" },
    { key: "prima", label: "Prima", highlight: true },
  ],
  personalizado: [],
};

const RELATIONSHIPS = ["Titular", "Cónyuge", "Hijo", "Hija", "Padre", "Madre", "Otro"];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  prefillName?: string;
  prefillPhone?: string;
  prefillEmail?: string;
};

export default function QuoteGenerator({ isOpen, onClose, onCreated, prefillName, prefillPhone, prefillEmail }: Props) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Client data
  const [clientName, setClientName] = useState(prefillName || "");
  const [clientPhone, setClientPhone] = useState(prefillPhone || "");
  const [clientEmail, setClientEmail] = useState(prefillEmail || "");
  const [members, setMembers] = useState<QuoteMember[]>([
    { gender: "H", age: 38, relationship: "Titular" },
  ]);

  // Step 2: Sections
  const [sections, setSections] = useState<QuoteSection[]>([]);
  const [showPlanPicker, setShowPlanPicker] = useState(false);

  // Step 3: Final message
  const [finalMessage, setFinalMessage] = useState("");

  // Success state after generation
  const [generatedQuoteNumber, setGeneratedQuoteNumber] = useState("");
  const [generatedBlobUrl, setGeneratedBlobUrl] = useState("");

  // Sync prefill props when drawer opens
  useEffect(() => {
    if (isOpen) {
      setClientName(prefillName || "");
      setClientPhone(prefillPhone || "");
      setClientEmail(prefillEmail || "");
      setStep(1);
      setError("");
      setGeneratedQuoteNumber("");
      setGeneratedBlobUrl("");
      setSections([]);
      setFinalMessage("");
      setMembers([{ gender: "H", age: 38, relationship: "Titular" }]);
    }
  }, [isOpen, prefillName, prefillPhone, prefillEmail]);

  if (!isOpen) return null;

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-border bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all";
  const btnPrimary = "px-5 py-2.5 bg-brand text-white text-sm font-bold rounded-xl hover:bg-brand-light transition-all shadow-md disabled:opacity-50";
  const btnSecondary = "px-5 py-2.5 border border-border text-muted text-sm font-semibold rounded-xl hover:bg-brand/5 transition-all";

  // ── Member helpers ──
  function addMember() {
    setMembers([...members, { gender: "H", age: 18, relationship: "Hijo" }]);
  }
  function removeMember(idx: number) {
    if (members.length <= 1) return;
    const updated = members.filter((_, i) => i !== idx);
    // Also update sections that reference this member
    setSections(sections.map(s => ({
      ...s,
      memberIndices: s.memberIndices.filter(mi => mi !== idx).map(mi => mi > idx ? mi - 1 : mi),
    })));
    setMembers(updated);
  }
  function updateMember(idx: number, field: keyof QuoteMember, value: any) {
    const updated = [...members];
    updated[idx] = { ...updated[idx], [field]: value };
    setMembers(updated);
  }

  // ── Section helpers ──
  function addSection(type: string) {
    const planType = PLAN_TYPES.find(p => p.value === type);
    const fields: Record<string, string> = {};
    const defs = PLAN_FIELDS[type] || [];
    defs.forEach(f => { fields[f.key] = ""; });

    setSections([...sections, {
      type,
      title: planType?.label || "Plan",
      memberIndices: members.map((_, i) => i),
      fields,
    }]);
    setShowPlanPicker(false);
  }
  function removeSection(idx: number) {
    setSections(sections.filter((_, i) => i !== idx));
  }
  function updateSectionField(sIdx: number, key: string, value: string) {
    const updated = [...sections];
    updated[sIdx] = { ...updated[sIdx], fields: { ...updated[sIdx].fields, [key]: value } };
    setSections(updated);
  }
  function updateSectionTitle(sIdx: number, title: string) {
    const updated = [...sections];
    updated[sIdx] = { ...updated[sIdx], title };
    setSections(updated);
  }
  function toggleMemberInSection(sIdx: number, mIdx: number) {
    const updated = [...sections];
    const current = updated[sIdx].memberIndices;
    if (current.includes(mIdx)) {
      updated[sIdx] = { ...updated[sIdx], memberIndices: current.filter(i => i !== mIdx) };
    } else {
      updated[sIdx] = { ...updated[sIdx], memberIndices: [...current, mIdx].sort() };
    }
    setSections(updated);
  }

  // ── Generate PDF ──
  async function handleGenerate() {
    setSaving(true);
    setError("");
    try {
      const { createQuote } = await import("@/lib/firebase/firestore");
      const result = await createQuote({
        clientName, clientPhone, clientEmail,
        members, sections, finalMessage,
      });

      // Generate PDF blob with explicit MIME type
      const rawBlob = await pdf(
        <QuotePDFTemplate
          quoteNumber={result.quoteNumber}
          clientName={clientName}
          members={members}
          sections={sections}
          finalMessage={finalMessage}
        />
      ).toBlob();

      // Ensure PDF MIME type
      const pdfBlob = new Blob([rawBlob], { type: "application/pdf" });
      const fileName = `${result.quoteNumber} - ${clientName}.pdf`;

      // Download
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      // Small delay before cleanup to ensure download starts
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);

      // Keep blob URL for re-download, store success state
      setGeneratedQuoteNumber(result.quoteNumber);
      setGeneratedBlobUrl(url);
      setStep(4); // Success step
      onCreated();
    } catch (err: any) {
      console.error("Error generating quote:", err);
      setError("Error al generar la cotización. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  // ── WhatsApp share ──
  function handleWhatsAppShare() {
    const phone = clientPhone.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Hola ${clientName}, soy Oscar de O Sanchez Seguros.\n\n` +
      `Le comparto su propuesta de protección integral *Blindaje Familiar 360°* (${generatedQuoteNumber}).\n\n` +
      `Quedo a sus órdenes para resolver cualquier duda. 🛡️`
    );
    window.open(`https://wa.me/52${phone}?text=${msg}`, "_blank");
  }

  // ── Re-download PDF ──
  function handleRedownload() {
    if (!generatedBlobUrl) return;
    const a = document.createElement("a");
    a.href = generatedBlobUrl;
    a.download = `${generatedQuoteNumber} - ${clientName}.pdf`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 100);
  }

  // ── Validation ──
  const canGoStep2 = clientName.trim() && members.length > 0;
  const canGoStep3 = sections.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-2xl shadow-2xl flex flex-col h-full overflow-hidden" style={{ animation: "slideInRight 0.3s ease-out" }}>

        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between flex-shrink-0 bg-brand/[0.02]">
          <div>
            <h2 className="font-display font-bold text-brand text-lg flex items-center gap-2">
              {step === 4 ? "✅" : "📄"} {step === 4 ? "Presentación Generada" : "Nueva Presentación"}
            </h2>
            <p className="text-xs text-muted mt-0.5">{step === 4 ? `Cotización ${generatedQuoteNumber} lista` : `Paso ${step} de 3 — ${step === 1 ? "Datos e Integrantes" : step === 2 ? "Planes de Protección" : "Mensaje Final y Generar"}`}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-brand/5 flex items-center justify-center text-muted hover:text-brand transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Progress bar */}
        {step < 4 && (
          <div className="flex gap-1 px-5 pt-3">
            {[1, 2, 3].map(n => (
              <div key={n} className={`flex-1 h-1.5 rounded-full transition-all ${n <= step ? "bg-brand" : "bg-border"}`} />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">{error}</div>}

          {/* ═══ STEP 1: Client + Members ═══ */}
          {step === 1 && (
            <>
              <div>
                <h3 className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Datos del Cliente</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-brand mb-1">Nombre del cliente / familia *</label>
                    <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Ej: Familia Pérez García" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-brand mb-1">Teléfono</label>
                      <input value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="662 000 0000" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand mb-1">Email</label>
                      <input value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="email@ejemplo.com" className={inputCls} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-brand uppercase tracking-wider">Integrantes ({members.length})</h3>
                  <button onClick={addMember} className="text-xs font-bold text-accent hover:text-accent-dark flex items-center gap-1 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Agregar
                  </button>
                </div>
                <div className="space-y-2">
                  {members.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-brand/[0.02] rounded-xl border border-border">
                      <select value={m.gender} onChange={e => updateMember(i, "gender", e.target.value)} className="px-2 py-1.5 rounded-lg border border-border bg-white text-sm font-bold text-brand w-16">
                        <option value="H">H</option>
                        <option value="M">M</option>
                      </select>
                      <input type="number" value={m.age} onChange={e => updateMember(i, "age", parseInt(e.target.value) || 0)} className="w-16 px-2 py-1.5 rounded-lg border border-border bg-white text-sm text-center text-brand" min={0} max={99} />
                      <select value={m.relationship} onChange={e => updateMember(i, "relationship", e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-border bg-white text-sm text-brand">
                        {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <span className="text-xs text-muted font-mono bg-brand/5 px-2 py-1 rounded">{m.gender}{m.age}</span>
                      {members.length > 1 && (
                        <button onClick={() => removeMember(i)} className="w-7 h-7 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-all">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted mt-2">Notación auto: {members.map(m => `${m.gender}${m.age}`).join(", ")}</p>
              </div>
            </>
          )}

          {/* ═══ STEP 2: Plans ═══ */}
          {step === 2 && (
            <>
              {sections.map((section, sIdx) => {
                const fieldDefs = PLAN_FIELDS[section.type] || [];
                return (
                  <div key={sIdx} className="bg-brand/[0.02] rounded-2xl border border-border overflow-hidden">
                    <div className="p-4 bg-brand/[0.04] border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{PLAN_TYPES.find(p => p.value === section.type)?.icon}</span>
                        <input value={section.title} onChange={e => updateSectionTitle(sIdx, e.target.value)} className="font-bold text-brand text-sm bg-transparent border-none focus:outline-none focus:ring-0 w-full" />
                      </div>
                      <button onClick={() => removeSection(sIdx)} className="text-xs text-red-400 hover:text-red-600 font-bold transition-colors">Eliminar</button>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Member selector */}
                      <div>
                        <label className="block text-xs font-bold text-brand mb-2">Integrantes en este plan:</label>
                        <div className="flex flex-wrap gap-1.5">
                          {members.map((m, mIdx) => (
                            <button key={mIdx} onClick={() => toggleMemberInSection(sIdx, mIdx)} className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${section.memberIndices.includes(mIdx) ? "bg-brand text-white border-brand" : "bg-white text-muted border-border hover:border-brand/30"}`}>
                              {m.gender}{m.age}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Field inputs */}
                      {section.type === "personalizado" ? (
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-brand">Campos personalizados:</label>
                          {Object.entries(section.fields).map(([key, val]) => (
                            <div key={key} className="flex gap-2">
                              <input value={key} onChange={e => {
                                const updated = { ...section.fields };
                                const v = updated[key];
                                delete updated[key];
                                updated[e.target.value] = v;
                                const us = [...sections];
                                us[sIdx] = { ...us[sIdx], fields: updated };
                                setSections(us);
                              }} placeholder="Campo" className={`${inputCls} flex-1`} />
                              <input value={val} onChange={e => updateSectionField(sIdx, key, e.target.value)} placeholder="Valor" className={`${inputCls} flex-1`} />
                            </div>
                          ))}
                          <button onClick={() => {
                            const k = `campo${Object.keys(section.fields).length + 1}`;
                            updateSectionField(sIdx, k, "");
                          }} className="text-xs font-bold text-accent hover:text-accent-dark">+ Agregar campo</button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {fieldDefs.map(f => (
                            <div key={f.key}>
                              <label className="block text-xs font-medium text-brand mb-1">{f.label}</label>
                              <input value={section.fields[f.key] || ""} onChange={e => updateSectionField(sIdx, f.key, e.target.value)} placeholder={f.label} className={inputCls} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Add plan button */}
              {!showPlanPicker ? (
                <button onClick={() => setShowPlanPicker(true)} className="w-full p-4 border-2 border-dashed border-brand/20 rounded-2xl text-brand font-bold text-sm hover:border-brand/40 hover:bg-brand/[0.02] transition-all flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Agregar Plan de Protección
                </button>
              ) : (
                <div className="bg-surface rounded-2xl border border-border p-4">
                  <h4 className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Selecciona tipo de plan</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {PLAN_TYPES.map(pt => (
                      <button key={pt.value} onClick={() => addSection(pt.value)} className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-brand/30 hover:bg-brand/[0.02] transition-all text-left">
                        <span className="text-xl">{pt.icon}</span>
                        <span className="text-sm font-semibold text-brand">{pt.label}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setShowPlanPicker(false)} className="mt-3 text-xs text-muted hover:text-brand transition-colors">Cancelar</button>
                </div>
              )}
            </>
          )}

          {/* ═══ STEP 3: Final + Generate ═══ */}
          {step === 3 && (
            <>
              {/* Summary */}
              <div className="bg-brand/[0.03] rounded-2xl p-5 border border-border space-y-3">
                <h3 className="text-xs font-bold text-brand uppercase tracking-wider">Resumen de la Presentación</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted text-xs">Cliente</span><p className="font-bold text-brand">{clientName}</p></div>
                  <div><span className="text-muted text-xs">Integrantes</span><p className="font-bold text-brand">{members.length}</p></div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {members.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 bg-brand text-white rounded-full text-xs font-bold">{m.gender}{m.age} — {m.relationship}</span>
                  ))}
                </div>
                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <p className="text-xs font-bold text-brand uppercase tracking-wider">Planes incluidos ({sections.length})</p>
                  {sections.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span>{PLAN_TYPES.find(p => p.value === s.type)?.icon}</span>
                      <span className="font-semibold text-brand">{s.title}</span>
                      <span className="text-muted text-xs">· {s.memberIndices.length} integrantes</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final message */}
              <div>
                <label className="block text-sm font-medium text-brand mb-2">Mensaje final personalizado</label>
                <textarea value={finalMessage} onChange={e => setFinalMessage(e.target.value)} rows={4} placeholder={`Estimado(a) ${clientName}, esta propuesta ha sido diseñada especialmente para cubrir las necesidades de protección integral de su familia...`} className={`${inputCls} resize-none`} />
                <p className="text-xs text-muted mt-1">Opcional. Si se deja vacío, se usará un mensaje genérico.</p>
              </div>
            </>
          )}

          {/* ═══ STEP 4: Success ═══ */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-brand">¡Presentación generada exitosamente!</h3>
                <p className="text-sm text-muted mt-1">Cotización <span className="font-mono font-bold">{generatedQuoteNumber}</span></p>
                <p className="text-sm text-muted">Cliente: <span className="font-semibold">{clientName}</span></p>
              </div>

              <div className="w-full space-y-3 max-w-sm">
                {/* Re-download button */}
                <button onClick={handleRedownload} className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-brand text-white text-sm font-bold rounded-xl hover:bg-brand-light transition-all shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Descargar PDF otra vez
                </button>

                {/* WhatsApp button */}
                {clientPhone && (
                  <button onClick={handleWhatsAppShare} className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#1da851] transition-all shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    Enviar por WhatsApp
                  </button>
                )}

                {/* Close */}
                <button onClick={onClose} className="w-full px-5 py-3 border border-border text-muted text-sm font-semibold rounded-xl hover:bg-brand/5 transition-all">
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer navigation */}
        {step < 4 && (
          <div className="p-5 border-t border-border flex items-center justify-between flex-shrink-0 bg-brand/[0.01]">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className={btnSecondary}>← Anterior</button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} disabled={step === 1 ? !canGoStep2 : !canGoStep3} className={btnPrimary}>
                Siguiente →
              </button>
            ) : (
              <button onClick={handleGenerate} disabled={saving} className={`${btnPrimary} flex items-center gap-2`}>
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Generando...</>
                ) : (
                  <>📄 Generar y Descargar PDF</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
