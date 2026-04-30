"use client";
import { useState, useEffect, useCallback } from "react";
import { updateLeadStatus, addLeadHistoryEntry, getLeadHistory } from "@/lib/firebase/firestore";

type Lead = {
  id: string;
  fullName?: string;
  name?: string;
  email: string;
  phone: string;
  insuranceType?: string;
  interest?: string;
  status: string;
  source?: string;
  birthDate?: string;
  gender?: string;
  zipCode?: string;
  message?: string;
  notes?: string;
  createdAt: any;
};

type HistoryEntry = {
  id: string;
  type: string;
  note: string;
  createdAt: any;
};

const STATUS_OPTIONS = [
  { value: "new", label: "Nuevo", color: "bg-green-50 text-green-700 border-green-200" },
  { value: "contacted", label: "Contactado", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "qualified", label: "Calificado", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "proposal", label: "Propuesta", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "negotiation", label: "Negociación", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { value: "won", label: "Ganado", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "lost", label: "Perdido", color: "bg-red-50 text-red-700 border-red-200" },
  { value: "archived", label: "Archivado", color: "bg-neutral-100 text-neutral-600 border-neutral-200" },
];

const NOTE_TYPES = [
  { value: "call", label: "📞 Llamada", icon: "📞" },
  { value: "whatsapp", label: "💬 WhatsApp", icon: "💬" },
  { value: "email", label: "📧 Email", icon: "📧" },
  { value: "quote", label: "📋 Cotización", icon: "📋" },
  { value: "note", label: "📝 Nota", icon: "📝" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onUpdated: () => void;
};

export default function LeadDetailDrawer({ isOpen, onClose, lead, onUpdated }: Props) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState("note");
  const [savingNote, setSavingNote] = useState(false);
  const [changingStatus, setChangingStatus] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!lead) return;
    setLoadingHistory(true);
    try {
      const entries = await getLeadHistory(lead.id);
      setHistory(entries as HistoryEntry[]);
    } catch (err) {
      console.error("Error loading history:", err);
    } finally {
      setLoadingHistory(false);
    }
  }, [lead]);

  useEffect(() => {
    if (isOpen && lead) {
      fetchHistory();
      setNewNote("");
      setNoteType("note");
    }
  }, [isOpen, lead, fetchHistory]);

  if (!isOpen || !lead) return null;

  const displayName = lead.fullName || lead.name || "Sin nombre";

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim() || !lead) return;
    setSavingNote(true);
    try {
      await addLeadHistoryEntry(lead.id, {
        type: noteType as any,
        note: newNote.trim(),
      });
      setNewNote("");
      await fetchHistory();
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setSavingNote(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    if (!lead) return;
    setChangingStatus(true);
    try {
      await updateLeadStatus(lead.id, newStatus);
      await fetchHistory();
      onUpdated();
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setChangingStatus(false);
    }
  }

  function getTypeIcon(type: string) {
    const found = NOTE_TYPES.find(t => t.value === type);
    return found?.icon || "📝";
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface w-full max-w-lg shadow-2xl animate-slide-in-right flex flex-col h-full overflow-hidden" style={{ animation: "slideInRight 0.3s ease-out" }}>
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between flex-shrink-0 bg-brand/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-display font-bold text-brand text-sm">{displayName}</h2>
              <p className="text-xs text-muted">{lead.phone}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-brand/5 flex items-center justify-center text-muted hover:text-brand transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Info Section */}
          <div className="p-5 border-b border-border space-y-3">
            <h3 className="text-xs font-bold text-brand uppercase tracking-wider">Información</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted text-xs">Email</span><p className="font-medium text-brand truncate">{lead.email}</p></div>
              <div><span className="text-muted text-xs">Interés</span><p className="font-medium text-brand">{lead.insuranceType || lead.interest || "—"}</p></div>
              {lead.source && <div><span className="text-muted text-xs">Fuente</span><p className="font-medium text-brand">{lead.source}</p></div>}
              {lead.zipCode && <div><span className="text-muted text-xs">C.P.</span><p className="font-medium text-brand">{lead.zipCode}</p></div>}
              {lead.birthDate && <div><span className="text-muted text-xs">Nacimiento</span><p className="font-medium text-brand">{lead.birthDate}</p></div>}
              {lead.gender && <div><span className="text-muted text-xs">Sexo</span><p className="font-medium text-brand">{lead.gender}</p></div>}
            </div>
            {lead.message && (
              <div><span className="text-muted text-xs">Mensaje</span><p className="text-sm text-brand bg-brand/[0.03] rounded-lg p-3 mt-1">{lead.message}</p></div>
            )}
            {/* Quick Actions */}
            <div className="flex gap-2 pt-2">
              <a href={`https://wa.me/52${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${displayName}, soy Oscar de O Sanchez Seguros. Gracias por tu interés.`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#25D366]/10 text-[#25D366] rounded-lg text-xs font-bold hover:bg-[#25D366]/20 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href={`mailto:${lead.email}?subject=${encodeURIComponent("Cotización O Sanchez Seguros")}`} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-brand/5 text-brand rounded-lg text-xs font-bold hover:bg-brand/10 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email
              </a>
            </div>
          </div>

          {/* Status Change */}
          <div className="p-5 border-b border-border">
            <h3 className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Cambiar Estatus</h3>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s.value}
                  onClick={() => handleStatusChange(s.value)}
                  disabled={changingStatus || lead.status === s.value}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${lead.status === s.value ? `${s.color} ring-2 ring-offset-1 ring-brand/20` : "bg-white border-border text-muted hover:border-brand/30"} disabled:opacity-50`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add Note */}
          <div className="p-5 border-b border-border">
            <h3 className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Agregar Nota</h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="flex gap-2">
                {NOTE_TYPES.map(t => (
                  <button key={t.value} type="button" onClick={() => setNoteType(t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${noteType === t.value ? "bg-brand text-white border-brand" : "bg-white border-border text-muted hover:border-brand/30"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              <textarea value={newNote} onChange={e => setNewNote(e.target.value)} rows={2} placeholder="Escribe una nota..." className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated text-brand text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none" />
              <button type="submit" disabled={!newNote.trim() || savingNote} className="px-5 py-2 bg-brand text-white rounded-lg text-sm font-bold hover:bg-brand-light transition-all disabled:opacity-50 flex items-center gap-2">
                {savingNote ? "Guardando..." : "Guardar Nota"}
              </button>
            </form>
          </div>

          {/* History Timeline */}
          <div className="p-5">
            <h3 className="text-xs font-bold text-brand uppercase tracking-wider mb-4">Historial de Actividad</h3>
            {loadingHistory ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
              </div>
            ) : history.length === 0 ? (
              <p className="text-sm text-muted text-center py-6">Sin actividad registrada</p>
            ) : (
              <div className="space-y-0">
                {history.map((entry, i) => (
                  <div key={entry.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-brand/5 flex items-center justify-center text-sm flex-shrink-0">
                        {getTypeIcon(entry.type)}
                      </div>
                      {i < history.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                    </div>
                    <div className="pb-4 flex-1 min-w-0">
                      <p className="text-sm text-brand font-medium">{entry.note}</p>
                      <p className="text-[11px] text-muted mt-1">
                        {entry.createdAt?.seconds
                          ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString("es-MX", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
                          : "Ahora"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
