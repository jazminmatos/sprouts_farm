const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
ctx.fillRect(0, 0, canvas.width, canvas.height)

const map = new Image();
map.src = './images/sprouts_farm_map.png'

const playerImage = new Image();
playerImage.src = './images/bunnyDown.png'

class Sprite {
    constructor({position,velocity, image}) {
        this.position = position
        this.velocity = velocity
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y) // tile size 48px by 48px
    }
}

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
    console.log(animate)

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
    if (keys.w.pressed) background.position.y += .75
    if (keys.a.pressed) background.position.x += .75
    if (keys.s.pressed) background.position.y -= .75
    if (keys.d.pressed) background.position.x -= .75
}

animate()

const onKeyDown = (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            // console.log(`pressed ${e.key}`)
            break
        case 'a':
            keys.a.pressed = true
            // console.log(`pressed ${e.key}`)
            break
        case 's':
            keys.s.pressed = true
            // console.log(`pressed ${e.key}`)
            break
        case 'd':
            keys.d.pressed = true
            // console.log(`pressed ${e.key}`)
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
