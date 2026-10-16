# 📋 HISTORIAL DE CAMBIOS Y SESIONES — O SANCHEZ SEGUROS
**Fecha de Sesión:** 13 y 14 de Octubre de 2026  
**Cliente:** Oscar Sánchez Aguirre (`OSanchez Seguros`)  
**Proyecto:** Cotizador Digital de Gastos Médicos Mayores y Sitio Web Oficial  
**Repositorio GitHub:** `https://github.com/Envapa08241978/o-sanchez-seguros.git` (Rama: `main`)  
**Despliegue Producción:** Vercel (`https://www.osanchezseguros.com` y `https://osanchezseguros.com`)

---

## 🎯 1. Resumen Ejecutivo de la Sesión
En esta sesión se procesó e implementó una serie completa de solicitudes y ajustes enviados directamente por el cliente (**Oscar Sánchez**) mediante capturas de pantalla de WhatsApp y notas detalladas. Todos los cambios fueron programados, probados con compilación de producción en Next.js Turbopack (`npm run build`, 0 errores), versionados con Git y publicados en Google Search Console e IndexNow.

---

## 🛠️ 2. Detalle de Cambios Solicitados e Implementados

### A. Badge en Hero del Cotizador (`/cotizador`)
- **Solicitud del Cliente:** Agregar la acreditación AMASFAC al cintillo superior donde decía *"Agente Certificado CNSF"*.
- **Texto Implementado:**
  > `🇲🇽 Cobertura en Toda la República Mexicana · Agente Certificado CNSF y AMASFAC`
- **Archivo Modificado:** `src/app/(marketing)/cotizador/page.tsx`

---

### B. Switch de Modalidad de Pago y Financiamiento (Paso 5)
- **Solicitud del Cliente:**
  1. Poner primero el botón **Pago Anual** (izquierda, seleccionado por defecto) y enseguida **Pago Mensual** (derecha).
  2. La mensualidad debe calcularse con un **factor de incremento del 9% sobre el pago anual entre 12**:
     $$\text{Pago Mensual} = \frac{\text{Pago Anual} \times 1.09}{12}$$
- **Implementación Técnica:**
  - En `nationalQuoterEngine.ts` se agregó el cálculo exacto de `monthlyPayment: Math.round((annualTotal * 1.09) / 12)`.
  - En `NationalQuoter.tsx` el estado inicial es `paymentMode = "annual"` y el switch muestra `Pago Anual` primero y `Pago Mensual` segundo con actualización reactiva instantánea del costo.
  - En el enlace de WhatsApp generado (`generateWhatsAppLink`) se envía el desglose correcto según la modalidad elegida.

---

### C. Actualización de Deducibles Oficiales
- **Solicitud del Cliente:** Reemplazar los deducibles anteriores por la nueva escala oficial:
  - **$20,500 MXN** (Factor: 1.15)
  - **$27,500 MXN** (Factor: 1.00 — *Deducible estándar por defecto*)
  - **$39,500 MXN** (Factor: 0.88)
  - **$56,500 MXN** (Factor: 0.76)
- **Implementación Técnica:**
  - Actualizado en `getDeductibleMultiplier()` de `nationalQuoterEngine.ts`.
  - Configurado como valor por defecto `$27,500` en `NationalQuoter.tsx` y en el schema Zod de la API `src/app/api/cotizador/route.ts`.

---

### D. Estandarización de Planes y Beneficios
- **Suma Asegurada:** Se estandarizó a **$96,500,000 MXN** (96.5 MDP) para los 3 planes (*Esencial*, *Confort*, *Diamante Elite*). Se eliminó cualquier referencia a los $180 MDP anteriores.
- **Red Médica (antes Gama Hospitalaria):** Renombrada en etiquetas y desgloses:
  - Plan Esencial: **Red Médica Limitada**
  - Plan Confort: **Red Médica Amplia**
  - Plan Diamante Elite: **Red Médica Elite**
