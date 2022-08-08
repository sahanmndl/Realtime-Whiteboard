import React from "react"
import { Container, Box, TextField, Button } from "@mui/material"

const JoinRoomForm = () => {
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
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Enter Your Name"
                        name="name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="room-code"
                        label="Enter Room Code"
                        name="room-code"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Join
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default JoinRoomForm