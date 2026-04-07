import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { LeadFormData, ContactFormData } from "@/lib/schemas/lead.schema";

// ---- Leads ----
export async function createLead(
  data: LeadFormData & { source: string; city?: string; state?: string }
) {
  const docRef = await addDoc(collection(db, "leads"), {
    ...data,
    status: "new",
    priority: "warm",
    score: 50,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    privacyConsentDate: serverTimestamp(),
  });
  return docRef.id;
}

// ---- Contact Submissions ----
export async function createContactSubmission(data: ContactFormData) {
  const docRef = await addDoc(collection(db, "contactSubmissions"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
