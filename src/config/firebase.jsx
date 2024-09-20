// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIDKHoLJu_5Ji51N_w7ri_XymWA4J98j8",
  authDomain: "vite-contact-670ba.firebaseapp.com",
  projectId: "vite-contact-670ba",
  storageBucket: "vite-contact-670ba.appspot.com",
  messagingSenderId: "602825223401",
  appId: "1:602825223401:web:e72578d544415af3de5478"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);