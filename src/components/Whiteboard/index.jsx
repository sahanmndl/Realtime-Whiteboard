import React, { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import rough from "roughjs";

const Whiteboard = ({canvasRef, contextRef, tool, elements, setElements}) => {

    const roughGenerator = rough.generator()
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.height = window.innerHeight * 2
        canvas.width = window.innerWidth * 2
        const context = canvas.getContext("2d")
        contextRef.current = context
    }, [])

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current)
        if(elements.length > 0) {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
        elements.forEach((element) => {
            if(element.type === "pencil") {
                roughCanvas.linearPath(element.path)
            } else if (element.type === "line") {
                roughCanvas.draw(
                    roughGenerator.line(
                        element.offsetX, 
                        element.offsetY, 
                        element.width, 
                        element.height
                    )
                )
            } else if (element.type === "rect") {
                roughCanvas.draw(
                    roughGenerator.rectangle(
                        element.offsetX, 
                        element.offsetY, 
                        element.width, 
                        element.height
                    )
                )
            }
        })
    }, [elements])

    const handleMouseDown = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        setIsDrawing(true)

        if(tool === "pencil") {
            setElements((prevElements) => [
                ...prevElements, 
                {
                    type: "pencil",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: "black"
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
                    stroke: "black"
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
                    stroke: "black"
                }
            ])
        }
    }

    const handleMouseMove = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        if(isDrawing) {
            if(tool === "pencil") {
                const {path} = elements[elements.length - 1]
                const newPath = [...path, [offsetX, offsetY]]
                setElements((prevElements) => 
                    prevElements.map((ele, index) => {
                        if(index === elements.length - 1) {
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
                        if(index === elements.length - 1) {
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
                        if(index === elements.length - 1) {
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
            <canvas ref={canvasRef} />
        </div>
    )
}

export default Whiteboard