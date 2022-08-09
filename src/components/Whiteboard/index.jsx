import React, { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import rough from "roughjs";

const Whiteboard = ({canvasRef, contextRef, elements, setElements}) => {

    const roughGenerator = rough.generator()
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        contextRef.current = context
    }, [])

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current)
        elements.forEach((element) => {
            roughCanvas.linearPath(element.path)
        })
    }, [elements])

    const handleMouseDown = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        setIsDrawing(true)
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
    }

    const handleMouseMove = (e) => {
        const {offsetX, offsetY} = e.nativeEvent
        if(isDrawing) {
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
        }
    }

    const handleMouseUp = (e) => {
        setIsDrawing(false)
    }

    return (
        <canvas 
            className="border border-dark border-1 h-100 w-100"
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >

        </canvas>
        
    )
}

export default Whiteboard