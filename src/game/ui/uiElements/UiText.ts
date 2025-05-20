export default class UiText {
    scene: Phaser.Scene
    object: Phaser.GameObjects.Text
    constructor(scene: Phaser.Scene, x: number, y: number, text: any, fontOptions?: Partial<Phaser.GameObjects.TextStyle>) {
        this.scene = scene;

        this.object = this.scene.add.text(x, y, text, fontOptions);
        this.object.setScrollFactor(0);
        this.object.setDepth(100);
    }

    public setText(text: string)
    {
        this.object.text = text;
    }
}