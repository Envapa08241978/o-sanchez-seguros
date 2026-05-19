"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Rect,
  Circle,
} from "@react-pdf/renderer";
import type { QuoteMember, QuoteSection } from "@/lib/firebase/firestore";

// ── Brand Colors — Aligned with osanchezseguros.com ──
const COLORS = {
  navy: "#202F71",        // --color-primary (brand)
  navyLight: "#2b3e94",   // --color-primary-light
  accent: "#D32020",      // --color-accent (red)
  accentDark: "#b31b1b",  // --color-accent-dark
  white: "#FFFFFF",
  cream: "#FFFAF3",       // --background
  gray: "#6E6965",        // --text-muted
  grayLight: "#E5E7EB",
  grayDark: "#374151",
  text: "#1F2937",
  checkGreen: "#059669",
  secondary: "#2B818C",   // --color-secondary
};

// ── SVG Icon Components for PDF ──

function ShieldIcon({ color = COLORS.accent }: { color?: string }) {
  return (
    <Svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }}>
      <Path
        d="M16 3L5 8v7c0 7.5 4.7 14.5 11 17 6.3-2.5 11-9.5 11-17V8L16 3z"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
      />
      <Rect x="14" y="10" width="4" height="12" rx="1" fill={color} />
      <Rect x="10" y="14" width="12" height="4" rx="1" fill={color} />
    </Svg>
  );
}

function TrendingUpIcon({ color = COLORS.accent }: { color?: string }) {
  return (
    <Svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }}>
      <Path
        d="M4 24l8-8 4 4 12-12"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
      />
      <Path
        d="M20 8h8v8"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
      />
    </Svg>
  );
}

function ShieldCheckIcon({ color = COLORS.accent }: { color?: string }) {
  return (
    <Svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }}>
      <Path
        d="M16 3L5 8v7c0 7.5 4.7 14.5 11 17 6.3-2.5 11-9.5 11-17V8L16 3z"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M11 16l3.5 3.5L21 13"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
      />
    </Svg>
  );
}

function HeartShieldIcon({ color = COLORS.accent }: { color?: string }) {
  return (
    <Svg viewBox="0 0 32 32" style={{ width: 28, height: 28 }}>
      <Circle cx="16" cy="16" r="13" fill="none" stroke={color} strokeWidth={1.8} />
      <Path
        d="M16 24s-6-4.35-6-8.5c0-2.2 1.8-4 4-4 1.3 0 2 .7 2 .7s.7-.7 2-.7c2.2 0 4 1.8 4 4C22 19.65 16 24 16 24z"
        fill={color}
      />
    </Svg>
  );
}

// ── Styles ──
const s = StyleSheet.create({
  // Pages
  pageCover: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.navy,
    padding: 60,
    position: "relative",
  },
  pageContent: {
    flexDirection: "column",
    backgroundColor: COLORS.cream,
    padding: 50,
    paddingBottom: 70,
    position: "relative",
  },
  pageClosing: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.navy,
    padding: 60,
    position: "relative",
  },

  // Cover
  coverLogo: {
    width: 80,
    height: 80,
    marginBottom: 24,
    borderRadius: 12,
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 1,
  },
  coverTitle360: {
    fontSize: 42,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  coverSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 40,
    letterSpacing: 2,
  },
  coverPrepared: {
    fontSize: 13,
    color: COLORS.accent,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  coverQuoteNum: {
    fontSize: 10,
    color: COLORS.white,
    textAlign: "center",
    marginTop: 8,
    opacity: 0.5,
  },
  coverLine: {
    width: 80,
    height: 2,
    backgroundColor: COLORS.accent,
    marginVertical: 24,
  },
  coverAgentInfo: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  coverAgentText: {
    fontSize: 9,
    color: COLORS.white,
    opacity: 0.5,
    textAlign: "center",
  },

  // Page header
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.navy,
    paddingBottom: 12,
  },
  headerBrand: {
    fontSize: 10,
    color: COLORS.navy,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  headerDate: {
    fontSize: 9,
    color: COLORS.gray,
  },

  // Page footer
  pageFooter: {
    position: "absolute",
    bottom: 25,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: COLORS.gray,
  },

  // Vision Strategic page
  visionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.navy,
    marginBottom: 6,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    paddingLeft: 14,
  },
  visionSubtitle: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 30,
    paddingLeft: 18,
  },
  visionCardsRow: {
    flexDirection: "row",
    gap: 16,
  },
  visionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
    borderTopWidth: 3,
    borderTopColor: COLORS.navy,
  },
  visionCardIconWrap: {
    marginBottom: 10,
  },
  visionCardTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.navy,
    marginBottom: 8,
  },
  visionCardText: {
    fontSize: 9,
    color: COLORS.gray,
    lineHeight: 1.5,
  },

  // Section pages
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.navy,
    textAlign: "center",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 8,
  },
  sectionDivider: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.accent,
    alignSelf: "center",
    marginBottom: 24,
  },

  // Detail card
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 24,
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.navy,
    width: "42%",
  },
  detailValue: {
    fontSize: 10,
    color: COLORS.grayDark,
    flex: 1,
  },
  detailHighlight: {
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: "bold",
    flex: 1,
  },

  // Integrantes badge
  membersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
  },
  memberBadge: {
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  memberBadgeText: {
    fontSize: 9,
    color: COLORS.white,
    fontWeight: "bold",
  },

  // Check items
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  checkIcon: {
    fontSize: 11,
    color: COLORS.checkGreen,
    marginRight: 8,
    marginTop: 1,
  },
  checkText: {
    fontSize: 10,
    color: COLORS.grayDark,
    flex: 1,
    lineHeight: 1.5,
  },
  checkBold: {
    fontWeight: "bold",
    color: COLORS.navy,
  },

  // Closing
  closingLogo: {
    width: 60,
    height: 60,
    marginBottom: 20,
    borderRadius: 8,
  },
  closingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 16,
  },
  closingMessage: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 1.8,
    maxWidth: 420,
    marginBottom: 30,
  },
  closingLine: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.accent,
    marginBottom: 20,
  },
  closingContact: {
    fontSize: 10,
    color: COLORS.accent,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 4,
  },
  closingContactSub: {
    fontSize: 9,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.6,
  },
  closingLegal: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
  },
  closingLegalText: {
    fontSize: 7,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.35,
    lineHeight: 1.5,
  },

  // Generic
  bold: { fontWeight: "bold" },
});

