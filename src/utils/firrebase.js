// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAmgLgA_4JvdPh4APg4v-Sd3HNzCIV9ed4",
  authDomain: "netflix-gpt-6c7f6.firebaseapp.com",
  projectId: "netflix-gpt-6c7f6",
  storageBucket: "netflix-gpt-6c7f6.firebasestorage.app",
  messagingSenderId: "694257932594",
  appId: "1:694257932594:web:05baebb46705770d395f2b",
  measurementId: "G-C2HWZ415T3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
