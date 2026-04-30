import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  orderBy,
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

// ---- Manual Lead (from Admin Dashboard) ----
export async function createManualLead(data: {
  fullName: string;
  phone: string;
  email: string;
  insuranceType: string;
  source: string;
  notes?: string;
}) {
  const docRef = await addDoc(collection(db, "leads"), {
    ...data,
    status: "new",
    priority: "warm",
    score: 40,
    privacyConsent: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    privacyConsentDate: serverTimestamp(),
  });

  // Auto-add history entry for creation
  await addLeadHistoryEntry(docRef.id, {
    type: "note",
    note: `Lead creado manualmente. Fuente: ${data.source}${data.notes ? `. Notas: ${data.notes}` : ""}`,
  });

  return docRef.id;
}

// ---- Lead Status Update ----
export async function updateLeadStatus(leadId: string, newStatus: string) {
  const leadRef = doc(db, "leads", leadId);
  await updateDoc(leadRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });

  // Auto-add history entry for status change
  const statusLabels: Record<string, string> = {
    new: "Nuevo",
    contacted: "Contactado",
    qualified: "Calificado",
    proposal: "Propuesta",
    negotiation: "Negociación",
    won: "Ganado",
    lost: "Perdido",
    archived: "Archivado",
  };

  await addLeadHistoryEntry(leadId, {
    type: "status_change",
    note: `Estatus cambiado a: ${statusLabels[newStatus] || newStatus}`,
  });
}

// ---- Lead History (Subcollection) ----
export async function addLeadHistoryEntry(
  leadId: string,
  data: {
    type: "call" | "email" | "whatsapp" | "note" | "status_change" | "quote";
    note: string;
  }
) {
  const historyRef = collection(db, "leads", leadId, "history");
  const docRef = await addDoc(historyRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getLeadHistory(leadId: string) {
  const historyRef = collection(db, "leads", leadId, "history");
  const q = query(historyRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}
