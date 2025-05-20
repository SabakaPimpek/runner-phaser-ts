export default class UIButton {
    public body: Phaser.GameObjects.Sprite;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        callback: () => void
    ) {
        // Tworzymy przycisk
        this.body = scene.add.sprite(x, y, texture).setInteractive({ useHandCursor: true }).setDepth(50);

        // Obsługa kliknięcia
        this.body.on('pointerdown', () => {
            callback();
        });
    }

    // Opcjonalnie: metoda do ukrywania przycisku
    setVisible(visible: boolean) {
        this.body.setVisible(visible);
        this.body.setActive(visible);
    }
}