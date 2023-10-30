// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth" // New import

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBlV5ZOaM6IFBSfjpa558vsnKUx2kI7oA",
  authDomain: "live-chat-dd6a8.firebaseapp.com",
  projectId: "live-chat-dd6a8",
  storageBucket: "live-chat-dd6a8.appspot.com",
  messagingSenderId: "967374765886",
  appId: "1:967374765886:web:80a00d0c8d8e6c81b7366f",
  measurementId: "G-WVJGW76C3S",
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)


const analytics = getAnalytics(firebaseApp)
