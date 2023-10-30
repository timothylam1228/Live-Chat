import React, { createContext, useContext, useEffect, useState } from "react"
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore"
import { db } from "../firebase.config"
import { User } from "firebase/auth"

export type CreateRoomType = {
  displayName: string
  creator: string
}
export type RoomContextType = {
  loading: boolean
  rooms: Array<DocumentData>
  createRoom: (data: CreateRoomType) => Promise<void>
  getRoomById: (id: string) => Promise<DocumentData | undefined>
}

const RoomContext = createContext<RoomContextType>({
  loading: false,
  rooms: [],
  createRoom: async () => {},
  getRoomById: async () => Document,
})

export const useRoom = () => {
  return useContext(RoomContext)
}

const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Array<DocumentData>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRooms()
    setLoading(false)
  }, [])

  const createRoom = async (data: CreateRoomType) => {
    setLoading(true)
    const roomRef = collection(db, "rooms")
    await addDoc(roomRef, {
      displayName: data.displayName,
      creator: data.creator,
      createdAt: new Date(),
    })
    getRooms()
    setLoading(false)
  }
  const getRooms = async () => {
    const roomRef = collection(db, "rooms")
    const roomSnapshot = await getDocs(roomRef)
    // const roomList = roomSnapshot.docs.map((doc) => doc.data())
    // with id
    const roomList = roomSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }
    })
    setRooms(roomList)
    return roomList
  }

  const getRoomById = async (id: string) => {
    const roomRef = doc(db, "rooms", id)
    const roomSnapshot = await getDoc(roomRef)
    const room = roomSnapshot.data()
    return room
  }
  const value = {
    rooms,
    createRoom,
    getRoomById,
    loading,
  }

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}

export default RoomProvider
