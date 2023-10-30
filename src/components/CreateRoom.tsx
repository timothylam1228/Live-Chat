import React, { useEffect, useState } from "react"
import { useAuth } from "../providers/AuthProvider" // Import your authentication context
import { useRoom } from "../providers/RoomProvider"

const CreateRoomButton: React.FC = () => {
  const { user } = useAuth()
  const { createRoom, loading } = useRoom()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    if (!loading && isModalOpen === true) {
      setIsModalOpen(false)
    }
  }, [loading])
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleCreateRoom = async () => {
    if (!user || !user.displayName) return
    await createRoom({ displayName: roomName, creator: user.displayName })
    // Add logic to create a new chat room
    // This function should be executed when the user wants to create a new room
    // You can include a form to enter room details, and then send the data to your database.
  }

  return (
    <div>
      {user ? (
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Room
        </button>
      ) : null}
      {isModalOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4">
              Create a New Chat Room
            </h2>
            <div>
              <input
                type="text"
                placeholder="Room Name"
                onChange={(e) => setRoomName(e.target.value)}
                className="border-2 border-gray-200 p-2 rounded w-full"
              ></input>
            </div>
            {/* Add your room creation form here */}
            <button
              onClick={handleCreateRoom}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create Room
            </button>
            <button onClick={closeModal} className="text-gray-500 p-2 ml-4">
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CreateRoomButton
