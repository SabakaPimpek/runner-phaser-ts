import Tilemap from "./Tilemap";

const tileJSONnames = [
    'tile1', 'tile2', 'tile3'
]

export default class TilemapManager {
    scene: Phaser.Scene;
    x: number;
    y: number;
    scale: number;
    tilemaps: Tilemap[];
    activeTilemaps: Tilemap[] = [];
    constructor(scene: Phaser.Scene, x: number, y: number, scale: number)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;

        this.tilemaps = this.createTilemapsArray();

        this.initActiveTilemaps();
    }

    private createTilemapsArray(): Tilemap[] {
        const tilemaps: Tilemap[] = [];
        
        for(let i = 0; i < tileJSONnames.length; i++)
        {
            const tilemapName = tileJSONnames[i];

            const tilemap = new Tilemap(this.scene, tilemapName, -9000, this.y, this.scale);
            tilemap.setActive(false);
            tilemaps.push(tilemap);
        }
        return tilemaps;
    }

    private initActiveTilemaps()
    {
        const tilemaps = this.tilemaps;

        const first = Phaser.Utils.Array.GetRandom(tilemaps);

        const arrCopy = tilemaps.filter(e => e !== first);

        const second = Phaser.Utils.Array.GetRandom(arrCopy);

        first.setActive(true);
        second.setActive(true);

        first.setX(this.x);
        second.setX(first.getEndX());

        this.activeTilemaps.push(first, second);
    }

    public update()
    {
        const cameraStartX = this.scene.cameras.main.scrollX;

        const firstTilemap = this.activeTilemaps[0];

        // Jeśli tilemapa wyszła poza ekran
        if (firstTilemap.getEndX() < cameraStartX) {
            this.removeFirstTilemap();
            this.AddNewTilemapToEnd();
        }
    }

    private removeFirstTilemap()
    {
        const tilemap = this.activeTilemaps.shift();
        if (tilemap) {
            tilemap.setActive(false);
            tilemap.setX(-9000); // przenieś ją poza ekran
        }
    }

    private AddNewTilemapToEnd()
    {
        const usedTilemaps = this.activeTilemaps;
        const availableTilemaps = this.tilemaps.filter(t => !usedTilemaps.includes(t));

        if (availableTilemaps.length === 0) return;

        const newTilemap = Phaser.Utils.Array.GetRandom(availableTilemaps);
        const lastTilemap = usedTilemaps[usedTilemaps.length - 1];

        newTilemap.setX(lastTilemap.getEndX());
        newTilemap.setActive(true);

        this.activeTilemaps.push(newTilemap);
    }
}