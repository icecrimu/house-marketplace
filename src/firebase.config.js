import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9uNUvCGtVJqJVG3022DLT-xNcsHdPOYU",
  authDomain: "house-marketplace-78ac1.firebaseapp.com",
  projectId: "house-marketplace-78ac1",
  storageBucket: "house-marketplace-78ac1.appspot.com",
  messagingSenderId: "582317900200",
  appId: "1:582317900200:web:69f131edb8890a7a961d9d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
