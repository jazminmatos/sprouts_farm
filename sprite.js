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