import "./index.css";
import CreateRoomForm from './CreateRoomForm'
import JoinRoomForm from './JoinRoomForm'

const Form = ({uuid, socket, setUser}) => {
    return (
        <div className="row h-100 pt-5">
            <div 
                className="col-md-4 mt-6 form-box p-4 border rounded mx-auto d-flex flex-column align-items-center"
            >
                <h1 className="text-primary fw-bold">Create Room</h1>
                <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
            </div>
            <div 
                className="col-md-4 mt-6 form-box p-4 border rounded mx-auto d-flex flex-column align-items-center"
            >
                <h1 className="text-primary fw-bold">Join Room</h1>
                <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
            </div>
        </div>
    )
}

export default Form