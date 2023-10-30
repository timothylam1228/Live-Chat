import { db, firebaseApp } from "../firebase.config"
import { collection } from "firebase/firestore"
import { doc, setDoc, updateDoc } from "firebase/firestore"

type UserProfile = {
  displayName: string | null
  email: string | null
  createdAt: Date
}

export async function createUserProfile(user: UserProfile): Promise<void> {
  // 1. create a new collection called users
  const userRef = collection(db, "users")
  // 2. create a new document with the user's email as the document id
  // 3. set the data to the user object
  await setDoc(doc(userRef, user.email!), {
    displayName: user.displayName,
    email: user.email,
    createdAt: user.createdAt,
  })
}
