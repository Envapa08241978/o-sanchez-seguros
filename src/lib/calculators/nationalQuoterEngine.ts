/**
 * Motor Actuarial y Geográfico Nacional para O Sanchez Seguros
 * Cobertura para toda la República Mexicana
 * Basado en parámetros oficiales de AXA Flex Plus y estándares CNSF
 */

export interface QuoterProfile {
  target: "solo" | "pareja" | "familia" | "padres";
  titularAge: number;
  titularGender: "H" | "M";
  partnerAge?: number;
  partnerGender?: "H" | "M";
  childrenAges?: number[];
  zipCode: string;
  deductible: number; // e.g. 20500, 27500, 39500, 56500
}

export interface StateInfo {
  name: string;
  zone: 1 | 2 | 3 | 4;
  zoneName: string;
  zoneMultiplier: number;
  topHospitals: string[];
}

export interface CalculatedPlan {
  id: string;
  name: string;
  insurer: string;
  tagline: string;
  badge?: string;
  isRecommended?: boolean;
  hospitalLevel: string;
  hospitalsIncluded: string[];
  deductible: number;
  coinsurance: string;
  coinsuranceMax: number;
  insuredSum: string;
  annualTotal: number;
  monthly12MSI: number;
  monthlyPayment: number;
  savingsVsIndividual: number;
  highlights: string[];
}

export interface QuoteCalculationResult {
  state: StateInfo;
  city: string;
  totalMembers: number;
  membersSummary: string;
  plans: CalculatedPlan[];
}

