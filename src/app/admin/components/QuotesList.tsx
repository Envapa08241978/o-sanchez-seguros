"use client";

import { useState, useEffect, useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import QuotePDFTemplate from "./QuotePDFTemplate";

type Quote = {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  members: any[];
  sections: any[];
  finalMessage: string;
  status: string;
  createdAt: any;
};

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  draft: { label: "BORRADOR", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  sent: { label: "ENVIADA", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  accepted: { label: "ACEPTADA", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  expired: { label: "EXPIRADA", cls: "bg-neutral-100 text-neutral-600 border-neutral-200" },
};

type Props = {
  isOpen: boolean;
  onRefresh?: () => void;
  onEditQuote?: (quote: Quote) => void;
};

export default function QuotesList({ isOpen, onRefresh, onEditQuote }: Props) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [sharing, setSharing] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const { getQuotes } = await import("@/lib/firebase/firestore");
      const data = await getQuotes();
      setQuotes(data as Quote[]);
    } catch (err) {
      console.error("Error loading quotes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchQuotes();
  }, [isOpen, fetchQuotes]);

  async function generatePdfBlob(quote: Quote) {
    const rawBlob = await pdf(
      <QuotePDFTemplate
        quoteNumber={quote.quoteNumber}
        clientName={quote.clientName}
        members={quote.members}
        sections={quote.sections}
        finalMessage={quote.finalMessage}
      />
    ).toBlob();
    return new Blob([rawBlob], { type: "application/pdf" });
  }

  async function handleRedownload(quote: Quote) {
    setDownloading(quote.id);
    try {
      const pdfBlob = await generatePdfBlob(quote);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${quote.quoteNumber} - ${quote.clientName}.pdf`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 200);
    } catch (err) {
      console.error("Error downloading PDF:", err);
    } finally {
      setDownloading(null);
    }
  }

  async function handleWhatsApp(quote: Quote) {
    setSharing(quote.id);
    try {
      const pdfBlob = await generatePdfBlob(quote);
      const fileName = `${quote.quoteNumber} - ${quote.clientName}.pdf`;
      const phone = quote.clientPhone.replace(/\D/g, "");
      const msgText = `Hola ${quote.clientName}, soy Oscar de O Sanchez Seguros.\n\nLe comparto su propuesta de protección integral *Blindaje Familiar 360°* (${quote.quoteNumber}).\n\nQuedo a sus órdenes para resolver cualquier duda.`;

      // Try Web Share API (mobile — attaches PDF to WhatsApp)
      if (navigator.share && navigator.canShare) {
        try {
          const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
          if (navigator.canShare({ files: [pdfFile] })) {
            await navigator.share({
              title: `Blindaje Familiar 360° - ${quote.clientName}`,
              text: msgText,
              files: [pdfFile],
            });
            return;
          }
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
        }
      }

      // Fallback: download PDF + open WhatsApp Web
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
      const msg = encodeURIComponent(msgText);
      window.open(`https://wa.me/52${phone}?text=${msg}`, "_blank");
    } catch (err) {
      console.error("Error sharing:", err);
    } finally {
      setSharing(null);
    }
  }

  async function handleStatusChange(quoteId: string, newStatus: string) {
    try {
      const { updateQuoteStatus } = await import("@/lib/firebase/firestore");
      await updateQuoteStatus(quoteId, newStatus as any);
      await fetchQuotes();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }

  async function handleDelete(quoteId: string) {
    if (!confirm("¿Eliminar esta cotización?")) return;
    try {
      const { deleteQuote } = await import("@/lib/firebase/firestore");
      await deleteQuote(quoteId);
      await fetchQuotes();
    } catch (err) {
      console.error("Error deleting quote:", err);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden mt-8">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-brand flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Presentaciones Generadas
          </h2>
          <p className="text-sm text-muted mt-1">{quotes.length} cotizaciones</p>
        </div>
        <button onClick={fetchQuotes} className="inline-flex items-center gap-2 px-3 py-2 bg-brand/5 text-brand text-sm font-semibold rounded-full hover:bg-brand/10 transition-all">
          <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand/[0.03]">
              <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">No. Cotización</th>
              <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Cliente</th>
              <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Planes</th>
              <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Estatus</th>
              <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Fecha</th>
              <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-12 text-center"><div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-sm text-muted mt-3">Cargando...</p></td></tr>
            ) : quotes.length === 0 ? (
              <tr><td colSpan={6} className="p-12 text-center"><p className="text-sm font-bold text-brand">Sin cotizaciones aún</p><p className="text-xs text-muted mt-1">Genera tu primera presentación desde un lead</p></td></tr>
            ) : quotes.map(q => {
              const st = STATUS_MAP[q.status] || { label: q.status, cls: "bg-neutral-100 text-neutral-600 border-neutral-200" };
              return (
                <tr key={q.id} className="border-b border-border hover:bg-brand/[0.02] transition-colors">
                  <td className="p-4"><span className="font-mono text-sm font-bold text-brand">{q.quoteNumber}</span></td>
                  <td className="p-4">
                    <p className="font-bold text-brand text-sm">{q.clientName}</p>
                    <p className="text-xs text-muted">{q.members?.length || 0} integrantes</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {q.sections?.map((s: any, i: number) => (
                        <span key={i} className="inline-block px-2 py-0.5 bg-brand/5 text-brand rounded text-[11px] font-semibold">{s.title}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <select value={q.status} onChange={e => handleStatusChange(q.id, e.target.value)} className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border cursor-pointer ${st.cls}`}>
                      <option value="draft">Borrador</option>
                      <option value="sent">Enviada</option>
                      <option value="accepted">Aceptada</option>
                      <option value="expired">Expirada</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-muted font-medium">
                      {q.createdAt?.seconds ? new Date(q.createdAt.seconds * 1000).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }) : "Reciente"}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      {/* Edit */}
                      {onEditQuote && (
                        <button onClick={() => onEditQuote(q)} title="Editar presentación" className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center transition-all">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                      )}
                      {/* WhatsApp */}
                      <button onClick={() => handleWhatsApp(q)} disabled={sharing === q.id} title="Enviar por WhatsApp" className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 flex items-center justify-center transition-all disabled:opacity-50">
                        {sharing === q.id ? (
                          <div className="w-4 h-4 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                        )}
                      </button>
                      {/* Download */}
                      <button onClick={() => handleRedownload(q)} disabled={downloading === q.id} title="Descargar PDF" className="w-8 h-8 rounded-lg bg-brand/5 text-brand hover:bg-brand/10 flex items-center justify-center transition-all disabled:opacity-50">
                        {downloading === q.id ? (
                          <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        )}
                      </button>
                      {/* Delete */}
                      <button onClick={() => handleDelete(q.id)} title="Eliminar" className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 flex items-center justify-center transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
