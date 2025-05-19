import { Scene } from 'phaser';
import Player from '../gameObjects/characters/Player';
import TilemapManager from '../gameObjects/mapGenerator/TilemapManager';
import UIContainer from '../ui/UiContainer';
import Coin from '../gameObjects/Items/coin';
import Spike from '../gameObjects/Items/spike';

type GameStats = {
    score: number
}

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;
    tilemapManager: TilemapManager;
    uiContainer: UIContainer;
    stats: GameStats = {
        score: 0
    }

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

        this.uiContainer = new UIContainer(this);

        this.tilemapManager.getAllObjects().forEach(e => {
            if(e instanceof Coin)
            {
                this.physics.add.overlap(this.player, e, () => {
                    e.collect();
                    this.stats.score += 50;
                })
            }
            else if(e instanceof Spike)
            {
                this.physics.add.overlap(this.player, e, () => {
                    this.player.hurt()
                })
            }
        })
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
