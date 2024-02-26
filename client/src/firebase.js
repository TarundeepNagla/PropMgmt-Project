// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "propmgmt-project.firebaseapp.com",
  projectId: "propmgmt-project",
  storageBucket: "propmgmt-project.appspot.com",
  messagingSenderId: "1082154726812",
  appId: "1:1082154726812:web:8535a3f0fa1de0e2454459"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
