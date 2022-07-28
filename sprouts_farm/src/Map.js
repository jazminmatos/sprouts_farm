import React, { useRef, useEffect } from 'react';
import sprouts_farm_map from './images/sprouts_farm_map.png'
import bunnySprite from './images/bunny.png'
import './css/map.css'

// TODO: Should ctx be moved to game and passed down as a prop?

// Creates canvas element and loads map image
const Map = () => {
    const canvasRef = useRef(null)

    // 16:9 ratio
    const canvasWidth = 1024
    const canvasHeight = 576
    
    const createCanvas = (ctx) => {
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    }

    const loadMapAndPlayer = (ctx) => {
        const map = new Image();
        const playerImage = new Image()

        map.src = sprouts_farm_map
        playerImage.src = bunnySprite

        map.onload = () => {
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(map, -256, -528) // 48px difference....528
            ctx.drawImage(
                playerImage, 
                // cropping
                0,
                0,
                playerImage.width/4,
                playerImage.height/4,
                // actual width & height of image
                canvasWidth/2 - (playerImage.width/2)/2, 
                canvasHeight/2 - playerImage.height/2,
                playerImage.width/4,
                playerImage.height/4)
        }
    }

    const onKeyDown = (e) => {
        switch (e.key) {
            case 'w':
                console.log('pressed w  key')
                break
            case 'a':
                console.log('pressed a  key')
                break
            case 's':
                console.log('pressed s  key')
                break
            case 'd':
                console.log('pressed d  key')
                break
            default:
                break
        }
    }
    
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext('2d')
        
        createCanvas(ctx)
        loadMapAndPlayer(ctx)

        canvas.addEventListener("keydown", onKeyDown)
    })

    const handleClick = (e) => {
        console.log("Hi! from clicking...")
    }
    
    return (
        <canvas 
            id="canvas"
            ref={canvasRef} 
            tabIndex={"0"} />
            // onKeyDown={onKeyDown}/> // event won't work unless I click on the canvas element
    );
}

export default Map;