- **Ayuda Económica de Maternidad Condicional:**
  - Monto actualizado: **"Ayuda económica por maternidad hasta $68,000 MXN"**.
  - **Regla de Negocio:** Se evalúa `hasFemaleMember`. Si en la cotización participan una o más mujeres (`gender === "M"`), el beneficio se incluye; si el perfil es exclusivamente de hombres, el beneficio de maternidad se oculta automáticamente.
- **Meses Sin Intereses:** Se eliminó la mención de "12 MSI" en el cotizador y se actualizó a **"3, 5 y 6 Meses Sin Intereses con tarjetas participantes"**.

---

### E. Botón CTA del Banner Inferior de Asesoría
- **Solicitud del Cliente:** Cambiar el botón rojo del banner *"¿Deseas personalizar coberturas para tu familia?"*.
- **Texto Anterior:** `Hablar con Oscar Sánchez`
- **Texto Implementado:** `Hablar con Ejecutivo OSanchez Seguros`
- **Archivo Modificado:** `src/components/quoter/NationalQuoter.tsx`

---

### F. Corrección Estética de Badges de las Tarjetas
- **Problema Reportado:** Las etiquetas *"OPCIÓN MÁS ELEGIDA"* y *"MÁXIMA COBERTURA VIP"* se cortaban en dos líneas deformando el diseño de la píldora superior.
- **Solución Técnica:** Se agregaron las clases `whitespace-nowrap`, `w-max`, `inline-block` y `z-10` en el contenedor del badge de `NationalQuoter.tsx`. Ahora permanecen en una sola línea horizontal perfecta y centrada sin riesgo de recorte en ninguna resolución.

---

### G. Actualización de Preguntas Frecuentes (FAQs) y Corrección de Marca
- **Solicitud del Cliente:** Textos oficiales exactos para las 4 preguntas frecuentes del cotizador, asegurando que donde decía "Sánchez Seguros" se coloque **"OSanchez Seguros"**:
  1. **¿Este cotizador tiene cobertura en toda la República Mexicana?**
     > *Sí. El cotizador calcula las tarifas de acuerdo a edad, sexo, estado y municipio Mexicano. (También puedes elegir cobertura mundial ) Al emitir tu póliza, cuentas con atención médica en hospitales y clínicas privadas de prestigio de tu localidad y nivel nacional según el plan elegido.*
  2. **¿Los precios calculados son oficiales de AXA Seguros?**
     > *Las cifras corresponden a los tabuladores paramétricos de AXA Flex Plus con tarifas cercanas a las oficiales para mostrar planes en 3 niveles: Limitado - Amplio y Elite con diferentes deducibles elegibles. Al comunicarte a OSanchez Seguros, se validaran requisitos de salud para el tramite de la emisión formal.*
  3. **¿Puedo pagar a Meses Sin Intereses?**
     > *Sí, en OSanchez Seguros tenemos promociones cada mes, consulta con tu ejecutivo las tarjetas y msi disponibles al armar el plan, así podrás diferir el pago de tu póliza de Gastos Médicos Mayores a 3 y 6 Meses Sin Intereses con bancos de México.*
  4. **¿Qué pasa después de completar mi cotización en línea?**
     > *Al presionar el botón de WhatsApp, se abre un enlace directo con OSánchez (agente certificado CNSF) con el desglose exacto de tu cotización ya prellenado, terminaremos el llenado de la solicitud requerida y documentos necesarios. Te ayudaremos a resolver dudas, ajustar coberturas especiales ( deducible, coaseguro, consultas, maternidad, emergencias y atención en el extranjero, etc. ) para formalizar tu trámite de forma 100% digital sin salir de casa.*
- **Archivo Modificado:** `src/app/(marketing)/cotizador/page.tsx`

---

## 🚀 3. Estrategia de SEO y Publicación en Buscadores Realizada

1. **Sitemap (`sitemap.ts`):**
   - Se asignó prioridad máxima `priority: 1.0` y `changeFrequency: "daily"` para `https://www.osanchezseguros.com/cotizador`.
2. **Metadatos y Tarjetas Sociales (`layout.tsx`):**
   - Title tag y meta description optimizadas para intención de búsqueda transaccional en México.
   - OpenGraph y Twitter Cards con imagen de alta resolución (`1200x630`) y URL canónica.
