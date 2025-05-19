import Coin from "../Items/coin";
import Spike from '../Items/spike';

export default class Tilemap {
    private scene: Phaser.Scene
    private tilemap: Phaser.Tilemaps.Tilemap
    private x: number;
    private y: number;
    private scale: number;
    topLayer: Phaser.Tilemaps.TilemapLayer | null;
    botLayer: Phaser.Tilemaps.TilemapLayer | null;
    public objectGroup: Phaser.Physics.Arcade.Group;
    private active: boolean = false;
    constructor(scene: Phaser.Scene, tileKey: string, x: number, y: number, scale: number)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.createTilemap(tileKey, x, y, scale);

        this.objectGroup = this.scene.physics.add.group({
            allowGravity: false
        }); // grupa dla coin i innych obiektów
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
                    const coin = new Coin(this.scene, xPos, yPos);
                    this.objectGroup.add(coin);
                    break;
                case 'spikes':
                    const spike = new Spike(this.scene, xPos, yPos, width * this.scale, height * this.scale);
                    this.objectGroup.add(spike);
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

    public setX(newX: number): void {
        const deltaX = newX - this.x;
        this.x = newX;

        if(this.botLayer) {
            this.botLayer.setX(newX);
        }
        if(this.topLayer) {
            this.topLayer.setX(newX);
        }

        // Przesuwamy wszystkie obiekty w grupie o deltaX
        this.objectGroup.getChildren().forEach((obj: any) => {
            obj.x += deltaX;
        });
    }

    public getActive(): boolean
    {
        return this.active;
    }

    public setActive(active: boolean): void {
        this.active = active;

        this.topLayer?.setActive(active).setVisible(active);
        this.botLayer?.setActive(active).setVisible(active);

        this.objectGroup.getChildren().forEach(obj => {
            const gameObj = obj as Phaser.GameObjects.Sprite;
            if (gameObj.setActive) gameObj.setActive(active);
            if (gameObj.setVisible) gameObj.setVisible(active);
        });
}
}