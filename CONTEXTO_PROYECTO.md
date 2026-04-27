# CONTEXTO COMPLETO DEL PROYECTO — O SANCHEZ SEGUROS

> **Última actualización:** 26 de abril de 2026  
> **Propósito:** Archivo de referencia para que cualquier agente de IA tenga contexto completo al trabajar en este proyecto.

---

## 1. DESCRIPCIÓN GENERAL

**O Sanchez Seguros** es un sitio web profesional para la agencia de seguros de **Oscar Sánchez Aguirre**, agente certificado CNSF con +16 años de experiencia, ubicado en **Hermosillo, Sonora, México**.

El sitio funciona como:
- **Landing page / sitio informativo** de seguros (GMM, Vida, Auto, Fronterizos, Empresariales, Vida con Ahorro)
- **Sistema de captura de leads** con formularios multi-paso que se guardan en Firebase y envían notificaciones por email
- **Chatbot con IA** (Gemini) que perfila al usuario y lo invita a dejar sus datos
- **Panel administrativo simple** protegido por contraseña para ver leads

---

## 2. STACK TECNOLÓGICO

| Tecnología | Versión | Uso |
|---|---|---|
| **Next.js** | 16.2.2 | Framework principal (App Router) |
| **React** | 19.2.4 | Librería de UI |
| **TypeScript** | ^5 | Tipado estático |
| **Tailwind CSS** | v4 | Estilos (con `@tailwindcss/postcss`) |
| **Firebase** | 12.11.0 | Base de datos (Firestore) + Analytics |
| **AI SDK (Vercel)** | 6.x | Integración con Gemini para chatbot |
| **@ai-sdk/google** | 3.x | Proveedor Gemini para AI SDK |
| **Zod** | 4.x | Validación de schemas |
| **Nodemailer** | 8.x | Envío de emails de notificación |
| **Vercel** | — | Hosting y despliegue |
| **GitHub** | — | Control de versiones |

---

## 3. FIREBASE — CONFIGURACIÓN COMPLETA

### 3.1 Proyecto Firebase
- **Project ID:** `o-sanchez-seguros`
- **Auth Domain:** `o-sanchez-seguros.firebaseapp.com`
- **Storage Bucket:** `o-sanchez-seguros.firebasestorage.app`
- **Messaging Sender ID:** `547838159512`
- **App ID:** `1:547838159512:web:5b7218b65b8d75caab3eed`
- **Measurement ID:** `G-45R76JVTZS`
- **API Key:** `AIzaSyDVBTL5sF3Rhf5Abrf4uTWFh3TJeJ_vzCg`

### 3.2 Servicios Utilizados
1. **Firestore Database** — Base de datos principal
2. **Firebase Analytics** — Rastreo de uso (inicializado solo en browser)

### 3.3 Colecciones de Firestore
| Colección | Descripción | Campos principales |
|---|---|---|
| `leads` | Prospectos capturados desde formulario principal | fullName, email, phone, insuranceType, message, status, priority, score, source, city, state, privacyConsent, createdAt, updatedAt |
| `contactSubmissions` | Mensajes del formulario de contacto | fullName, email, phone, insuranceType, message, status, createdAt |

### 3.4 Archivos Firebase
```
src/lib/firebase/config.ts    → Inicialización de Firebase App + Firestore + Analytics
src/lib/firebase/firestore.ts → Funciones createLead() y createContactSubmission()
```

### 3.5 Inicialización
- Firebase se inicializa con protección contra duplicados (`getApps().length === 0`)
- Analytics solo se inicializa en el browser (`typeof window !== "undefined"`)
- Las claves están hardcodeadas en `config.ts` (NO en variables de entorno — las claves de Firebase client son públicas por diseño)

---

## 4. VERCEL — CONFIGURACIÓN COMPLETA

### 4.1 Proyecto Vercel
- **Project ID:** `prj_PWIKYb96yQSnkskAVB3JYc4k6ZnJ`
- **Org/Team ID:** `team_zSb8hJlZgiVrlftqSzV4NyaK`
- **Project Name:** `o-sanchez-seguros`
- **URL de producción:** `https://o-sanchez-seguros.vercel.app`
- **Plan:** Pro

