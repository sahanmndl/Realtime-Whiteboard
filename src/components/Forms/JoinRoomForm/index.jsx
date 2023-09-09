import React, {useState} from "react"
import {Box, Button, Container, TextField} from "@mui/material"
import {useNavigate} from "react-router-dom"

const JoinRoomForm = ({uuid, socket, setUser}) => {

    const navigate = useNavigate()
    const [roomId, setRoomId] = useState("")
    const [name, setName] = useState("")

    const joinRoom = (e) => {
        e.preventDefault()
        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: false,
            presenter: false
        }
        setUser(roomData)
        navigate(`/${roomId}`)
        console.log(roomData)
        socket.emit("userJoined", roomData)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Enter Your Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="room-code"
                        label="Enter Room Code"
                        name="room-code"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 9.5, mb: 2}}
                        disabled={name === "" || roomId === ""}
                        onClick={joinRoom}
                    >
                        Join
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default JoinRoomForm