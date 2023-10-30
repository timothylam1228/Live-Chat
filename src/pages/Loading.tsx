import { useRoom } from "../providers/RoomProvider"

const Loading = () => {
  const { loading } = useRoom()
  return <div>{loading && "Loading"}</div>
}
export default Loading
