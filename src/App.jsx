import Form from "./components/Forms"
import { Route, Routes } from "react-router-dom"
import RoomPage from "./pages/RoomPage"
import { io } from "socket.io-client"
import { useEffect, useState } from "react"

const server = "https://realtime-whiteboard-1.herokuapp.com/"
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"]
}

const socket = io(server, connectionOptions)

const App = () => {

  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on("userHasJoined", (data) => {
      if(data.success) {
        console.log("userjoined")
      } else {
        console.log("error")
      }
    })

    socket.on("usersCount", (data) => {
      setUsers(data.users)
    })
  }, [])

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Form uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage user={user} users={users} socket={socket} />} />
      </Routes>
    </div>
  )
}

export default App
