export default class Tilemap {
    scene: Phaser.Scene
    tilemap: Phaser.Tilemaps.Tilemap
    x: number;
    y: number;
    scale: number;
    topLayer: Phaser.Tilemaps.TilemapLayer | null;
    botLayer: Phaser.Tilemaps.TilemapLayer | null;
    mover: Phaser.Physics.Arcade.Sprite
    constructor(scene: Phaser.Scene, x: number, y: number, scale: number)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.createTilemap(x, y, scale);

        this.botLayer;
    }

    private createTilemap(x: number, y: number, scale: number)
    {
        this.tilemap = this.scene.make.tilemap({ key: 'tile1'})
        const tileset = this.tilemap.addTilesetImage('spritesheet', 'spritesheet');

        if(!tileset) return;
        this.botLayer = this.tilemap.createLayer('Bot', tileset, x, y);
        if(this.botLayer)
        {
            this.botLayer?.setScale(scale);
            this.setColliders(this.botLayer);
        }

        this.topLayer = this.tilemap.createLayer('Top', tileset, x, y);
        if(this.topLayer)
        {
            this.topLayer.setScale(scale);
            this.setColliders(this.topLayer);
        }
    }

    private setColliders(layer: Phaser.Tilemaps.TilemapLayer)
    {
        layer.forEachTile(tile => {
        if (tile.properties.collide === true) {
            tile.setCollision(false, false, true, false);
        }
    });

    }

    public update()
    {

    }

    public getWidth(): number
    {
        return this.tilemap.width;
    }

    public getHeight(): number
    {
        return this.tilemap.height;
    }

    public getX(): number
    {
        return this.x;
    }
    public getY(): number
    {
        return this.y;
    }
    public getEndX(): number
    {
        return this.getWidth() + this.x;
    }
    public getEndY(): number
    {
        return this.getHeight() + this.y;
    }
}