// Mapeo geográfico de los 32 estados de la República Mexicana por Código Postal
export function getStateFromZipCode(zip: string): StateInfo {
  const cleanZip = zip.padStart(5, "0").slice(0, 5);
  const prefix2 = parseInt(cleanZip.slice(0, 2), 10);

  // Zona 1: CDMX y Área Metropolitana (costo hospitalario más alto de México)
  if (prefix2 >= 1 && prefix2 <= 16) {
    return {
      name: "Ciudad de México",
      zone: 1,
      zoneName: "Zona Metropolitana Top",
      zoneMultiplier: 1.25,
      topHospitals: ["Centro Médico ABC (Santa Fe y Observatorio)", "Médica Sur", "Hospital Español", "Hospitales Ángeles"],
    };
  }
  if (prefix2 >= 50 && prefix2 <= 57) {
    return {
      name: "Estado de México",
      zone: 1,
      zoneName: "Zona Metropolitana",
      zoneMultiplier: 1.22,
      topHospitals: ["Hospitales Ángeles Lomas", "San José Satélite", "Star Médica Tlalnepantla", "Clínica Londres"],
    };
  }

  // Zona 2: Hubs de alta concentración médica (Nuevo León, Jalisco, Querétaro, Puebla)
  if (prefix2 >= 64 && prefix2 <= 67) {
    return {
      name: "Nuevo León",
      zone: 2,
      zoneName: "Zona Noreste Premium",
      zoneMultiplier: 1.18,
      topHospitals: ["Hospital Zambrano Hellion", "Hospital San José TecSalud", "Hospitales Ángeles Valle Oriente", "Doctors Hospital"],
    };
  }
  if (prefix2 >= 44 && prefix2 <= 49) {
    return {
      name: "Jalisco",
      zone: 2,
      zoneName: "Zona Occidente Premium",
      zoneMultiplier: 1.15,
      topHospitals: ["Hospital Puerta de Hierro (Andares)", "Hospital San Javier", "Hospitales Ángeles del Carmen", "Real San José"],
    };
  }
  if (prefix2 >= 76 && prefix2 <= 76) {
    return {
      name: "Querétaro",
      zone: 2,
      zoneName: "Zona Bajío",
      zoneMultiplier: 1.10,
      topHospitals: ["Hospital San José de Querétaro", "Hospitales Ángeles Querétaro", "Star Médica Querétaro", "Hospital H+"],
    };
  }
  if (prefix2 >= 72 && prefix2 <= 75) {
    return {
      name: "Puebla",
      zone: 2,
      zoneName: "Zona Centro-Puebla",
      zoneMultiplier: 1.10,
      topHospitals: ["Hospitales Ángeles Puebla", "Hospital Puebla", "Hospital Betania", "Christus Muguerza UPAEP"],
    };
  }

  // Zona 3: Noroeste, Norte y Centros Turísticos (Sonora, Baja California, Sinaloa, Chihuahua, Quintana Roo, Yucatán)
  if (prefix2 >= 83 && prefix2 <= 85) {
    return {
      name: "Sonora",
      zone: 3,
      zoneName: "Zona Noroeste (Sede Central)",
      zoneMultiplier: 1.00,
      topHospitals: ["Hospital CIMA Hermosillo", "Hospital San José Hermosillo y Guaymas", "Clínica del Noroeste", "San Diego de Alcalá"],
    };
  }
  if (prefix2 >= 21 && prefix2 <= 22) {
    return {
      name: "Baja California",
      zone: 3,
      zoneName: "Zona Noroeste Fronteriza",
      zoneMultiplier: 1.05,
      topHospitals: ["Hospitales Ángeles Tijuana", "Hospital del Prado", "Hospital Almater Mexicali", "Centro Médico Premier"],
    };
  }
  if (prefix2 >= 23 && prefix2 <= 23) {
    return {
      name: "Baja California Sur",
      zone: 3,
      zoneName: "Zona Península Sur",
      zoneMultiplier: 1.05,
      topHospitals: ["Hospital H+ Los Cabos", "Hospital Saint Luke", "BlueNet Hospitals Cabo", "Hospital Fidepaz La Paz"],
    };
  }
  if (prefix2 >= 80 && prefix2 <= 82) {
    return {
      name: "Sinaloa",
      zone: 3,
      zoneName: "Zona Noroeste-Sinaloa",
      zoneMultiplier: 1.02,
      topHospitals: ["Hospitales Ángeles Culiacán", "Hospital Cemsi", "Clínica Culiacán", "Hospital Sharp Mazatlán"],
    };
  }
  if (prefix2 >= 31 && prefix2 <= 33) {
    return {
      name: "Chihuahua",
      zone: 3,
      zoneName: "Zona Norte-Chihuahua",
      zoneMultiplier: 1.02,
      topHospitals: ["Hospitales Ángeles Ciudad Juárez y Chihuahua", "Hospital Star Médica", "Christus Muguerza del Parque"],
    };
  }
  if (prefix2 >= 25 && prefix2 <= 27) {
    return {
      name: "Coahuila",
      zone: 3,
      zoneName: "Zona Norte-Coahuila",
      zoneMultiplier: 1.00,
      topHospitals: ["Hospital La Concepción Saltillo", "San José de Monclova", "Hospitales Ángeles Torreón", "Sanatorio Español"],
    };
  }
  if (prefix2 >= 77 && prefix2 <= 77) {
    return {
      name: "Quintana Roo",
      zone: 3,
      zoneName: "Zona Caribe",
      zoneMultiplier: 1.05,
      topHospitals: ["Hospital Galenia Cancún", "Hospiten Cancún y Playa del Carmen", "Amerimed Cancún", "Costamed"],
    };
  }
  if (prefix2 >= 97 && prefix2 <= 97) {
    return {
      name: "Yucatán",
      zone: 3,
      zoneName: "Zona Península-Yucatán",
      zoneMultiplier: 1.00,
      topHospitals: ["Hospital Faro del Mayab", "Clínica de Mérida", "Star Médica Mérida", "Hospital Centro Médico de las Américas"],
    };
  }
  if (prefix2 >= 20 && prefix2 <= 20) {
    return {
      name: "Aguascalientes",
      zone: 3,
      zoneName: "Zona Bajío-Aguascalientes",
      zoneMultiplier: 0.98,
      topHospitals: ["Star Médica Aguascalientes", "Hospital Mac Aguascalientes", "Clínica Médica Norte"],
    };
  }
  if (prefix2 >= 36 && prefix2 <= 38) {
    return {
      name: "Guanajuato",
      zone: 3,
      zoneName: "Zona Bajío-Guanajuato",
      zoneMultiplier: 1.00,
      topHospitals: ["Hospitales Ángeles León", "Médica Campestre León", "Hospital Aranda de la Parra", "Hospital Mac Celaya"],
    };
  }
  if (prefix2 >= 78 && prefix2 <= 79) {
    return {
      name: "San Luis Potosí",
      zone: 3,
      zoneName: "Zona Centro-SLP",
      zoneMultiplier: 0.98,
      topHospitals: ["Hospitales Ángeles San Luis Potosí", "Hospital Lomas de San Luis", "Star Médica San Luis"],
    };
  }
  if (prefix2 >= 87 && prefix2 <= 89) {
    return {
      name: "Tamaulipas",
      zone: 3,
      zoneName: "Zona Noreste-Tamaulipas",
      zoneMultiplier: 0.98,
      topHospitals: ["Hospital Cemain Tampico", "Hospitales Ángeles Tampico", "Hospital Victoria de Reynosa"],
    };
  }

  // Zona 4: Resto de la República Mexicana
  const statesRest: Record<number, string> = {
    86: "Tabasco",
    91: "Veracruz",
    92: "Veracruz",
    93: "Veracruz",
    94: "Veracruz",
    95: "Veracruz",
    96: "Veracruz",
    68: "Oaxaca",
    69: "Oaxaca",
    70: "Oaxaca",
    71: "Oaxaca",
    29: "Chiapas",
    30: "Chiapas",
    39: "Guerrero",
    40: "Guerrero",
    41: "Guerrero",
    60: "Michoacán",
    61: "Michoacán",
    62: "Morelos",
    63: "Nayarit",
    90: "Tlaxcala",
    98: "Zacatecas",
    99: "Zacatecas",
    28: "Colima",
    34: "Durango",
    35: "Durango",
    42: "Hidalgo",
    43: "Hidalgo",
    24: "Campeche",
  };

  const stateName = statesRest[prefix2] || "México (Nacional)";
  return {
    name: stateName,
    zone: 4,
    zoneName: "Zona República Mexicana",
    zoneMultiplier: 0.94,
    topHospitals: ["Hospitales de Red Médica Nacional Certificada", "Hospitales Ángeles y Star Médica", "Clínicas Regionales de Convenio"],
  };
}

