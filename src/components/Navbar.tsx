import { auth } from "../firebase.config"
import { useAuth } from "../providers/AuthProvider"
import CreateRoom from "./CreateRoom"

const Navbar = () => {
  const { user, loading, signIn, signOut } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex justify-between border-b-2 py-3 px-12">
      <div className="flex items-center font-bold">
        <h1
          className=" cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Chat Rooms
        </h1>
      </div>
      {auth && auth.currentUser ? (
        <div className="flex gap-4 items-center">
          <div>{user && user.displayName}</div>
          <CreateRoom />
          <button onClick={() => signOut()}>Signout</button>
        </div>
      ) : (
        <button className="" onClick={signIn}>
          Signin
        </button>
      )}
    </div>
  )
}
export default Navbar
