import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useRoom } from "../providers/RoomProvider"
import NotFound from "./NotFound"
import { useMessage } from "../providers/MessageProvider"
import { useAuth } from "../providers/AuthProvider"

const Room = () => {
  const { id } = useParams<{ id: string }>()
  const [room, setRoom] = useState<any>({})
  const [message, setMessage] = useState<string>("")
  const { getRoomById } = useRoom()
  const { user } = useAuth()
  const { setId, messages, sendMessage, loading } = useMessage()
  // fetch user from firestore and display them
  // fetch all rooms from firestore and display them
  useEffect(() => {
    if (!id) return
    const room = getRoomById(id)
    room.then((data) => setRoom(data)).then(() => setId(id))
  }, [id])

  const handleSendMessage = () => {
    sendMessage(message, user!.displayName || "")
    setMessage("")
  }

  if (!room) {
    return <NotFound />
  }

  return (
    <div className="w-full px-12 mt-12 flex flex-col items-center justify-center">
      <div className="w-fit items-center justify-center">
        {room.displayName && <div>{room.displayName}</div>}
      </div>
      <div className="flex flex-row w-full">
        <div className="w-1/2 flex flex-col gap-3 ">
          {messages &&
            messages.map((message) => (
              <div
                key={message.id}
                className="border-2  rounded-md border-black py-3 px-4 w-full"
              >
                <div>Message: {message.message}</div>
                <div>
                  {message.displayName} -{" "}
                  {new Date(message.createdAt?.seconds * 1000)
                    .toLocaleString()
                    .toString()}
                </div>
              </div>
            ))}
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <input
            type="text"
            disabled={!user}
            className="border-2 ring-black focus:ring-black p-2 w-3/4"
            placeholder="Login and Type your message here"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Room
