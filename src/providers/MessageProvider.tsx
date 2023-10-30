import React from "react"
import { db } from "../firebase.config"
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { set } from "firebase/database"

const MessageContext = React.createContext<MessageContextType>({
  loading: false,
  messages: [],
  sendMessage: async () => {},
  setId: () => {},
})

type MessageContextType = {
  loading: boolean
  messages: Array<{
    id: string
    message: string
    createdAt: Date
    displayName: string
  }>
  sendMessage: (message: string, displayName: string) => Promise<void>
  setId: (id: string) => void
}
export const useMessage = () => {
  return React.useContext(MessageContext)
}

const MessageProvider = (props: { children: React.ReactNode }) => {
  const [messages, setMessages] = React.useState([])
  const [id, setId] = React.useState<string>("")
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!id) {
      console.error("id is not defined")
      setLoading(false)
      return
    }
    console.log("id loading", id)
    const roomRef = doc(db, "rooms", id)
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      console.log("snapshot", snapshot)
      const messages = snapshot.data()?.messages || []
      setMessages(messages)
      setLoading(false)
    })
    return unsubscribe
  }, [id])

  const sendMessage = async (message: string, displayName: string) => {
    setLoading(true)
    if (!id) {
      console.error("id is not defined")
      setLoading(false)
      return
    }
    const roomRef = doc(db, "rooms", id)
    const roomSnapshot = await getDoc(roomRef)
    if (!roomSnapshot.exists()) {
      console.error("room does not exist")
      setLoading(false)
      return
    }
    const roomData = roomSnapshot.data()
    const previousMessages = roomData.messages || []
    const newMessage = {
      message,
      displayName,
      createdAt: new Date(),
    }
    const updatedMessages = [...previousMessages, newMessage]

    await updateDoc(roomRef, { messages: updatedMessages })
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        loading,
        sendMessage,
        setId,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
