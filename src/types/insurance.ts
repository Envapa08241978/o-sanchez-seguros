export type InsuranceType =
  | "gmm"
  | "fronterizo"
  | "vida"
  | "auto"
  | "empresarial"
  | "otro";

export interface InsuranceProduct {
  id: InsuranceType;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  highlights: string[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  specialties: string[];
  insurers: string[];
  emergencyAvailable: boolean;
  tier: "premium" | "standard";
  imageUrl?: string;
  website?: string;
}
