const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
ctx.fillRect(0, 0, canvas.width, canvas.height)

const map = new Image();
map.src = './images/sprouts_farm_map.png'

const playerImage = new Image();
playerImage.src = './images/bunnyDown.png'

map.onload = () => {
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(map, -256, -528) // 48px difference....528
    ctx.drawImage(
        playerImage, 
        // cropping
        0, // x coordinate
        0, // y coordinate
        playerImage.width / 4, // crop width
        playerImage.height, //crop height
        // actual width & height of image
        canvas.width / 2 - playerImage.width / 4, // x coordinate
        canvas.height / 2 + playerImage.height, // y coordinate
        playerImage.width/4,
        playerImage.height
    )
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

window.addEventListener('keydown', onKeyDown);


const animate = () => {

}
