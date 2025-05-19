import Coin from "../gameObjects/Items/coin";

export default class Tilemap {
    scene: Phaser.Scene
    tilemap: Phaser.Tilemaps.Tilemap
    x: number;
    y: number;
    scale: number;
    topLayer: Phaser.Tilemaps.TilemapLayer | null;
    botLayer: Phaser.Tilemaps.TilemapLayer | null;
    mover: Phaser.Physics.Arcade.Sprite
    constructor(scene: Phaser.Scene, tileKey: string, x: number, y: number, scale: number)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.createTilemap(tileKey, x, y, scale);
        this.createObjects();

        this.botLayer;
    }

    private createTilemap(tileKey : string, x: number, y: number, scale: number)
    {
        this.tilemap = this.scene.make.tilemap({ key: tileKey})
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

    private createObjects()
    {
        const objectLayer = this.tilemap.getObjectLayer('Objects');
        
        console.log(objectLayer);

        if(!objectLayer) return;

        objectLayer.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0, height = 0 } = objData;

            const xPos = x * this.scale + this.getX();
            const yPos = y * this.scale + this.getY();

            switch(name)
            {
                case 'coin':
                    new Coin(this.scene, xPos, yPos);
                    break;
            }
        });
    }
    
    public getWidth(): number
    {
        return this.tilemap.widthInPixels * this.scale;
    }

    public getHeight(): number
    {
        return this.tilemap.heightInPixels * this.scale;
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