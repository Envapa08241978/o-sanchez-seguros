import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVBTL5sF3Rhf5Abrf4uTWFh3TJeJ_vzCg",
  authDomain: "o-sanchez-seguros.firebaseapp.com",
  projectId: "o-sanchez-seguros",
  storageBucket: "o-sanchez-seguros.firebasestorage.app",
  messagingSenderId: "547838159512",
  appId: "1:547838159512:web:5b7218b65b8d75caab3eed",
  measurementId: "G-45R76JVTZS"
};

// Initialize Firebase (prevent duplicate initialization in Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore (Database)
const db = getFirestore(app);

// Initialize Analytics conditionally (it only works on the browser window, not server)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
