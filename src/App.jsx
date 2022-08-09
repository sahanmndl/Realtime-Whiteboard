import Form from "./components/Forms"
import { Route, Routes } from "react-router-dom"
import RoomPage from "./pages/RoomPage"

const App = () => {

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  )
}

export default App
