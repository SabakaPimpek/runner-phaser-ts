import Activable from "../interfaces/Activable";

const textureName = 'spritesheet';
const frame = 78;

export default class Coin implements Activable {
    private scene: Phaser.Scene
    private object: Phaser.Physics.Arcade.Sprite
    public active: boolean
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        this.scene = scene;

        this.object = this.scene.physics.add.sprite(x, y, textureName, frame);

        this.object.setImmovable(true);
        this.object.setScale(3.5);

        const gravityX = this.scene.physics.getConfig().gravity?.x;
        const gravityY = this.scene.physics.getConfig().gravity?.y;

        this.object.setGravity(gravityX? -gravityX : 0, gravityY? -gravityY: 0);
    }

    public collect()
    {   
        this.scene.sound.play('coin-pickup')
        this.setActive(false); 
    }

    public setActive(value: boolean): void {
        this.active = value;
        this.object.setActive(value);
        this.object.setVisible(value);
    }
}