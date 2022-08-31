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

const map = new Image();
map.src = './images/sprouts_farm_map.png'

const playerImage = new Image();
playerImage.src = './images/bunnyDown.png'

const playerSpeed = 1

const background = new Sprite({
    position: {
        x: -232, 
        y: -480
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

const animate = () => {
    window.requestAnimationFrame(animate)

    ctx.imageSmoothingQuality = 'high'
    background.draw()
    ctx.drawImage(
        playerImage, 
        // cropping
        0, // x coordinate
        0, // y coordinate
        playerImage.width / 4, // crop width
        playerImage.height, //crop height
        // actual width & height of image
        canvas.width / 2 - (playerImage.width / 4) / 2, // x coordinate
        canvas.height / 2 - playerImage.height, // y coordinate
        playerImage.width/4,
        playerImage.height
    )

    // TODO: Decide whether player should be able to move diagonally
    if (keys.w.pressed) background.position.y += playerSpeed
    if (keys.a.pressed) background.position.x += playerSpeed
    if (keys.s.pressed) background.position.y -= playerSpeed
    if (keys.d.pressed) background.position.x -= playerSpeed

    // Doesn't allow player to move diagonally
    // if (keys.w.pressed && lastKey === 'w') background.position.y += playerSpeed
    // else if (keys.a.pressed && lastKey === 'a') background.position.x += playerSpeed
    // else if (keys.s.pressed && lastKey === 's') background.position.y -= playerSpeed
    // else if (keys.d.pressed && lastKey === 'd') background.position.x -= playerSpeed
}

animate()

// let lastKey = ''
const onKeyDown = (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            // lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            // lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            // lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            // lastKey = 'd'
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
