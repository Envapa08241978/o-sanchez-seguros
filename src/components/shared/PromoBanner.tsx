"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  const pathname = usePathname();

  // Hide banner on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="w-full bg-[#182458] border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-3 flex justify-center items-center">
        <Link
          href="/contacto"
          aria-label="Promoción hasta 12 meses sin intereses - Cotizar ahora"
          className="block w-full max-w-5xl overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 group relative"
        >
          <Image
            src="/images/hasta-12-meses-sin-intereses.jpeg"
            alt="Hasta 12 Meses Sin Intereses - O Sanchez Seguros"
            width={1600}
            height={369}
            className="w-full h-auto object-cover rounded-xl"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl" />
        </Link>
      </div>
    </div>
  );
}
