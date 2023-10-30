import { Timestamp } from "firebase/firestore"

interface User {
  id: string
  displayName: string
  email: string
  createdAt: Timestamp
}
const UserItem = (props: { user: User }) => {
  const { id, displayName, email, createdAt } = props.user
  return (
    <div className="border-2 w-full py-2 rounded-md border-blue-400">
      <div>{displayName}</div>
      <div>{email}</div>
      <div>
        {createdAt && new Date(createdAt.toDate()).toLocaleString().toString()}
      </div>
    </div>
  )
}
export default UserItem
