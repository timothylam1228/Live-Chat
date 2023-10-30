import { DocumentData } from "firebase/firestore"
import { useRoom } from "../providers/RoomProvider"
import Room from "./Room"
import { useNavigate } from "react-router-dom"
const RoomList = () => {
  const { rooms } = useRoom()
  const navigate = useNavigate()
  
  const handleNavigate = (id: string) => {
    console.log("id", id)
    navigate(`/room/${id}`, { relative: "path", state: { id } })
  }

  return (
    <div className="mx-12 text-center">
      <h1 className=" font-extrabold text-3xl">RoomList</h1>
      <div className="grid grid-cols-3 gap-12">
        {rooms.map((room: DocumentData) => (
          <div key={room.id} onClick={() => handleNavigate(room.id)}>
            <Room room={room} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default RoomList
