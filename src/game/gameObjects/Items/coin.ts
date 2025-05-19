export default class Coin extends Phaser.Physics.Arcade.Sprite {
    public active: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Wywołanie konstruktora nadrzędnej klasy (Sprite)
        super(scene, x, y, 'spritesheet', 78);

        // Dodanie do sceny i fizyki
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setScale(3.5);

        const gravity = scene.physics.world.gravity;
        this.setGravity(-gravity.x, -gravity.y);
    }

    public collect(): void {
        if (this.scene.sound.get('coin-pickup')) {
            this.scene.sound.play('coin-pickup');
        }
        this.setActive(false);
        this.setVisible(false);
    }

    public setActive(value: boolean): this {
        this.active = value;
        super.setActive(value);
        this.setVisible(value);
        return this;
    }
}
