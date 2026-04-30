"use client";
import Image from "next/image";
import { INSURERS } from "@/utils/constants";

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {INSURERS.map((insurer) => (
              <a
                key={insurer.name}
                href={insurer.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-brand/30 hover:bg-brand/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-border flex items-center justify-center overflow-hidden">
                  {insurer.logo ? (
                    <Image src={insurer.logo} alt={insurer.name} width={48} height={48} className="object-contain w-11 h-11" />
                  ) : (
                    <span className="text-xs font-bold text-brand">{insurer.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-brand text-center leading-tight group-hover:text-accent transition-colors">{insurer.name}</span>
                <span className="text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">Abrir portal →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
