import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import AuthProvider from "./providers/AuthProvider"
import RoomProvider from "./providers/RoomProvider"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Room from "./pages/Room"
import Navbar from "./components/Navbar"
import MessageProvider from "./providers/MessageProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RoomProvider>
        <MessageProvider>
          <Navbar />
          <RouterProvider router={router} />
        </MessageProvider>
      </RoomProvider>
    </AuthProvider>
  </React.StrictMode>,
)