### 4.2 Variables de Entorno (`.env.local`)
| Variable | Uso |
|---|---|
| `GEMINI_API_KEY` | API key para Gemini AI (chatbot) |
| `VERCEL_OIDC_TOKEN` | Token OIDC autogenerado por Vercel CLI |

### 4.3 Variables de entorno necesarias en Vercel Dashboard
| Variable | Uso | Nota |
|---|---|---|
| `GEMINI_API_KEY` o `GOOGLE_GENERATIVE_AI_API_KEY` | Chatbot IA | Requerida para que funcione el chatbot |
| `SMTP_USER` | Email remitente para alertas | Default: `enriquevale.ev@gmail.com` |
| `SMTP_PASSWORD` | App password de Gmail | Requerida para envío de emails |

### 4.4 Deploy Pipeline
- Push a GitHub → Vercel detecta automáticamente → Build con `next build` → Deploy

---

## 5. GITHUB — CONFIGURACIÓN

### 5.1 Repositorio
- **Owner:** `Envapa08241978`
- **Repo:** `o-sanchez-seguros`
- **Branch principal:** `main`
- **Privacidad:** Repositorio privado

### 5.2 .gitignore
Excluye: `node_modules`, `.next`, `.env*`, `.vercel`, `*.tsbuildinfo`, `next-env.d.ts`

---

## 6. ARQUITECTURA DEL PROYECTO

### 6.1 Estructura de Carpetas
```
o-sanchez-seguros/
├── src/
│   ├── app/                          # App Router (Next.js)
│   │   ├── layout.tsx                # Layout principal (Header, Footer, WhatsApp, Chat)
│   │   ├── page.tsx                  # Homepage (Hero, Productos, Aseguradoras, CTA+LeadForm)
│   │   ├── globals.css               # Design System completo (CSS Variables, Tailwind theme)
│   │   ├── favicon.ico
│   │   │
│   │   ├── (marketing)/             # Grupo de rutas públicas (marketing)
│   │   │   ├── contacto/page.tsx     # Página de contacto completa
│   │   │   ├── nosotros/page.tsx     # Página "Sobre Nosotros"
│   │   │   ├── red-hospitalaria/page.tsx  # Red de hospitales
│   │   │   ├── testimonios/          # (vacío — pendiente)
│   │   │   └── seguros/
│   │   │       ├── page.tsx          # Página índice de seguros
│   │   │       ├── auto/             # Página seguro de auto
│   │   │       ├── empresarial/      # Página seguro empresarial
│   │   │       ├── fronterizos/      # Página seguros fronterizos
│   │   │       ├── gastos-medicos/   # Página GMM
│   │   │       ├── vida/             # Página seguro de vida
│   │   │       └── vida-con-ahorro/  # Página vida con ahorro
│   │   │
│   │   ├── (legal)/                  # Grupo de rutas legales
│   │   │   ├── aviso-privacidad/page.tsx
│   │   │   ├── cedula-agente/page.tsx
│   │   │   └── derechos-basicos/page.tsx
│   │   │
│   │   ├── (admin)/                  # Grupo admin (actualmente contiene subcarpeta vacía)
│   │   │   └── dashboard/leads/      # (vacío — el admin real está en /admin)
│   │   │
│   │   ├── admin/
│   │   │   └── page.tsx              # Dashboard administrativo REAL (login + tabla de leads)
│   │   │
│   │   └── api/                      # API Routes
│   │       ├── chat/route.ts         # POST → Chatbot con Gemini (streaming)
│   │       ├── contact/route.ts      # POST → Guardar contacto en Firestore + email
│   │       └── leads/route.ts        # POST → Guardar lead en Firestore + email
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Navbar fija con glassmorphism + dropdown seguros
│   │   │   └── Footer.tsx            # Footer con navegación, legal, contacto, redes sociales
│   │   ├── shared/
│   │   │   ├── ChatWidget.tsx        # Widget flotante de chat con Gemini AI
│   │   │   ├── LeadForm.tsx          # Formulario multi-paso (2 pasos) para captura de leads
│   │   │   ├── WhatsAppButton.tsx    # Botón flotante de WhatsApp
│   │   │   └── ScrollReveal.tsx      # Componente de animación scroll con IntersectionObserver
│   │   └── ui/                       # (vacío — para futuros componentes UI)
│   │
│   ├── features/                     # Features modulares (vacíos — reservados)
│   │   ├── chatbot/
│   │   ├── leads/
│   │   ├── maps/
│   │   └── social/
│   │
│   ├── hooks/                        # (vacío — para futuros custom hooks)
│   │
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts             # Inicialización Firebase
│   │   │   └── firestore.ts          # Funciones de escritura a Firestore
│   │   ├── email.ts                  # Envío de email con Nodemailer (Gmail SMTP)
│   │   └── schemas/
│   │       └── lead.schema.ts        # Schemas Zod para validación de leads y contactos
│   │
│   ├── types/
│   │   ├── insurance.ts              # Tipos: InsuranceType, InsuranceProduct, Hospital
│   │   └── lead.ts                   # Tipos: Lead, LeadStatus, LeadSource, LeadPriority
│   │
│   └── utils/
│       └── constants.ts              # Configuración del sitio, productos, navegación, aseguradoras
│
├── public/
│   ├── images/                       # Logos de aseguradoras (20+ JPEG), logo del sitio (SVG), OG image, favicon
│   ├── pdf/                          # Cédula de agente y asociación mexicana (PDF)
│   ├── docs/                         # (vacío)
│   └── fonts/                        # (vacío)
│
├── .env.local                        # Variables de entorno locales (GEMINI_API_KEY, VERCEL_OIDC_TOKEN)
├── .vercel/project.json              # Config del proyecto Vercel
├── package.json                      # Dependencias y scripts
├── tsconfig.json                     # TypeScript config (target ES2017, paths @/* → ./src/*)
├── next.config.ts                    # Config Next.js (vacía)
├── eslint.config.mjs                 # ESLint config (core-web-vitals + typescript)
├── postcss.config.mjs                # PostCSS config (tailwindcss)
└── CONTEXTO_PROYECTO.md              # ← ESTE ARCHIVO
```

