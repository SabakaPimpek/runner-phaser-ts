import { Scene, GameObjects } from 'phaser';
import UIButton from '../ui/uiElements/uiButton';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    startButton: UIButton;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        let { width, height } = this.sys.game.canvas;

        this.add.image(width/2, height/2 - 100, 'menu-background').setScale(0.85);

        this.logo = this.add.image(width/2, height/2 - 100, 'logo').setScale(0.5);
        
        this.startButton = new UIButton(this, width/2, height/2 + 125, 'btn-play', () => {
            this.scene.start('Game');
        })

        this.startButton.setScale(0.25);

        // this.title = this.add.text(512, 460, 'Main Menu', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);
    }
}
