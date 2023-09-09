import "./index.css";
import CreateRoomForm from './CreateRoomForm'
import JoinRoomForm from './JoinRoomForm'

const Form = ({uuid, socket, setUser}) => {
    return (
        <div className="row h-100 mt-5 pt-5">
            <div className="col-md-4 form-box border rounded mx-auto d-flex flex-column align-items-center">
                <h1 className="text-primary fw-bold mt-5">Create Room</h1>
                <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
            </div>
            <div className="col-md-4 form-box border rounded mx-auto d-flex flex-column align-items-center">
                <h1 className="text-primary fw-bold mt-5">Join Room</h1>
                <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
            </div>
        </div>
    )
}

export default Form