"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/utils/constants";

const HOSPITALS = [
  { id: "sanjose", name: "Hospital San José", parto: 35000, cesarea: 65000 },
  { id: "cima", name: "Hospital CIMA", parto: 45000, cesarea: 75000 },
  { id: "noroeste", name: "Clínica del Noroeste", parto: 28000, cesarea: 42000 },
  { id: "sandiego", name: "San Diego de Alcalá", parto: 25000, cesarea: 38000 },
  { id: "licona", name: "Hospital Licona", parto: 22000, cesarea: 34000 },
];

export default function MaternityCalculator() {
  const [hospitalId, setHospitalId] = useState(HOSPITALS[0].id);
  const [type, setType] = useState<"parto" | "cesarea">("cesarea");

  const selectedHospital = HOSPITALS.find((h) => h.id === hospitalId)!;
  const rawCost = selectedHospital[type];
  
  // Apoyo promedio del seguro (se puede ajustar)
  const seguroSupport = 45000;
  
  const finalCost = Math.max(0, rawCost - seguroSupport);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-surface-elevated rounded-2xl border border-border shadow-xl p-6 sm:p-8 my-10 max-w-2xl mx-auto overflow-hidden relative not-prose">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-accent"></div>
      
      <div className="text-center mb-8 mt-2">
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-brand mb-2">
          Calculadora de Costo de Parto
        </h3>
        <p className="text-muted text-sm sm:text-base">
          Estima cuánto pagarías en los hospitales de Hermosillo y ve la diferencia de contar con el seguro de maternidad.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Hospital */}
        <div>
          <label className="block text-sm font-bold text-brand mb-2">
            Selecciona el Hospital
          </label>
          <select
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-brand font-medium focus:ring-2 focus:ring-accent focus:outline-none transition-all"
          >
            {HOSPITALS.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-bold text-brand mb-2">
            Tipo de Procedimiento
          </label>
          <div className="flex bg-background border border-border rounded-xl p-1">
            <button
              onClick={() => setType("parto")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                type === "parto"
                  ? "bg-purple-100 text-purple-700 shadow-sm"
                  : "text-muted hover:text-brand"
              }`}
            >
              Parto Natural
            </button>
            <button
              onClick={() => setType("cesarea")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                type === "cesarea"
                  ? "bg-purple-100 text-purple-700 shadow-sm"
                  : "text-muted hover:text-brand"
              }`}
            >
              Cesárea
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-background rounded-xl p-5 border border-border space-y-4 mb-8">
        <div className="flex justify-between items-center text-lg">
          <span className="text-muted font-medium">Costo estimado del hospital:</span>
          <span className="font-bold text-brand">{formatMoney(rawCost)}</span>
        </div>
        
        <div className="flex justify-between items-center text-lg text-emerald-600">
          <span className="font-medium">Ayuda de Maternidad del Seguro:</span>
          <span className="font-bold">- {formatMoney(seguroSupport)}</span>
        </div>
        
        <div className="h-px w-full bg-border my-2"></div>
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-2">
          <span className="text-xl font-bold text-brand mb-1 sm:mb-0">Lo que terminas pagando:</span>
          <span className="text-3xl font-extrabold text-accent">
            {finalCost === 0 ? "¡Prácticamente $0!" : formatMoney(finalCost)}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-sm text-muted mb-4">
          *Costos aproximados que pueden variar. La ayuda de maternidad depende del plan contratado (espera de 10 meses).
        </p>
        <a
          href={SITE_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          ¡Asegurar mis {formatMoney(seguroSupport)} hoy! →
        </a>
      </div>
    </div>
  );
}
