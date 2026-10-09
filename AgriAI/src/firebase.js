import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


// Values come from the Firebase console (Project settings → Your apps).
// Set them in .env locally and in the Vercel project settings.

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

  appId: import.meta.env.VITE_FIREBASE_APP_ID

};


// The app still runs without Firebase; login and history are just disabled.

export const firebaseReady = Object.values(firebaseConfig).every(Boolean);


const app = firebaseReady ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;

export const db = app ? getFirestore(app) : null;

export const googleProvider = new GoogleAuthProvider();