// Cálculo actuarial base de prima anual por persona en AXA Flex Plus
function calculateIndividualBasePremium(age: number, gender: "H" | "M"): number {
  let base = 14500;

  if (age <= 9) base = 16800;
  else if (age <= 17) base = 13500;
  else if (age <= 24) base = 14200;
  else if (age <= 29) base = 16500;
  else if (age <= 34) base = 19800;
  else if (age <= 39) base = 24200;
  else if (age <= 44) base = 31500;
  else if (age <= 49) base = 41200;
  else if (age <= 54) base = 56000;
  else if (age <= 59) base = 74500;
  else if (age <= 64) base = 98000;
  else base = 132000;

  // Factor de género (en edad reproductiva la tarifa femenina es ligeramente mayor por maternidad y ginecología)
  let genderFactor = 1.0;
  if (gender === "M") {
    if (age >= 18 && age <= 45) genderFactor = 1.18;
    else if (age > 45) genderFactor = 0.95;
  } else {
    if (age >= 50) genderFactor = 1.08;
  }

  return base * genderFactor;
}

// Multiplicador de deducible (a mayor deducible, menor prima)
function getDeductibleMultiplier(deductible: number): number {
  switch (deductible) {
    case 20500:
      return 1.15;
    case 27500:
      return 1.00; // Estándar AXA Flex Plus
    case 39500:
      return 0.88;
    case 56500:
      return 0.76;
    default:
      return 1.00;
  }
}