---

## 7. DESIGN SYSTEM

### 7.1 Paleta de Colores
| Token | Hex | Uso |
|---|---|---|
| `--color-primary` (brand) | `#202F71` | Azul navy — color principal |
| `--color-primary-light` | `#2b3e94` | Hover del brand |
| `--color-accent` | `#D32020` | Rojo — CTAs y acentos |
| `--color-accent-dark` | `#b31b1b` | Hover del accent |
| `--color-secondary` | `#2B818C` | Verde azulado — info |
| `--background` | `#FFFAF3` | Fondo beige/crema suave |
| `--surface` | `#FFFFFF` | Cards y superficies |
| `--text-muted` | `#6E6965` | Texto secundario |

### 7.2 Tipografía
- **Display (headings):** Outfit (Google Fonts) — `--font-display`
- **Body (texto):** Inter (Google Fonts) — `--font-body`

### 7.3 Animaciones
- `fadeInUp`, `fadeIn`, `slideInRight`, `slideDown`, `scaleIn`, `shimmer`, `float`, `pulse-accent`
- Clases utilitarias: `.animate-fade-in-up`, `.animate-float`, `.animate-pulse-gold`, etc.
- Delays: `.delay-100` a `.delay-500`

### 7.4 Efectos
- **Glassmorphism:** `.glass` (header) y `.glass-dark`
- **Gradient Hero:** `.gradient-hero` (azul navy oscuro)
- **Hover Lift:** `.hover-lift` (translateY + shadow)

---

## 8. API ROUTES

### 8.1 POST `/api/leads`
- **Input:** `{ fullName, email, phone, insuranceType, message?, privacyConsent }`
- **Validación:** Schema Zod `leadSchema`
- **Acción:** Guarda en Firestore `leads` + envía email de alerta
- **Flujo post-envío:** Abre WhatsApp automáticamente con mensaje pre-llenado al número `526421600559`

### 8.2 POST `/api/contact`
- **Input:** `{ fullName, email, phone, insuranceType, message, privacyConsent }`
- **Validación:** Schema Zod `contactSchema`
- **Acción:** Guarda en Firestore `contactSubmissions` + envía email de alerta

### 8.3 POST `/api/chat`
- **Input:** `{ messages }` (historial de conversación)
- **Modelo:** `gemini-1.5-flash` vía `@ai-sdk/google`
- **Streaming:** Sí, respuestas en tiempo real
- **System Prompt:** Asistente de seguros que perfila al usuario y solicita nombre/teléfono

