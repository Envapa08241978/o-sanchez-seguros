"use client";
import { useState } from "react";

const INSURANCE_OPTIONS = [
  { value: "vida", label: "Seguros de Vida" },
  { value: "gmm", label: "Gastos Médicos Mayores" },
  { value: "auto", label: "Seguros de Auto" },
  { value: "vida-ahorro", label: "Vida con Ahorro" },
  { value: "empresarial", label: "Seguros Empresariales" },
  { value: "fronterizo", label: "Seguros Fronterizos" },
  { value: "otro", label: "Otro" },
];

const SOURCE_OPTIONS = [
  { value: "referral", label: "Referido" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Teléfono" },
  { value: "social_media", label: "Redes Sociales" },
  { value: "walk_in", label: "Visita en persona" },
  { value: "google_ads", label: "Google Ads" },
  { value: "meta_ads", label: "Meta Ads" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function NewLeadModal({ isOpen, onClose, onCreated }: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const data = {
      fullName: fd.get("fullName") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      insuranceType: fd.get("insuranceType") as string,
      source: fd.get("source") as string,
      notes: fd.get("notes") as string,
    };
    try {
      const { createManualLead } = await import("@/lib/firebase/firestore");
      await createManualLead(data);
      onCreated();
      onClose();
    } catch {
      setError("Error al crear lead. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-lg animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-brand">Nuevo Lead Manual</h2>
            <p className="text-xs text-muted mt-1">Agrega un prospecto que no proviene de la web</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-brand/5 flex items-center justify-center text-muted hover:text-brand transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-brand mb-1.5">Nombre completo *</label>
            <input name="fullName" required placeholder="Nombre del prospecto" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand mb-1.5">Teléfono *</label>
              <input name="phone" required placeholder="662 000 0000" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand mb-1.5">Email *</label>
              <input name="email" type="email" required placeholder="email@ejemplo.com" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand mb-1.5">Tipo de seguro *</label>
              <select name="insuranceType" required className={inputClass}>
                <option value="">Selecciona...</option>
                {INSURANCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand mb-1.5">Fuente *</label>
              <select name="source" required className={inputClass}>
                <option value="">Selecciona...</option>
                {SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand mb-1.5">Notas (opcional)</label>
            <textarea name="notes" rows={3} placeholder="Contexto adicional sobre el prospecto..." className={`${inputClass} resize-none`} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-semibold text-muted hover:bg-brand/5 transition-all">Cancelar</button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-light transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {saving ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Guardando...</> : "Crear Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
