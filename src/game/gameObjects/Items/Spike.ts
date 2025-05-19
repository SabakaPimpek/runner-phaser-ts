export default class Spike extends Phaser.GameObjects.Rectangle {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number = 16, height: number = 16) {
        super(scene, x, y, width, height, 0xff0000, 0); // przezroczysty, ale widoczny kolor np. w debug

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0)

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);
    }
}