class Boundary {
    static boundaryHeight = 48
    static boundaryWidth = 48
    static drawBoundary(ctx, boundary) {
        ctx.fillstyle = "red"
        ctx.fillRect(boundary.position.x, boundary.position.y, boundary.width, boundary.height)
    }

    constructor({position}) {
        this.position = position
        // 16 X 4 = 64, {size of a single tile} X {map's magnification level from Tiled} 
        this.height = Boundary.boundaryHeight
        this.width = Boundary.boundaryWidth
    }

} 