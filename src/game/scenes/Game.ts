import { Scene } from 'phaser';
import Player from '../gameObjects/characters/Player';
import Tilemap from '../mapGenerator/Tilemap';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;
    tilemap: Tilemap;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let { width, height } = this.sys.game.canvas;
        this.background = this.add.image(width/2, height/2, 'sky').setScale(0.75);
        this.background.setScrollFactor(0);

        this.player = new Player(this, 200, 200);

        this.tilemap = new Tilemap(this, 0, 0, 3);

        this.physics.world.setBounds(0, -height, 10000, height*2);
        this.cameras.main.startFollow(this.player, false, 1, 0, -300, 0);

        if(this.tilemap.botLayer) this.physics.add.collider(this.player, this.tilemap.botLayer)
    }

    update(dt: number)
    {
        this.player.update(dt);
    }
}
