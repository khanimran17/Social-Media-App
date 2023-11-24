// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJEXqyyHmeHQeKEHqXCyd8ZXIBXj7II2E",
  authDomain: "social-media-app-6e116.firebaseapp.com",
  projectId: "social-media-app-6e116",
  storageBucket: "social-media-app-6e116.appspot.com",
  messagingSenderId: "543684050784",
  appId: "1:543684050784:web:5aeda4595f6532a009a805"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)