3. **Schemas JSON-LD Inyectados (`page.tsx`):**
   - **`FAQPage`:** Genera acordeones interactivos directamente en los resultados de Google.
   - **`BreadcrumbList`:** Estructura de migas de pan (*Inicio > Cotizador Online*).
   - **`WebApplication`:** Ficha de aplicación web interactiva financiera a costo $0 MXN.
4. **Envío Automatizado con IndexNow:**
   - Llave creada y desplegada en `public/c0712ad07965499298517228834928d1.txt`.
   - Envío a la API de **IndexNow** con respuesta exitosa **`HTTP 202 (Accepted)`** para rastreo instantáneo en **Bing**, **Yahoo**, **DuckDuckGo**, **Yandex** y motores afiliados.
5. **Google Search Console:**
   - Sitemap verificado y activo con estado *Success*.
   - Inspección y solicitud de indexación directa ejecutada para la URL `https://www.osanchezseguros.com/cotizador`.

---

## 📂 4. Archivos Modificados en el Repositorio
- `src/lib/calculators/nationalQuoterEngine.ts`
- `src/components/quoter/NationalQuoter.tsx`
- `src/app/(marketing)/cotizador/page.tsx`
- `src/app/(marketing)/cotizador/layout.tsx`
- `src/app/api/cotizador/route.ts`
- `src/app/sitemap.ts`
- `public/c0712ad07965499298517228834928d1.txt`

---

## 📌 5. Commits Realizados en esta Sesión
1. `92b7f60` — *feat(cotizador): update deductibles, 9% monthly factor, AMASFAC badge, and 3/5/6 MSI*
2. `9bd0617` — *feat(cotizador): update FAQ texts and CTA button to Hablar con Ejecutivo OSanchez Seguros*
3. `a6428f7` — *fix(cotizador): prevent badge wrapping and clipping with whitespace-nowrap and w-max*
4. `80cc992` — *fix(faq): replace Sanchez Seguros with OSanchez Seguros in FAQs*
5. `3143efe` — *feat(seo): optimize cotizador with WebApplication schema, FAQPage schema, Breadcrumbs, OpenGraph cards and sitemap priority*
6. `1bbbd20` — *feat(seo): add IndexNow verification key for instant search engine indexing*
7. `36e5e20` — *fix(cotizador): calibrate actuarial rates with official AXA Flex Plus quotes (18, 25, 35, 45, 50 years)*

---

## 🎯 6. Sesión 16 de Octubre de 2026 — Calibración Actuarial con Cotizaciones Reales de AXA
- **Solicitud del Cliente:** Oscar Sánchez reportó por WhatsApp que el cotizador arrojaba precios muy por encima de los tabuladores reales de AXA Flex Plus, enviando 5 cotizaciones oficiales en PDF con desglose neta, IVA y derechos.
- **Auditoría y Corrección de Tarifas:**
  - **18 años (Diamante Elite):** Cotizador anterior $17,750 ➔ **Calibrado a $17,472** (AXA Real: $17,464.75).
  - **25 años (Diamante Elite):** Cotizador anterior $20,625 ➔ **Calibrado a $16,461** (AXA Real: $16,466.68).
  - **35 años (Confort / Esmeralda):** Cotizador anterior $24,200 ➔ **Calibrado a $11,465** (AXA Real: $11,465.79).
  - **45 años (Confort / Esmeralda):** Cotizador anterior $41,200 ➔ **Calibrado a $16,810** (AXA Real: $16,811.69).
  - **50 años (Diamante Elite):** Cotizador anterior $75,600 ➔ **Calibrado a $53,760** (AXA Real: $53,768.00).
- **Ajuste de Multiplicadores:** Factor de Diamante Elite ajustado a 1.28x para alinearse con la proporción oficial frente a Esmeralda/Confort.
- **Despliegue:** Verificado en producción en `https://www.osanchezseguros.com/api/cotizador` con 99.98% de precisión frente a los PDFs oficiales de AXA.
