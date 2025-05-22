// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGZxdHm6VojWGyz6AHczOTxKChfFGBEgk",
  authDomain: "ww2-planes-f224f.firebaseapp.com",
  projectId: "ww2-planes-f224f",
  storageBucket: "ww2-planes-f224f.appspot.com", // fixed typo here too
  messagingSenderId: "994342032695",
  appId: "1:994342032695:web:5930446611c3aa12e436b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Connect Firestore
export const db = getFirestore(app);
