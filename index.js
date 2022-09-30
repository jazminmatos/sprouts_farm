const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
ctx.fillRect(0, 0, canvas.width, canvas.height)

const tileMapWidth = 70;

// Converts collisions array into a 2D array
const collisionsMap = []
for (let i = 0; i < collisions.length; i += tileMapWidth) {
    collisionsMap.push(collisions.slice(i, tileMapWidth + i))
}

const mapAndBoundariesOffset = {
    x: -232,
    y: -480
} 

// Creates map boundaries and populates array using collisionsMap
const boundaries = []
collisionsMap.forEach((row, indexOfCurrentRow) => {
    row.forEach((symbol, indexInsideCurrentRow) => {
        if (symbol === 456) {
            boundaries.push(new Boundary({
                position: {
                    x: indexInsideCurrentRow * Boundary.boundaryWidth + mapAndBoundariesOffset.x, 
                    y: indexOfCurrentRow * Boundary.boundaryHeight + mapAndBoundariesOffset.y
                }
            }))
        }
    })
})

const map = new Image();
map.src = './images/sprouts_farm_map.png'

const playerImage = new Image();
playerImage.src = './images/bunnyDown.png'

const playerSpeed = 1.5

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2,
        y: canvas.height / 2 - 48
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: mapAndBoundariesOffset.x, 
        y: mapAndBoundariesOffset.y
    },
    image: map
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

// Things that should move behind the player image: background, collisions, foreground
const movables = [background, ...boundaries]
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width - 15 >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width - 15 &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height - 15 &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const animate = () => {
    window.requestAnimationFrame(animate)

    ctx.imageSmoothingQuality = 'high'
    background.draw()
    boundaries.forEach(boundary => {
        Boundary.drawBoundary(ctx, boundary)
    })
    player.draw()

    // Checking if lastKey pressed prevents player from moving diagonally
    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // Checking for collisions between player and boundaries
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + playerSpeed
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.y += playerSpeed})
    }
    else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // Checking for collisions between player and boundaries
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + playerSpeed,
                        y: boundary.position.y
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.x += playerSpeed})
    }
    else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // Checking for collisions between player and boundaries
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - playerSpeed
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.y -= playerSpeed})
    }
    else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // Checking for collisions between player and boundaries
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - playerSpeed,
                        y: boundary.position.y
                    }}
                })
            ) {
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.x -= playerSpeed})
    }
}

animate()

let lastKey = ''
const onKeyDown = (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        default:
            break
    }
}

const onKeyUp = (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        default:
            break
    }
}

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
