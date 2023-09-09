import React, {useRef, useState} from "react";
import {Box, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Tooltip} from "@mui/material";
import ColorizeIcon from '@mui/icons-material/Colorize';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ClearIcon from '@mui/icons-material/Clear';
import Whiteboard from "../../components/Whiteboard";

const RoomPage = ({user, users, socket}) => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [tool, setTool] = useState('pencil')
    const [color, setColor] = useState('black')
    const [elements, setElements] = useState([])
    const [history, setHistory] = useState([])

    const handleUndo = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1]
        ])
        setElements((prevElements) =>
            prevElements.slice(0, prevElements.length - 1)
        )
    }

    const handleRedo = () => {
        setElements((prevElements) => [
            ...prevElements,
            history[history.length - 1]
        ])
        setHistory((prevHistory) =>
            prevHistory.slice(0, prevHistory.length - 1)
        )
    }

    const handleClearCanvas = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        context.fillRect = "white"
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        setElements([])
    }

    return (
        <div className="column">
            <h1 className="text-center py-3">Live Whiteboard</h1>
            {
                user?.presenter ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1
                        }}
                        boxShadow={2}
                        padding={1}
                    >
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="pencil"
                                    control={<Radio/>}
                                    checked={tool === 'pencil'}
                                    label="Pencil"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                                <FormControlLabel
                                    value="line"
                                    control={<Radio/>}
                                    checked={tool === 'line'}
                                    label="Line"
                                    onChange={(e) => setTool(e.target.value)}
                                />
                                <FormControlLabel
                                    value="rect"
                                    control={<Radio/>}
                                    checked={tool === 'rect'}
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
                            <Tooltip title="Pick Color" enterDelay={500}>
                                <ColorizeIcon color="primary"/>
                            </Tooltip>
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
                            <Tooltip title="Undo" enterDelay={500}>
                                <IconButton disabled={elements.length === 0} color="primary"
                                            onClick={() => handleUndo()}>
                                    <UndoIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Redo" enterDelay={500}>
                                <IconButton disabled={history.length < 1} color="primary" onClick={() => handleRedo()}>
                                    <RedoIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Clear All" enterDelay={500}>
                                <IconButton color="error" onClick={handleClearCanvas}>
                                    <ClearIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                ) : null
            }
            <Box
                sx={{
                    marginTop: '20px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    flex: 1,
                    height: '500px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2
                }}
                boxShadow={2}
            >
                <Whiteboard
                    canvasRef={canvasRef}
                    contextRef={contextRef}
                    tool={tool}
                    color={color}
                    elements={elements}
                    setElements={setElements}
                    user={user}
                    socket={socket}
                />
            </Box>
        </div>
    )
}

export default RoomPage