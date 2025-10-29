// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYK6Tqt64QXLiDIKNWtFKzSsM-bfLAGQA",
  authDomain: "mi-ecommerce-38650.firebaseapp.com",
  projectId: "mi-ecommerce-38650",
  storageBucket: "mi-ecommerce-38650.firebasestorage.app",
  messagingSenderId: "367922758197",
  appId: "1:367922758197:web:755d4905ed9dbd4551677c",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
