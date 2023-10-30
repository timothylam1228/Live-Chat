import React from "react"
import { DocumentData } from "firebase/firestore"

const Room = (props: { room: DocumentData }) => {
  const { room } = props
  const { displayName, creator, createdAt } = room
  if (!room) return null
  return (
    <div className=" justify-between flex flex-col border-2 w-full h-36 rounded-md hover:bg-black hover:text-white cursor-pointer transition-all duration-300 flex-wrap">
      <div></div>
      <div className="font-bold">{displayName}</div>
      <div>
        <div>By - {room.creator}</div>
        <div>
          At - {room.createdAt && room.createdAt.toDate().toDateString()}
        </div>
      </div>
    </div>
  )
}
export default Room
