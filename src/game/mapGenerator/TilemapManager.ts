import Tilemap from "./Tilemap";

const tileJSONnames = [
    'tile1', 'tile2', 'tile3'
]

export default class TilemapManager {
    scene: Phaser.Scene;
    x: number;
    y: number;
    scale: number;
    tilemaps: Tilemap[]
    constructor(scene: Phaser.Scene, x: number, y: number, scale: number)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;

        this.tilemaps = this.createTilemapsArray(3);
    }

    createTilemapsArray(amount: number): Tilemap[] {
        const tilemaps: Tilemap[] = [];

        let currentX = this.x;

        for (let i = 0; i < amount; i++) {
            const randomIndex = Phaser.Math.Between(0, tileJSONnames.length - 1);
            const tilemapName = tileJSONnames[randomIndex];

            const tilemap = new Tilemap(this.scene, tilemapName, currentX, this.y, this.scale);
            tilemaps.push(tilemap);

            currentX += tilemap.getEndX();
        }

        return tilemaps;
    }
}