class Map {
    static canvas = document.querySelector('canvas');
    static ctx = this.canvas.getContext('2d');
    static map = new Image();

    static createCanvas() {
        // 16:9 ratio
        this.canvas.width = 1024;
        this.canvas.height = 576;

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.map.src = './images/sprouts_farm_map.png'
        console.log("map:", this.map)
        
        this.map.onload = () => {
            this.ctx.drawImage(this.map, 0, 0);
        }
    }

    
}