"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import NewLeadModal from "./components/NewLeadModal";
import QuoteModal from "./components/QuoteModal";
import LeadDetailDrawer from "./components/LeadDetailDrawer";

const MASTER_PASSWORD = "AdminSanchez123";

type Lead = {
  id: string; name: string; fullName?: string; email: string; phone: string;
  interest: string; insuranceType?: string; status: string; source?: string;
  birthDate?: string; gender?: string; zipCode?: string; message?: string;
  notes?: string; createdAt: any;
};

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewLead, setShowNewLead] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteLead, setQuoteLead] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") === "true") { setIsAuthenticated(true); fetchLeads(); }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_PASSWORD) { sessionStorage.setItem("adminAuth", "true"); setIsAuthenticated(true); setError(""); fetchLeads(); }
    else setError("Contraseña incorrecta. Acceso denegado.");
  };

  const handleLogout = () => { sessionStorage.removeItem("adminAuth"); setIsAuthenticated(false); setLeads([]); };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
    } catch (err) { console.error("Error:", err); }
    finally { setIsLoading(false); }
  };

  const openQuote = (name: string) => { setQuoteLead(name); setShowQuote(true); };
  const openDetail = (lead: Lead) => { setSelectedLead(lead); setShowDrawer(true); };

  // LOGIN VIEW
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-radial-gold opacity-20" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl animate-float" />
        <div className="relative bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <Image src="/images/logo-header.svg" alt="O Sanchez Seguros" width={200} height={56} priority className="h-14 w-auto" />
          </div>
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-extrabold text-brand mb-2">Panel Administrativo</h1>
            <p className="text-muted text-sm">Gestión de Leads y Prospectos</p>
          </div>
          <div className="flex items-center gap-3 mb-8"><div className="flex-1 h-px bg-border" /><svg className="w-5 h-5 text-brand/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg><div className="flex-1 h-px bg-border" /></div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-brand mb-2">Contraseña de Acceso</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg></div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-xl pl-12 pr-4 py-3.5 text-brand focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm" placeholder="Ingresa tu contraseña..." />
              </div>
              {error && <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in-up"><svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg><p className="text-accent text-sm font-medium">{error}</p></div>}
            </div>
            <button type="submit" className="w-full bg-brand hover:bg-brand-light text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
              Acceder al Panel
            </button>
          </form>
          <p className="text-center text-xs text-subtle mt-8">Área restringida · O Sanchez Seguros © {new Date().getFullYear()}</p>
        </div>
      </main>
    );
  }

  // DASHBOARD VIEW
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/images/logo-header.svg" alt="O Sanchez Seguros" width={160} height={44} priority className="h-10 w-auto" />
            <div className="hidden sm:block h-8 w-px bg-border" />
            <div className="hidden sm:block"><h1 className="font-display font-bold text-brand text-sm leading-none">Panel Admin</h1><span className="text-xs text-muted font-medium">Gestión de Leads</span></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNewLead(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-bold rounded-full hover:bg-accent-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span className="hidden sm:inline">Nuevo Lead</span>
            </button>
            <button onClick={fetchLeads} className="inline-flex items-center gap-2 px-4 py-2 bg-brand/5 text-brand text-sm font-semibold rounded-full hover:bg-brand/10 transition-all">
              <svg className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <button onClick={handleLogout} className="inline-flex items-center gap-1 px-3 py-2 text-sm text-muted hover:text-accent rounded-full hover:bg-accent/5 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="gradient-hero py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div><h2 className="font-display text-xl sm:text-2xl font-bold text-white">Bienvenido al Panel</h2><p className="text-white/60 text-sm mt-1">Resumen de prospectos y leads capturados</p></div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /><span className="text-white/70 text-xs font-medium">Sistema activo</span></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 -mt-14">
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-lg hover-lift flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center text-brand"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
            <div><p className="text-xs text-muted font-medium uppercase tracking-wider">Total Leads</p><h3 className="text-3xl font-extrabold text-brand font-display">{leads.length}</h3></div>
          </div>
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-lg hover-lift flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
            <div><p className="text-xs text-muted font-medium uppercase tracking-wider">Leads Nuevos</p><h3 className="text-3xl font-extrabold text-brand font-display">{leads.filter(l => l.status === "new").length}</h3></div>
          </div>
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-lg hover-lift flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></div>
            <div><p className="text-xs text-muted font-medium uppercase tracking-wider">Último Registro</p><h3 className="text-lg font-extrabold text-brand font-display">{leads.length > 0 && leads[0].createdAt?.seconds ? new Date(leads[0].createdAt.seconds * 1000).toLocaleDateString("es-MX", { day: "numeric", month: "short" }) : "—"}</h3></div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-brand flex items-center gap-2"><svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>Registros de Prospectos</h2>
              <p className="text-sm text-muted mt-1">{leads.length} prospectos registrados</p>
            </div>
            <button onClick={() => setShowQuote(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-bold rounded-full hover:bg-brand-light transition-all shadow-md">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>Cotizar Aseguradoras
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand/[0.03]">
                  <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Contacto</th>
                  <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Interés</th>
                  <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Estatus</th>
                  <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border">Fecha</th>
                  <th className="p-4 text-xs font-bold text-brand uppercase tracking-wider border-b border-border text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="p-12 text-center"><div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-sm text-muted mt-3">Cargando...</p></td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={5} className="p-12 text-center"><div className="w-16 h-16 rounded-full bg-brand/5 flex items-center justify-center mx-auto mb-3"><svg className="w-8 h-8 text-brand/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg></div><p className="text-sm font-bold text-brand">Sin registros</p></td></tr>
                ) : leads.map(lead => {
                  const dn = lead.fullName || lead.name || "?";
                  const statusMap: Record<string, { label: string; cls: string }> = {
                    new: { label: "NUEVO", cls: "bg-green-50 text-green-700 border-green-200" },
                    contacted: { label: "CONTACTADO", cls: "bg-blue-50 text-blue-700 border-blue-200" },
                    qualified: { label: "CALIFICADO", cls: "bg-purple-50 text-purple-700 border-purple-200" },
                    proposal: { label: "PROPUESTA", cls: "bg-amber-50 text-amber-700 border-amber-200" },
                    won: { label: "GANADO", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                    lost: { label: "PERDIDO", cls: "bg-red-50 text-red-700 border-red-200" },
                  };
                  const st = statusMap[lead.status] || { label: lead.status, cls: "bg-neutral-100 text-neutral-600 border-neutral-200" };
                  return (
                    <tr key={lead.id} className="border-b border-border hover:bg-brand/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm flex-shrink-0">{dn.charAt(0).toUpperCase()}</div>
                          <div className="min-w-0"><p className="font-bold text-brand text-sm truncate">{dn}</p><p className="text-xs text-muted truncate">{lead.phone}</p><p className="text-xs text-subtle truncate">{lead.email}</p></div>
                        </div>
                      </td>
                      <td className="p-4"><span className="inline-block px-3 py-1.5 bg-brand/5 text-brand rounded-full text-xs font-semibold border border-brand/10">{lead.insuranceType || lead.interest || "—"}</span></td>
                      <td className="p-4"><span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${st.cls}`}>{st.label}</span></td>
                      <td className="p-4"><p className="text-xs text-muted font-medium">{lead.createdAt?.seconds ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }) : "Reciente"}</p></td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <a href={`https://wa.me/52${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${dn}, soy Oscar de O Sanchez Seguros.`)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 flex items-center justify-center transition-all">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                          </a>
                          <a href={`mailto:${lead.email}?subject=${encodeURIComponent("Cotización - O Sanchez Seguros")}`} title="Email" className="w-8 h-8 rounded-lg bg-brand/5 text-brand hover:bg-brand/10 flex items-center justify-center transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </a>
                          <button onClick={() => openQuote(dn)} title="Cotizar" className="w-8 h-8 rounded-lg bg-accent/5 text-accent hover:bg-accent/10 flex items-center justify-center transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                          </button>
                          <button onClick={() => openDetail(lead)} title="Historial" className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 flex items-center justify-center transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {leads.length > 0 && <div className="p-4 border-t border-border bg-brand/[0.02] flex items-center justify-between"><p className="text-xs text-muted">Mostrando {leads.length} registros</p><p className="text-xs text-subtle">Actualizado: {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}</p></div>}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3"><Image src="/images/logo-header.svg" alt="O Sanchez Seguros" width={120} height={32} className="h-7 w-auto opacity-50" /><span className="text-xs text-subtle">Panel Administrativo</span></div>
          <p className="text-xs text-subtle">© {new Date().getFullYear()} O Sanchez Seguros · Hermosillo, Sonora</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <NewLeadModal isOpen={showNewLead} onClose={() => setShowNewLead(false)} onCreated={fetchLeads} />
      <QuoteModal isOpen={showQuote} onClose={() => setShowQuote(false)} leadName={quoteLead} />
      <LeadDetailDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} lead={selectedLead} onUpdated={fetchLeads} />
    </main>
  );
}
