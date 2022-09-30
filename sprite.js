class Sprite {
    constructor({position,velocity, image, frames = {max: 1}}) {
        this.position = position
        this.velocity = velocity
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
    }

    draw() {
        // tile size 48px by 48px
        // ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.drawImage(
        this.image, 
        // cropping
        0, // x coordinate
        0, // y coordinate
        this.image.width / this.frames.max, // crop width
        this.image.height, //crop height
        this.position.x, 
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height
    )
    }
}