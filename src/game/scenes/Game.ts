import { Scene } from 'phaser';
import Player from '../gameObjects/characters/player';
import Tilemap from '../mapGenerator/Tilemap';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let { width, height } = this.sys.game.canvas;
        this.background = this.add.image(width/2, height/2, 'sky').setScale(0.75);

        this.player = new Player(this, 200, 200);

        this.input.on('pointerdown', () => {
            this.player.jump();
        })

        new Tilemap(this, 3);
    }

    update()
    {
        this.player.update();
    }
}
