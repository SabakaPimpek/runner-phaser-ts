export default class UIButton {
    private button: Phaser.GameObjects.Sprite;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        callback: () => void
    ) {
        // Tworzymy przycisk
        this.button = scene.add.sprite(x, y, texture).setInteractive({ useHandCursor: true });

        // Obsługa kliknięcia
        this.button.on('pointerdown', () => {
            callback();
        });
    }

    // Opcjonalnie: metoda do ukrywania przycisku
    setVisible(visible: boolean) {
        this.button.setVisible(visible);
        this.button.setActive(visible);
    }

    public setScale(scale: number)
    {
        this.button.setScale(scale);
    }
}