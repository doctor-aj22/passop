// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYAFdNPGuyvo9gEZ8qku6wVUxBDufk9So",
  authDomain: "passop-c4403.firebaseapp.com",
  projectId: "passop-c4403",
  storageBucket: "passop-c4403.firebasestorage.app",
  messagingSenderId: "740861423850",
  appId: "1:740861423850:web:4aafe487eaf5804a412793",
  measurementId: "G-07HZ53XKNG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);