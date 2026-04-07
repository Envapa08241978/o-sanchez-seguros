"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// MASTER PASSWORD DEFINED IN PLAN
const MASTER_PASSWORD = "AdminSanchez123";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  status: string;
  createdAt: any;
};

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check simple session storage for auth state to survive reloads
  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth");
    if (isAuth === "true") {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setError("");
      fetchLeads();
    } else {
      setError("Contraseña incorrecta. Acceso denegado.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setLeads([]);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedLeads: Lead[] = [];
      querySnapshot.forEach((doc) => {
        fetchedLeads.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(fetchedLeads);
    } catch (err) {
      console.error("Error al obtener leads:", err);
      // Fallback a vacio si no hay collection o reglas de seguridad
    } finally {
      setIsLoading(false);
    }
  };

  // VISTA: LOGIN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-border w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-brand mb-2">Panel Administrativo</h1>
            <p className="text-muted text-sm">O Sanchez Seguros - Gestión de Leads</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-brand mb-2">
                Contraseña Maestra
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-brand focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="Ingresa tu contraseña..."
              />
              {error && <p className="text-accent text-sm mt-2 font-medium">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-light text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
            >
              Acceder al Panel
            </button>
          </form>
        </div>
      </main>
    );
  }

  // VISTA: DASHBOARD
  return (
    <main className="min-h-screen bg-surface">
      {/* Top Navbar Simple para area segura */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand text-white rounded-lg flex items-center justify-center font-bold text-xl">
              OS
            </div>
            <div>
              <h1 className="font-bold text-brand leading-none">Admin Dashboard</h1>
              <span className="text-xs text-muted font-medium">Bóveda de Leads seguros</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchLeads}
              className="text-sm font-semibold text-brand hover:text-accent transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Recargar
            </button>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-neutral-500 hover:text-accent transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total de Leads</p>
              <h3 className="text-2xl font-bold text-brand">{leads.length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Leads Activos</p>
              <h3 className="text-2xl font-bold text-brand">{leads.filter(l => l.status === "new").length}</h3>
            </div>
          </div>
        </div>

        {/* Tabla de Leads */}
        <div className="bg-white rounded-3xl shadow-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-neutral-50/50">
            <h2 className="text-lg font-bold text-brand">Registros Recientes</h2>
            <p className="text-sm text-muted">Personas interesadas que han llenado formularios</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-brand text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-border">Contacto</th>
                  <th className="p-4 font-semibold border-b border-border">Interés</th>
                  <th className="p-4 font-semibold border-b border-border">Estatus</th>
                  <th className="p-4 font-semibold border-b border-border">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted">
                      <div className="inline-block animate-spin w-6 h-6 border-2 border-brand border-t-transparent rounded-full" />
                      <p className="mt-2 text-sm font-medium">Cargando base de datos...</p>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted">
                      <p className="text-sm font-medium">Aún no hay registros de leads.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border hover:bg-neutral-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-brand">{lead.name}</p>
                        <p className="text-xs text-muted mt-1">{lead.phone}</p>
                        <p className="text-xs text-muted">{lead.email}</p>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 bg-brand/5 text-brand rounded-full text-xs font-semibold">
                          {lead.interest}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === "new" ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-600"
                        }`}>
                          {lead.status === "new" ? "NUEVO" : lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-muted font-medium">
                        {lead.createdAt?.seconds 
                          ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString("es-MX", {
                              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                            }) 
                          : "Reciente"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
