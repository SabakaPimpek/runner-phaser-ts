import { Scene } from 'phaser';
import Player from '../gameObjects/characters/Player';
import TilemapManager from '../mapGenerator/TilemapManager';
import UIContainer from '../ui/UiContainer';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;
    tilemapManager: TilemapManager;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let { width, height } = this.sys.game.canvas;
        this.background = this.add.image(width/2, height/2, 'sky').setScale(0.75);
        this.background.setScrollFactor(0);
        this.playThemeMusic();
        
        this.player = new Player(this, 200, 200);

        this.tilemapManager = new TilemapManager(this, 0, 0, 3);

        this.physics.world.setBounds(0, -height, Infinity, height*2);
        this.cameras.main.startFollow(this.player, false, 1, 0, -300, 0);
        this.cameras.main.setBounds(0, -height, Infinity, height *2);

        this.tilemapManager.tilemaps.forEach(e => {
            if(e.botLayer) this.physics.add.collider(this.player, e.botLayer);
        })

        new UIContainer(this);
    }

    update(dt: number)
    {
        this.player.update(dt);
        this.tilemapManager.update();
    }

    playThemeMusic()
    {
        const musicConfig = {
             loop: true
        }

        this.sound.play('gameTheme', musicConfig);
    }
}
