import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  runTransaction,
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

// ---- Delete Lead (and its history subcollection) ----
export async function deleteLead(leadId: string) {
  // First, delete all history subcollection documents
  const historyRef = collection(db, "leads", leadId, "history");
  const historySnapshot = await getDocs(historyRef);
  const deletePromises = historySnapshot.docs.map((d) =>
    deleteDoc(doc(db, "leads", leadId, "history", d.id))
  );
  await Promise.all(deletePromises);

  // Then delete the lead document itself
  await deleteDoc(doc(db, "leads", leadId));
}


// ---- Quotes System ----

export type QuoteMember = {
  gender: "H" | "M";
  age: number;
  relationship: string;
};

export type QuoteSection = {
  type: string;
  title: string;
  memberIndices: number[];
  fields: Record<string, string>;
};

export type QuoteData = {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  members: QuoteMember[];
  sections: QuoteSection[];
  finalMessage: string;
  leadId?: string;
};

// Generate next sequential quote number: OSS-YYYY-XXXX
export async function getNextQuoteNumber(): Promise<string> {
  const currentYear = new Date().getFullYear();
  const counterRef = doc(db, "counters", "quotes");

  const newNumber = await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);

    if (!counterDoc.exists()) {
      // First quote ever
      transaction.set(counterRef, {
        lastNumber: 1,
        year: currentYear,
        prefix: "OSS",
      });
      return 1;
    }

    const data = counterDoc.data();
    let nextNumber = (data.lastNumber || 0) + 1;

    // Reset counter if year changed
    if (data.year !== currentYear) {
      nextNumber = 1;
    }

    transaction.update(counterRef, {
      lastNumber: nextNumber,
      year: currentYear,
    });

    return nextNumber;
  });

  const paddedNumber = String(newNumber).padStart(4, "0");
  return `OSS-${currentYear}-${paddedNumber}`;
}

// Create a quote and save to Firestore
export async function createQuote(data: QuoteData) {
  const quoteNumber = await getNextQuoteNumber();

  const docRef = await addDoc(collection(db, "quotes"), {
    quoteNumber,
    ...data,
    status: "draft",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return { id: docRef.id, quoteNumber };
}

// Get all quotes ordered by creation date
export async function getQuotes() {
  const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// Update quote status
export async function updateQuoteStatus(
  quoteId: string,
  newStatus: "draft" | "sent" | "accepted" | "expired"
) {
  const quoteRef = doc(db, "quotes", quoteId);
  await updateDoc(quoteRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
}

// Delete a quote
export async function deleteQuote(quoteId: string) {
  await deleteDoc(doc(db, "quotes", quoteId));
}
