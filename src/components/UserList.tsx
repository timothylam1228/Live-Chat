import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"

import { useEffect, useState } from "react"
import UserItem from "./UserItem"

const UserList = () => {
  const [users, setUsers] = useState<any>()
  const fetchUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    const document: Array<any> = []
    querySnapshot.forEach((doc) => {
      document.push({ ...doc.data(), id: doc.id })
    })
    setUsers(document)
  }
  useEffect(() => {
    fetchUser()
  }, [])
  if (!users) return null

  return (
    <div className="mx-12 text-center">
      <div className="font-extrabold text-3xl">New User</div>
      <div className="grid grid-cols-3 gap-4">
        {users?.map((user: any) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UserList
