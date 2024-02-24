import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKm2q3mPajQozmGiYffCAZUWx1XGwnut8",
  authDomain: "feladatsor-15604.firebaseapp.com",
  projectId: "feladatsor-15604",
  storageBucket: "feladatsor-15604.appspot.com",
  messagingSenderId: "1029503388169",
  appId: "1:1029503388169:web:92edea737387963b6146d8",
  measurementId: "G-6NHMF62TVX"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();