"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION, SITE_CONFIG } from "@/utils/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative" aria-label="Inicio">
            <Image
              src="/images/logo-header.svg"
              alt={SITE_CONFIG.name}
              width={180}
              height={58}
              className="h-11 md:h-13 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {NAVIGATION.main.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setInsuranceOpen(true)}
                  onMouseLeave={() => setInsuranceOpen(false)}
                >
                  <button
                    className="px-4 py-2 text-sm font-medium text-brand hover:text-brand-light transition-colors duration-200 flex items-center gap-1"
                    aria-expanded={insuranceOpen}
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        insuranceOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {insuranceOpen && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-border p-2 animate-slide-down">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-elevated transition-colors"
                        >
                          <span className="text-xl">{child.icon}</span>
                          <span className="text-sm font-medium text-brand">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-brand hover:text-brand-light transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contacto"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Cotizar Ahora
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white animate-slide-down">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Menú móvil">
            {NAVIGATION.main.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-elevated transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-lg">{child.icon}</span>
                      <span className="text-sm font-medium text-brand">
                        {child.label}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-sm font-medium text-brand rounded-lg hover:bg-surface-elevated transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-border">
              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Cotizar Ahora
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