---

## 9. PANEL ADMINISTRATIVO

- **URL:** `/admin`
- **Contraseña:** `AdminSanchez123` (hardcodeada en el componente)
- **Autenticación:** sessionStorage simple (no Firebase Auth)
- **Funcionalidades:**
  - Login con contraseña maestra
  - KPI Cards: Total Leads, Leads Activos
  - Tabla de leads desde Firestore (nombre, teléfono, email, interés, estatus, fecha)
  - Botón de recarga manual
  - Cierre de sesión
- **Nota:** Header y Footer se ocultan automáticamente en rutas `/admin`

---

## 10. COMPONENTES CLAVE

### Header (`Header.tsx`)
- Navbar fija con glassmorphism
- Logo SVG (enlace a inicio)
- Navegación desktop con dropdown de seguros (hover)
- Menú móvil hamburger
- CTA "Cotizar Ahora" → `/contacto`
- Se oculta en rutas `/admin`

### Footer (`Footer.tsx`)
- 4 columnas: Brand, Navegación, Legal, Contacto
- Redes sociales: LinkedIn, Facebook, Instagram, TikTok
- Créditos: "Desarrollado por soy nexo"
- Se oculta en rutas `/admin`

### LeadForm (`LeadForm.tsx`)
- Formulario de 2 pasos:
  - **Paso 1:** Selección de tipo de seguro (radio buttons)
  - **Paso 2:** Nombre, teléfono, email, consentimiento de privacidad
- Barra de progreso visual
- Envía a `/api/leads`
- Post-submit: Abre WhatsApp con mensaje pre-llenado

### ChatWidget (`ChatWidget.tsx`)
- Widget flotante (botón + ventana)
- Integración con Gemini AI vía `useChat` de `@ai-sdk/react`
- Indicador "En línea"
- Animación de escritura (3 dots bounce)
- Texto: "Potenciado cognitivamente por Gemini AI"
- Se oculta en rutas `/admin`

### WhatsAppButton (`WhatsAppButton.tsx`)
- Botón flotante verde con ícono WhatsApp
- Número: `5216621822481` (Oscar Sánchez)
- Tooltip "¿Necesitas ayuda?" en hover
- Indicador ping rojo
- Se oculta en rutas `/admin`

### ScrollReveal (`ScrollReveal.tsx`)
- Componente wrapper para animaciones al hacer scroll
- Usa IntersectionObserver (threshold 0.1)
- Direcciones: up, down, left, right, scale
- Delay configurable

---

## 11. INFORMACIÓN DEL NEGOCIO

| Campo | Valor |
|---|---|
| **Nombre comercial** | O Sanchez Seguros |
| **Nombre completo** | Oscar Sánchez Aguirre |
| **Teléfono** | +52 662 182 2481 |
| **WhatsApp** | 5216621822481 |
| **Email** | admon@osanchezseguros.com |
| **Ubicación** | Hermosillo, Sonora, México |
| **Año fundación** | 2009 |
| **Experiencia** | +16 años |
| **Horario** | Lunes a Viernes: 9:00 AM - 6:00 PM |

### Redes Sociales
- **TikTok:** https://www.tiktok.com/@oscarsanchez4600
- **Instagram:** https://www.instagram.com/oscar.sanchezag
- **Facebook:** https://www.facebook.com/share/1DnREkRfRw/
- **LinkedIn:** https://www.linkedin.com/in/oscar-e-sanchez-aguirre-946bb3129

### Aseguradoras Aliadas (20)
AXA, CHUBB, Allianz, Qualitas, BX+, GNP, Plan Seguro, Zurich, Mapfre, Inbursa, Banorte Seguros, Atlas, General de Seguros, SURA, HDI, GMX, Ana Seguros, Primero Seguros, El Potosí, Aserta

### Productos de Seguros
1. Seguros de Vida
2. Gastos Médicos Mayores (GMM)
3. Seguros de Auto
4. Seguros de Vida con Ahorro
5. Seguros Empresariales
6. Seguros Fronterizos (USA)

---

## 12. PÁGINAS DEL SITIO

