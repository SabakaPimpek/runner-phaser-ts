export default class Tilemap {
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene, scale: number)
    {
        this.scene = scene;
        this.createTilemap(scale);
    }

    private createTilemap(scale: number)
    {
        const tilemap = this.scene.make.tilemap({ key: 'tile1'})
        const tileset = tilemap.addTilesetImage('spritesheet', 'spritesheet');

        if(!tileset) return;

        let topLayer = tilemap.createLayer('Top', tileset, 200, 200);
        topLayer?.setScale(scale);
        let botLayer = tilemap.createLayer('Bot', tileset, 200, 200);
        botLayer?.setScale(scale);
    }

    public AddColider()
    {

    }
}