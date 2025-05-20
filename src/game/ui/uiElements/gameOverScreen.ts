export default class gameOverScreen {
    bg: Phaser.GameObjects.Image
    header: Phaser.GameObjects.Image
    table: Phaser.GameObjects.Image
    constructor(scene: Phaser.Scene, scale: number)
    {
        const {width, height} = scene.sys.game.canvas

        this.bg = scene.add.image(width/2, height/2, 'gameOver-bg').setScrollFactor(0).setDepth(50).setScale(scale);

        this.table = scene.add.image(width/2, height/2 - this.bg.height * 0.05, 'gameOver-table').setScrollFactor(0).setDepth(50).setScale(0.5);
        this.header = scene.add.image(width/2, (height - this.bg.height/2) * scale, 'gameOver-header').setScrollFactor(0).setDepth(50).setScale(scale);

    }

    public turnOn(score: number)
    {

    }
}