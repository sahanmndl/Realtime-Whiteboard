import React from "react"
import { Container, Box, TextField, Button } from "@mui/material"

const CreateRoomForm = () => {
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
                        fullWidth
                        disabled
                        id="room-code"
                        label="Generate Room Code"
                        name="room-code"
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            marginTop: 2
                        }}
                    >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color='success'
                            sx={{ marginRight: 1 }}
                        >
                            Generate
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color='error'
                        >
                            Copy
                        </Button>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default CreateRoomForm