// ── Helpers ──
function formatMembers(members: QuoteMember[], indices: number[]): string {
  return indices
    .map((i) => {
      const m = members[i];
      return m ? `${m.gender}${m.age}` : "";
    })
    .filter(Boolean)
    .join(", ");
}

function formatDate(): string {
  return new Date().toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Known GMM field labels
const GMM_LABELS: Record<string, string> = {
  sumaAsegurada: "Suma Asegurada",
  gamaHospitalaria: "Gama Hospitalaria",
  deducible: "Deducible",
  ceroDeducible: "Cero Deducible",
  redHospitalaria: "Red Hospitalaria",
  coberturasEspeciales: "Coberturas Especiales",
  internacional: "Internacional",
  costo: "Costo Anual",
  descuentoFamiliar: "Descuento Familiar",
  costoTotal: "Costo Total",
};

const AHORRO_LABELS: Record<string, string> = {
  sumaAsegurada: "Suma Asegurada",
  ahorroBuscado: "Ahorro Buscado",
  inversionAnual: "Inversión Anual",
  ahorroAnio10: "Ahorro al Año 10",
  ahorroAnio15: "Ahorro al Año 15",
  ahorroAnio20: "Ahorro al Año 20",
  recompensasPaquete: "Recompensas Paquete",
  recompensaEconomica: "Recompensa Económica",
  indemnizacionSupervivencia: "Indemnización por Supervivencia",
};

const VIDA_LABELS: Record<string, string> = {
  sumaAsegurada: "Suma Asegurada",
  primaAnual: "Prima Anual",
  beneficiarios: "Beneficiarios",
  coberturasAdicionales: "Coberturas Adicionales",
  costoTotal: "Costo Total",
};

function getLabels(type: string): Record<string, string> {
  switch (type) {
    case "gmm": return GMM_LABELS;
    case "ahorro": return AHORRO_LABELS;
    case "vida": return VIDA_LABELS;
    default: return {};
  }
}

function getSectionNumber(idx: number): string {
  const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return numerals[idx] || String(idx + 1);
}

// Special fields that render with checkmark instead of table row
const CHECK_FIELDS = new Set([
  "ceroDeducible",
  "internacional",
  "coberturasEspeciales",
]);

// ── Vision Card Icon Selector ──
function getVisionIcon(key: string) {
  switch (key) {
    case "salud":
      return <ShieldIcon color={COLORS.accent} />;
    case "crecimiento":
      return <TrendingUpIcon color={COLORS.accent} />;
    case "sinergia":
      return <ShieldCheckIcon color={COLORS.accent} />;
    default:
      return <HeartShieldIcon color={COLORS.accent} />;
  }
}

// ── Document Component ──

type Props = {
  quoteNumber: string;
  clientName: string;
  members: QuoteMember[];
  sections: QuoteSection[];
  finalMessage: string;
};

export default function QuotePDFTemplate({
  quoteNumber,
  clientName,
  members,
  sections,
  finalMessage,
}: Props) {
  const date = formatDate();
  const currentYear = new Date().getFullYear();

  // Determine which vision cards to show based on sections present
  const hasGMM = sections.some((s) => s.type === "gmm");
  const hasAhorro = sections.some((s) => s.type === "ahorro");
  const hasVida = sections.some((s) => s.type === "vida");

  const visionCards: { iconKey: string; title: string; desc: string }[] = [];
  if (hasGMM) {
    visionCards.push({
      iconKey: "salud",
      title: "Salud Inmediata",
      desc: "Protección contra imprevistos médicos con la red hospitalaria más prestigiosa de México y cobertura internacional.",
    });
  }
  if (hasAhorro || hasVida) {
    visionCards.push({
      iconKey: "crecimiento",
      title: "Crecimiento Patrimonial",
      desc: "Ahorro garantizado en UDIs, protegiendo el poder adquisitivo frente a la inflación y generando rendimientos sólidos.",
    });
  }
  if (sections.length >= 2) {
    visionCards.push({
      iconKey: "sinergia",
      title: "Sinergia Fiscal",
      desc: "Un plan diseñado para que la estabilidad de hoy construya el patrimonio del mañana de forma automática.",
    });
  }
  // Fallback: if less than 2 cards, fill
  while (visionCards.length < 2) {
    visionCards.push({
      iconKey: "proteccion",
      title: "Protección Integral",
      desc: "Cobertura diseñada a la medida de sus necesidades con las mejores condiciones del mercado.",
    });
  }

  return (
    <Document>
      {/* ═══ PAGE 1: COVER ═══ */}
      <Page size="LETTER" style={s.pageCover}>
        {/* Logo */}
        <Image src="/images/icon-512.png" style={s.coverLogo} />

        <View style={s.coverLine} />
        <Text style={s.coverTitle}>
          Blindaje Familiar <Text style={s.coverTitle360}>360°</Text>
        </Text>
        <Text style={s.coverSubtitle}>
          Salud Integral y Estrategia Patrimonial de Largo Plazo
        </Text>
        <View style={s.coverLine} />
        <Text style={s.coverPrepared}>
          Preparado para: {clientName} — {new Date().toLocaleDateString("es-MX", { month: "long", year: "numeric" }).replace(/^\w/, (c) => c.toUpperCase())}
        </Text>
        <Text style={s.coverQuoteNum}>{quoteNumber}</Text>
        <View style={s.coverAgentInfo}>
          <Text style={s.coverAgentText}>O SANCHEZ SEGUROS</Text>
          <Text style={s.coverAgentText}>
            Oscar Sánchez Aguirre · Asesor Certificado
          </Text>
          <Text style={s.coverAgentText}>Tel: 662 182 2481 · www.osanchezseguros.com</Text>
        </View>
      </Page>

      {/* ═══ PAGE 2: VISIÓN ESTRATÉGICA ═══ */}
      <Page size="LETTER" style={s.pageContent}>
        {/* Header */}
        <View style={s.pageHeader}>
          <Text style={s.headerBrand}>O SANCHEZ SEGUROS</Text>
          <Text style={s.headerDate}>{date}</Text>
        </View>

        <Text style={s.visionTitle}>VISIÓN ESTRATÉGICA DEL PAQUETE</Text>
        <Text style={s.visionSubtitle}>
          Un enfoque integral diseñado para proteger y hacer crecer el
          patrimonio de {clientName}
        </Text>

        <View style={s.visionCardsRow}>
          {visionCards.map((card, i) => (
            <View key={i} style={s.visionCard}>
              <View style={s.visionCardIconWrap}>
                {getVisionIcon(card.iconKey)}
              </View>
              <Text style={s.visionCardTitle}>{card.title}</Text>
              <Text style={s.visionCardText}>{card.desc}</Text>
            </View>
          ))}
        </View>

        {/* Integrantes summary */}
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
              color: COLORS.navy,
              marginBottom: 8,
            }}
          >
            Integrantes cubiertos en esta propuesta:
          </Text>
          <View style={s.membersRow}>
            {members.map((m, i) => (
              <View key={i} style={s.memberBadge}>
                <Text style={s.memberBadgeText}>
                  {m.gender}{m.age} — {m.relationship}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={s.pageFooter}>
          <Text style={s.footerText}>O Sanchez Seguros · www.osanchezseguros.com</Text>
          <Text style={s.footerText}>{quoteNumber}</Text>
        </View>
      </Page>

      {/* ═══ SECTION PAGES ═══ */}
      {sections.map((section, sIdx) => {
        const labels = getLabels(section.type);
        const membersStr = formatMembers(members, section.memberIndices);
        const sectionNum = getSectionNumber(sIdx);

        // Separate check fields from table fields
        const tableFields: [string, string][] = [];
        const checkFields: [string, string][] = [];

        Object.entries(section.fields).forEach(([key, val]) => {
          if (!val) return;
          if (CHECK_FIELDS.has(key)) {
            checkFields.push([key, val]);
          } else {
            tableFields.push([key, val]);
          }
        });

        // Determine cost fields for highlight
        const costKeys = new Set(["costoTotal", "costo", "primaAnual", "inversionAnual"]);

        return (
          <Page key={sIdx} size="LETTER" style={s.pageContent}>
            {/* Header */}
            <View style={s.pageHeader}>
              <Text style={s.headerBrand}>O SANCHEZ SEGUROS</Text>
              <Text style={s.headerDate}>{date}</Text>
            </View>

            {/* Section Title */}
            <Text style={s.sectionTitle}>
              {sectionNum}. {section.title}
            </Text>
            <View style={s.sectionDivider} />

            {/* Members */}
            <View style={s.membersRow}>
              {section.memberIndices.map((mi) => {
                const m = members[mi];
                if (!m) return null;
                return (
                  <View key={mi} style={s.memberBadge}>
                    <Text style={s.memberBadgeText}>
                      {m.gender}{m.age}
                    </Text>
                  </View>
                );
              })}
              <View
                style={{
                  backgroundColor: COLORS.accent,
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{ fontSize: 9, color: COLORS.white, fontWeight: "bold" }}
                >
                  {section.memberIndices.length} integrantes
                </Text>
              </View>
            </View>

            {/* Detail Card */}
            <View style={s.detailCard}>
              {/* Table rows */}
              {tableFields.map(([key, val], i) => (
                <View
                  key={key}
                  style={[
                    s.detailRow,
                    i === tableFields.length - 1 && checkFields.length === 0
                      ? { borderBottomWidth: 0 }
                      : {},
                  ]}
                >
                  <Text style={s.detailLabel}>
                    {labels[key] || key}
                  </Text>
                  <Text
                    style={costKeys.has(key) ? s.detailHighlight : s.detailValue}
                  >
                    {val}
                  </Text>
                </View>
              ))}

              {/* Check items */}
              {checkFields.length > 0 && (
                <View style={{ marginTop: 12 }}>
                  {checkFields.map(([key, val]) => (
                    <View key={key} style={s.checkRow}>
                      <Text style={s.checkIcon}>✓</Text>
                      <Text style={s.checkText}>
                        <Text style={s.checkBold}>
                          {labels[key] || key}:
                        </Text>{" "}
                        {val}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={s.pageFooter}>
              <Text style={s.footerText}>
                O Sanchez Seguros · www.osanchezseguros.com
              </Text>
              <Text style={s.footerText}>{quoteNumber}</Text>
            </View>
          </Page>
        );
      })}

      {/* ═══ CLOSING PAGE ═══ */}
      <Page size="LETTER" style={s.pageClosing}>
        <Image src="/images/icon-512.png" style={s.closingLogo} />
        <Text style={s.closingTitle}>
          Protegemos lo que más importa
        </Text>
        <View style={s.closingLine} />
        <Text style={s.closingMessage}>
          {finalMessage ||
            `Estimado(a) ${clientName}, esta propuesta ha sido diseñada especialmente para cubrir las necesidades de protección integral de su familia. Quedo a sus órdenes para resolver cualquier duda y avanzar juntos hacia la tranquilidad financiera.`}
        </Text>
        <View style={s.closingLine} />
        <Text style={s.closingContact}>
          Oscar Sánchez Aguirre
        </Text>
        <Text style={s.closingContactSub}>
          Asesor Certificado de Seguros
        </Text>
        <Text style={s.closingContactSub}>
          Tel: 662 182 2481 · admin@osanchezseguros.com
        </Text>
        <Text style={s.closingContactSub}>
          www.osanchezseguros.com
        </Text>
        <Text style={s.closingContactSub}>
          Hermosillo, Sonora, México
        </Text>

        <View style={s.closingLegal}>
          <Text style={s.closingLegalText}>
            Este documento es una propuesta informativa y no constituye un contrato de seguro. Las condiciones finales están sujetas a la aprobación de la aseguradora. Cotización {quoteNumber} · Vigencia de la propuesta: 30 días a partir de la fecha de emisión. © {currentYear} O Sanchez Seguros.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
