import type { InsuranceType } from "./insurance";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost"
  | "archived";

export type LeadSource =
  | "website_form"
  | "chatbot"
  | "whatsapp"
  | "phone"
  | "referral"
  | "social_media"
  | "google_ads"
  | "meta_ads"
  | "walk_in";

export type LeadPriority = "hot" | "warm" | "cold";

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  insuranceType: InsuranceType;
  subType?: string;
  currentInsurer?: string;
  budget?: "bajo" | "medio" | "alto" | "premium";
  score: number;
  priority: LeadPriority;
  status: LeadStatus;
  source: LeadSource;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  city: string;
  state: string;
  country: string;
  chatSessionId?: string;
  chatSummary?: string;
  assignedTo?: string;
  notes?: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  convertedAt?: Date;
  privacyConsent: boolean;
  privacyConsentDate: Date;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  insuranceType: InsuranceType;
  message?: string;
  privacyConsent: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: "consulta" | "siniestro" | "cotizacion" | "queja";
}
