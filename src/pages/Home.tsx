import Navbar from "../components/Navbar"
import RoomList from "../components/RoomList"
import UserList from "../components/UserList"
import Loading from "./Loading"

const Home = () => {
  return (
    <div className="Home w-full">
      <RoomList />
      <UserList />
    </div>
  )
}
export default Home
