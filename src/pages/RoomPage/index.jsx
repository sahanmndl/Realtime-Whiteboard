import React from "react";
import { useState } from "react";
import { Box, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import "./index.css";
import Whiteboard from "../../components/Whiteboard";
import { useRef } from "react";

const RoomPage = () => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [tool, setTool] = useState('pencil')
    const [color, setColor] = useState('black')
    const [elements, setElements] = useState([])

    return (
        <div className="column">
            <h1 className="text-center py-3">White Board Sharing App</h1>
            <Box
                sx={{
                    display: 'flex', 
                    flex: 1, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}
            >
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="pencil" 
                            control={<Radio />} 
                            checked={tool === 'pencil'}
                            label="Pencil" 
                            onChange={(e) => setTool(e.target.value)} 
                        />
                        <FormControlLabel 
                            value="line" 
                            control={<Radio />} 
                            checked={tool === 'line'}
                            label="Line" 
                            onChange={(e) => setTool(e.target.value)} 
                        />
                        <FormControlLabel 
                            value="rectangle" 
                            control={<Radio />} 
                            checked={tool === 'rectangle'}
                            label="Rectangle" 
                            onChange={(e) => setTool(e.target.value)} 
                        />
                    </RadioGroup>
                </FormControl>
                <Box
                    sx={{
                        marginLeft: '30px', 
                        marginRight: '40px', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    <label htmlFor="color">Pick Color</label>
                    <input
                        className="ms-2"
                        type="color"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    <IconButton>
                        <UndoIcon />
                    </IconButton>
                    <IconButton>
                        <RedoIcon />
                    </IconButton>
                    <IconButton color="error">
                        <ClearAllIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        marginLeft: '30px',
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="subtitle1">
                        Users Online: 0
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '20px', 
                    marginLeft: 'auto', 
                    marginRight: 'auto', 
                    display: 'flex', 
                    flex: 1, 
                    height: '500px', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}
            >
                <Whiteboard 
                    canvasRef={canvasRef} 
                    contextRef={contextRef} 
                    elements={elements}
                    setElements={setElements}
                />
            </Box>
        </div>
    )
}

export default RoomPage