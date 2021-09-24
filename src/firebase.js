import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB7t7VxVxaUrQVIsdAhvg7PtYTOZ3gW4PU",
  authDomain: "chat-application-88c1a.firebaseapp.com",
  projectId: "chat-application-88c1a",
  storageBucket: "chat-application-88c1a.appspot.com",
  messagingSenderId: "556000263145",
  appId: "1:556000263145:web:b01fb8112ea92bea4e2978"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();
