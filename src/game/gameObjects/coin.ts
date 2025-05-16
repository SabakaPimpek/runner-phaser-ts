export default class Coin extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene, x: number, y: number, textureName: string, frame?: number)
    {
        super(scene, x, y, textureName, frame);
        this.scene = scene;
    }

    public collect()
    {
        
    }
}