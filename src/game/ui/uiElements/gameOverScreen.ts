import UIButton from "./uiButton"

export default class gameOverScreen {
    bg: Phaser.GameObjects.Image
    header: Phaser.GameObjects.Image
    table: Phaser.GameObjects.Image
    btnMenu: UIButton
    btnRestart: UIButton
    text: Phaser.GameObjects.Text
    group: Phaser.GameObjects.Group;
    constructor(scene: Phaser.Scene, scale: number)
    {
        const {width, height} = scene.sys.game.canvas

        this.bg = scene.add.image(width/2, height/2, 'gameOver-bg').setScrollFactor(0).setDepth(50).setScale(scale);

        this.table = scene.add.image(width/2, height/2 - this.bg.height * 0.05, 'gameOver-table').setScrollFactor(0).setDepth(50).setScale(0.5);
        this.header = scene.add.image(width/2, (height - this.bg.height/2) * scale, 'gameOver-header').setScrollFactor(0).setDepth(50).setScale(scale);

        this.btnMenu = new UIButton(scene, width/2 + (this.bg.width/4 * scale), height/2 + (this.bg.height/4 * scale) + 30, 'btn-menu', () => {
            scene.scene.start('MainMenu');
        })
        this.btnMenu.body.setScale(0.45).setScrollFactor(0);

        this.btnRestart = new UIButton(scene, width/2 - (this.bg.width/4 * scale), height/2 + (this.bg.height/4 * scale) + 30, 'btn-restart', () => {
            scene.scene.restart();
        })

        this.btnRestart.body.setScale(0.45).setScrollFactor(0);

        this.text = scene.add.text(width/2, height/2, 'Wynik: 0', {
            fontSize: 60,
            color: 'black',
            fontStyle: 'bold'
        }).setDepth(50).setScrollFactor(0).setOrigin(0.5, 1);

        this.group = scene.add.group([
            this.bg,
            this.table,
            this.header,
            this.btnMenu.body,
            this.btnRestart.body,
            this.text
        ])

        this.group.setActive(false).setVisible(false);
    }

    public turnOn(score: number)
    {
        this.text.setText('Wynik: ' + score);

        this.group.setActive(true).setVisible(true);
    }
}