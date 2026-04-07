// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat, UIMessage } from "@ai-sdk/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function ChatWidget() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const { messages, append, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al recibir mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Botón flotante para abrir/cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-brand text-white rounded-full shadow-2xl hover:scale-105 transition-transform"
        aria-label="Abrir asistente inteligente"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Ventana de Chat */}
      <div 
        className={`fixed bottom-24 right-6 w-[90vw] sm:w-[380px] h-[550px] max-h-[75vh] bg-white rounded-2xl shadow-2xl border border-border flex flex-col z-50 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Cabecera del chat */}
        <div className="flex items-center gap-3 p-4 bg-brand text-white rounded-t-2xl">
          <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm">Asistente IA</h3>
            <p className="text-xs text-white/70 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              En línea
            </p>
          </div>
        </div>

        {/* Cesta de Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.length === 0 && (
            <div className="text-center text-sm text-muted mt-10 p-6 bg-white rounded-xl border border-border shadow-sm">
              <p className="font-bold text-brand mb-2">¡Hola! 👋</p>
              <p>Soy el asistente virtual de O Sánchez Seguros. ¿En qué seguro o trámite te puedo ayudar el día de hoy?</p>
            </div>
          )}

          {messages.map((m: UIMessage) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role !== "user" && (
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center mr-2 flex-shrink-0">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              )}
              
              <div 
                className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                  m.role === "user" 
                    ? "bg-accent text-white rounded-tr-none" 
                    : "bg-white border border-border text-brand rounded-tl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center mr-2 flex-shrink-0">
                  <svg className="w-4 h-4 text-accent animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
              </div>
              <div className="bg-white border border-border rounded-2xl rounded-tl-none p-3 shadow-sm flex gap-1">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Caja de Input */}
        <div className="p-3 bg-white border-t border-border rounded-b-2xl">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!localInput.trim()) return;
              if (append) {
                append({ role: "user", content: localInput });
                setLocalInput("");
              }
            }} 
            className="flex gap-2"
          >
            <input
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              disabled={isLoading}
              placeholder="Escribe tu mensaje aquí..."
              className="flex-1 bg-surface-elevated border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-brand disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading || !localInput.trim()}
              className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center hover:bg-brand-light transition-colors disabled:opacity-50 disabled:hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand/30 shrink-0"
            >
              <svg className="w-4 h-4 translate-x-px translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted tracking-tight">Potenciado cognitivamente por Gemini AI</span>
          </div>
        </div>
      </div>
    </>
  );
}
