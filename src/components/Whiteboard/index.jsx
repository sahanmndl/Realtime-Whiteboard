import React, {useEffect, useLayoutEffect, useState} from "react";
import rough from "roughjs";

const Whiteboard = ({canvasRef, contextRef, tool, color, elements, setElements, user, socket}) => {

    const roughGenerator = rough.generator()
    const [isDrawing, setIsDrawing] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {
        socket.on("whiteboardDataResponse", (data) => {
            setImage(data.imgURL)
        })
    }, [])

    if (!user?.presenter) {
        return (
            <div className="h-100 w-100 overflow-hidden">
                <img
                    src={image}
                    alt="Real Time"
                    style={{height: window.innerHeight * 2, width: '285%'}}
                />
            </div>
        )
    }

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.height = window.innerHeight * 2
        canvas.width = window.innerWidth * 2

        const context = canvas.getContext("2d")
        context.strokeStyle = color
        context.lineWidth = 2
        context.lineCap = "round"
        contextRef.current = context
    }, [])

    useEffect(() => {
        contextRef.current.strokeStyle = color
    }, [color])

    useLayoutEffect(() => {
        if (canvasRef) {
            const roughCanvas = rough.canvas(canvasRef.current)
            if (elements.length > 0) {
                contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            }
            elements.forEach((element) => {
                if (element.type === "pencil") {
                    roughCanvas.linearPath(
                        element.path,
                        {
                            stroke: element.stroke,
                            strokeWidth: 3,
                            roughness: 0
                        }
                    )
                } else if (element.type === "line") {
                    roughCanvas.draw(
                        roughGenerator.line(
                            element.offsetX,
                            element.offsetY,
                            element.width,
                            element.height,
                            {
                                stroke: element.stroke,
                                strokeWidth: 3,
                                roughness: 0
                            }
                        )
                    )
                } else if (element.type === "rect") {
                    roughCanvas.draw(
                        roughGenerator.rectangle(
                            element.offsetX,
                            element.offsetY,
                            element.width,
                            element.height,
                            {
                                stroke: element.stroke,
                                strokeWidth: 3,
                                roughness: 0
                            }
                        )
                    )
                }
            })

            const canvasImage = canvasRef.current.toDataURL()
            socket.emit("whiteboardData", canvasImage)
        }

    }, [elements])

    const handleMouseDown = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        setIsDrawing(true)

        if (tool === "pencil") {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "pencil",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: color
                }
            ])
        } else if (tool === "line") {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "line",
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: color
                }
            ])
        } else if (tool === "rect") {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "rect",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: color
                }
            ])
        }
    }

    const handleMouseMove = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        if (isDrawing) {
            if (tool === "pencil") {
                const {path} = elements[elements.length - 1]
                const newPath = [...path, [offsetX, offsetY]]
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                path: newPath
                            }
                        } else {
                            return ele
                        }
                    })
                )
            } else if (tool === "line") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX,
                                height: offsetY,
                            }
                        } else {
                            return ele
                        }
                    })
                )
            } else if (tool === "rect") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX - ele.offsetX,
                                height: offsetY - ele.offsetY,
                            }
                        } else {
                            return ele
                        }
                    })
                )
            }
        }
    }

    const handleMouseUp = (e) => {
        setIsDrawing(false)
    }


    return (
        <div
            className="h-100 w-100 overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default Whiteboard