| Ruta | Archivo | Descripción |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage: Hero, Productos, ¿Por qué elegirnos?, Aseguradoras, CTA+LeadForm |
| `/seguros` | `src/app/(marketing)/seguros/page.tsx` | Índice de todos los seguros |
| `/seguros/gastos-medicos` | `src/app/(marketing)/seguros/gastos-medicos/` | Detalle GMM |
| `/seguros/auto` | `src/app/(marketing)/seguros/auto/` | Detalle Auto |
| `/seguros/vida` | `src/app/(marketing)/seguros/vida/` | Detalle Vida |
| `/seguros/vida-con-ahorro` | `src/app/(marketing)/seguros/vida-con-ahorro/` | Detalle Vida+Ahorro |
| `/seguros/empresarial` | `src/app/(marketing)/seguros/empresarial/` | Detalle Empresarial |
| `/seguros/fronterizos` | `src/app/(marketing)/seguros/fronterizos/` | Detalle Fronterizos |
| `/contacto` | `src/app/(marketing)/contacto/page.tsx` | Formulario de contacto completo |
| `/nosotros` | `src/app/(marketing)/nosotros/page.tsx` | Página "Sobre Nosotros" |
| `/red-hospitalaria` | `src/app/(marketing)/red-hospitalaria/page.tsx` | Red de hospitales |
| `/aviso-privacidad` | `src/app/(legal)/aviso-privacidad/page.tsx` | Aviso de privacidad |
| `/cedula-agente` | `src/app/(legal)/cedula-agente/page.tsx` | Cédula del agente CNSF |
| `/derechos-basicos` | `src/app/(legal)/derechos-basicos/page.tsx` | Derechos básicos del asegurado |
| `/admin` | `src/app/admin/page.tsx` | Panel admin (login + leads) |

---

## 13. SEO Y METADATA

- **Title:** "O Sanchez Seguros | Especialista en Seguros desde 2009 | Hermosillo, Sonora"
- **metadataBase:** `https://o-sanchez-seguros.vercel.app`
- **Open Graph:** Configurado con imagen OG, locale es_MX
- **Twitter Card:** summary_large_image
- **Keywords:** seguros hermosillo, gastos médicos mayores, seguros fronterizos, etc.
- **Robots:** index: true, follow: true
- **Icons:** favicon.png + icon-512.png

---

## 14. EMAIL — NOTIFICACIONES

- **Servicio:** Gmail SMTP vía Nodemailer
- **Remitente:** `"O Sanchez Seguros Bot" <enriquevale.ev@gmail.com>`
- **Destinatario:** `enriquevale.ev@gmail.com`
- **Triggers:**
  - Nuevo lead → Email con emoji 🔵
  - Nuevo mensaje de contacto → Email con emoji 🟡
- **Requiere:** Variable `SMTP_PASSWORD` configurada (App Password de Google)

---

## 15. NOTAS DE DESARROLLO IMPORTANTES

### Path Aliases
- `@/*` → `./src/*` (configurado en tsconfig.json)

### Scripts npm
- `npm run dev` — Servidor de desarrollo
- `npm run build` — Build de producción
- `npm run start` — Servidor de producción
- `npm run lint` — ESLint

### Errores Conocidos
- `tsc_errors.txt` existe en la raíz — puede contener errores de TypeScript del último build
- `ChatWidget.tsx` usa `@ts-nocheck` por problemas de tipado con `useChat`
- Directorio `(admin)/dashboard/leads/` está vacío — el admin funcional está en `/admin`
- Carpetas `features/`, `hooks/`, `components/ui/` están vacías (reservadas para expansión)

### Convenciones
- Todos los componentes client usan `"use client"` explícito
- Header, Footer, WhatsApp y Chat se ocultan en rutas `/admin` usando `usePathname()`
- Formularios usan validación Zod en server + validación visual en client
- Colores definidos en CSS Variables + extendidos en Tailwind v4 `@theme inline`

---

## 16. HISTORIAL DE CHATS Y DECISIONES

> A partir de aquí, puedes agregar resúmenes de conversaciones con el agente de IA para mantener el contexto a futuro.

### Chat 1 — [Fecha: ____]
**Tema:**  
**Cambios realizados:**  
**Decisiones clave:**  

---

*Este archivo debe mantenerse actualizado cada vez que se hagan cambios significativos al proyecto.*