// Función principal de cálculo de cotización nacional
export function calculateNationalQuote(profile: QuoterProfile): QuoteCalculationResult {
  const state = getStateFromZipCode(profile.zipCode);
  const deductibleMult = getDeductibleMultiplier(profile.deductible || 27500);

  // Recopilar integrantes
  const members: { age: number; gender: "H" | "M"; label: string }[] = [];
  members.push({ age: profile.titularAge, gender: profile.titularGender, label: "Titular" });

  if ((profile.target === "pareja" || profile.target === "familia") && profile.partnerAge) {
    members.push({
      age: profile.partnerAge,
      gender: profile.partnerGender || (profile.titularGender === "H" ? "M" : "H"),
      label: "Pareja",
    });
  }

  if (profile.target === "familia" && profile.childrenAges && profile.childrenAges.length > 0) {
    profile.childrenAges.forEach((age, idx) => {
      members.push({ age, gender: idx % 2 === 0 ? "H" : "M", label: `Hijo/a ${idx + 1}` });
    });
  }

  // Evaluar si hay personas de sexo femenino en la póliza para habilitar ayuda de maternidad
  const hasFemaleMember = members.some((m) => m.gender === "M");

  // Descuento por volumen familiar (estándar AXA: descuento por póliza colectiva/familiar)
  let familyDiscount = 1.0;
  if (members.length === 2) familyDiscount = 0.94; // 6% desc.
  else if (members.length >= 3) familyDiscount = 0.88; // 12% desc.

  // Suma de primas base
  const totalBase = members.reduce(
    (sum, m) => sum + calculateIndividualBasePremium(m.age, m.gender),
    0
  );

  // Factor regional y deducible
  const adjustedBase = totalBase * state.zoneMultiplier * deductibleMult * familyDiscount;

  // Generación de los 3 niveles oficiales de AXA Flex Plus
  // Nivel 1: Flex Esencial (Red Médica Limitada)
  const esencialAnnual = Math.round(adjustedBase * 0.82);
  const planEsencial: CalculatedPlan = {
    id: "axa-flex-esencial",
    name: "AXA Flex Plus Esencial",
    insurer: "AXA Seguros",
    tagline: "Protección médica sólida al menor costo anual.",
    badge: "Más Accesible",
    hospitalLevel: "Red Médica Limitada",
    hospitalsIncluded: [
      `Hospitales de red general en ${state.name}`,
      "Atención de urgencias médicas 24/7 a nivel nacional",
      "Clínicas médicas y quirúrgicas certificadas",
    ],
    deductible: profile.deductible,
    coinsurance: "10%",
    coinsuranceMax: 64000,
    insuredSum: "$96,500,000 MXN",
    annualTotal: esencialAnnual,
    monthly12MSI: Math.round(esencialAnnual / 12),
    monthlyPayment: Math.round((esencialAnnual * 1.09) / 12),
    savingsVsIndividual: Math.round(totalBase * 0.18),
    highlights: [
      "Suma Asegurada de hasta $96,500,000 MXN",
      "Cobertura nacional contra accidentes y enfermedades",
      "Asistencia médica telefónica 24 horas",
      "3, 5 y 6 Meses Sin Intereses con tarjetas participantes",
    ],
  };

  // Nivel 2: Flex Confort / Esmeralda (Recomendado)
  const confortAnnual = Math.round(adjustedBase * 1.00);
  const planConfort: CalculatedPlan = {
    id: "axa-flex-confort",
    name: "AXA Flex Plus Confort",
    insurer: "AXA Seguros",
    tagline: "El equilibrio perfecto: amplia gama hospitalaria y precio óptimo.",
    badge: "Opción Más Elegida",
    isRecommended: true,
    hospitalLevel: "Red Médica Amplia",
    hospitalsIncluded: [
      ...state.topHospitals.slice(0, 2),
      `Hospitales privados de alta especialidad en ${state.name}`,
      "Acceso directo sin trámites engorrosos en urgencias",
    ],
    deductible: profile.deductible,
    coinsurance: "10%",
    coinsuranceMax: 64000,
    insuredSum: "$96,500,000 MXN",
    annualTotal: confortAnnual,
    monthly12MSI: Math.round(confortAnnual / 12),
    monthlyPayment: Math.round((confortAnnual * 1.09) / 12),
    savingsVsIndividual: Math.round(totalBase * 0.12),
    highlights: [
      "Cobertura en los hospitales privados de prestigio de tu estado",
      ...(hasFemaleMember ? ["Ayuda económica por maternidad hasta $68,000 MXN"] : []),
      "Cero Deducible por accidente personal",
      "Acompañamiento VIP en siniestros por Oscar Sánchez",
    ],
  };

  // Nivel 3: Flex Diamante Elite (Gama Máxima VIP Nacional e Internacional)
  const diamanteAnnual = Math.round(adjustedBase * 1.25);
  const planDiamante: CalculatedPlan = {
    id: "axa-flex-diamante",
    name: "AXA Flex Plus Diamante Elite",
    insurer: "AXA Seguros",
    tagline: "Acceso ilimitado a los mejores hospitales de México y el extranjero.",
    badge: "Máxima Cobertura VIP",
    hospitalLevel: "Red Médica Elite",
    hospitalsIncluded: [
      "Hospitales Ángeles, ABC Santa Fe/Observatorio, Médica Sur (CDMX)",
      "Hospital Zambrano Hellion / TecSalud (Monterrey)",
      "Hospital Puerta de Hierro (Guadalajara)",
      "Hospital CIMA y San José (Hermosillo)",
      "Cobertura médica de emergencia en el extranjero (USA)",
    ],
    deductible: profile.deductible,
    coinsurance: "10%",
    coinsuranceMax: 64000,
    insuredSum: "$96,500,000 MXN",
    annualTotal: diamanteAnnual,
    monthly12MSI: Math.round(diamanteAnnual / 12),
    monthlyPayment: Math.round((diamanteAnnual * 1.09) / 12),
    savingsVsIndividual: 0,
    highlights: [
      "Libertad total de elegir cualquier hospital privado de México",
      "Tabulador médico Roble (los honorarios más altos cubiertos)",
      "Emergencia médica en Estados Unidos y extranjero",
      "Atención preferencial directa con el agente titular",
    ],
  };

  const membersSummary =
    members.length === 1
      ? `1 integrante (${members[0].gender === "H" ? "Hombre" : "Mujer"} de ${members[0].age} años)`
      : `${members.length} integrantes (${members.map((m) => `${m.label}: ${m.age}a`).join(", ")})`;

  return {
    state,
    city: state.name,
    totalMembers: members.length,
    membersSummary,
    plans: [planEsencial, planConfort, planDiamante],
  };
}
