import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Credarc ESG website — Firebase project config (public client keys, safe to
// ship in the bundle; access is controlled by Realtime Database rules, not
// by keeping this object secret).
const firebaseConfig = {
  apiKey: "AIzaSyDzsgQnVdB-8xonrVtvyb2EXqimPeOq3Ng",
  authDomain: "credarc-esg-website.firebaseapp.com",
  databaseURL:
    "https://credarc-esg-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "credarc-esg-website",
  storageBucket: "credarc-esg-website.firebasestorage.app",
  messagingSenderId: "36602238319",
  appId: "1:36602238319:web:f83d4de9b20d271c2c449a",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
