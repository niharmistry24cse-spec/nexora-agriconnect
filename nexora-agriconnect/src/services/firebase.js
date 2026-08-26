import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAVAq6vRpOCKOsZxhPptTN_zXDDUnEjHPg',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'nexora-agriconnect.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'nexora-agriconnect',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'nexora-agriconnect.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '724511148363',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:724511148363:web:532de3b76f55e25c1a80ce',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-3616E3T8D9'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
};