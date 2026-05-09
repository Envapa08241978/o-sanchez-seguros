"use client";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  leadName?: string;
};

export default function QuoteModal({ isOpen, onClose, leadName }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl border border-border shadow-2xl w-full max-w-2xl animate-scale-in max-h-[85vh] flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="font-display text-lg font-bold text-brand">Cotizar en Aseguradoras</h2>
            <p className="text-xs text-muted mt-1">
              {leadName ? `Buscando cotización para: ${leadName}` : "Selecciona una aseguradora para cotizar"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-brand/5 flex items-center justify-center text-muted hover:text-brand transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-center">
              <a
                href="https://gswas.com.mx/cas/login?service=https%3A%2F%2Fgswas.com.mx%2FOficinaGS%2F&acceso=2"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-8 rounded-xl border border-border hover:border-brand/30 hover:bg-brand/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="w-20 h-20 rounded-xl bg-white border border-border flex items-center justify-center overflow-hidden">
                  <Image src="/images/GENERAL DE SEGUROS.jpeg" alt="General de Seguros" width={64} height={64} className="object-contain w-16 h-16" />
                </div>
                <span className="text-sm font-semibold text-brand text-center leading-tight group-hover:text-accent transition-colors">General de Seguros</span>
                <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">Abrir portal →</span>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
}
