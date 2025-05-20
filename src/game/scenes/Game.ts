import { Scene } from 'phaser';
import Player from '../gameObjects/characters/Player';
import TilemapManager from '../gameObjects/mapGenerator/TilemapManager';
import UIContainer from '../ui/UiContainer';
import Coin from '../gameObjects/Items/coin';
import Spike from '../gameObjects/Items/spike';

export type GameStats = {
    score: number;
    hearts: number;
}

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;
    tilemapManager: TilemapManager;
    uiContainer: UIContainer;
    stats: GameStats;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.sound.pauseAll();
        let { width, height } = this.sys.game.canvas;
        this.background = this.add.image(width/2, height/2, 'sky').setScale(0.75);
        this.background.setScrollFactor(0);
        this.playThemeMusic();
        
        this.player = new Player(this, 200, 200);

        this.stats = {
            hearts: 3,
            score: 0
        }

        this.tilemapManager = new TilemapManager(this, 0, 0, 3);

        this.physics.world.setBounds(0, -height, Infinity, height*2);
        this.cameras.main.startFollow(this.player, false, 1, 0, -300, 0);
        this.cameras.main.setBounds(0, -height, Infinity, height *2);

        this.tilemapManager.tilemaps.forEach(e => {
            if(e.botLayer) this.physics.add.collider(this.player, e.botLayer);
        })

        this.uiContainer = new UIContainer(this);

        this.createObjectColliders();
    }

    update(dt: number)
    {
        this.player.update(dt);
        this.tilemapManager.update();
        this.checkIfPlayerIsOutsideMap();
    }

    playThemeMusic()
    {
        const musicConfig = {
             loop: true
        }

        this.sound.play('gameTheme', musicConfig);
    }

    createObjectColliders()
    {
        this.tilemapManager.getAllObjects().forEach(e => {
            if(e instanceof Coin)
            {
                this.physics.add.overlap(this.player, e, () => {
                    if(e.collect())
                    {
                        this.stats.score += 50;
                        this.uiContainer.scoreText.setText("Punkty: " + this.stats.score);
                    }
                })
            }
            else if(e instanceof Spike)
            {
                this.physics.add.overlap(this.player, e, () => {
                    this.handlePlayerHurt();
                })
            }
        })
    }

    handlePlayerHurt()
    {
        if(this.player.hurt())
        {
            this.stats.hearts--;
            this.uiContainer.heartsManager.setHearts(this.stats.hearts);

            if(this.stats.hearts <= 0) this.gameOver();
        }
    }

    checkIfPlayerIsOutsideMap()
    {

        console.log(this.player.y + this.player.height, this.physics.world.bounds.bottom);

        // Przykład: jeśli gracz wypadnie poniżej widoku kamery
        if (this.player.y + this.player.height > this.physics.world.bounds.bottom) {
            this.handlePlayerHurt();
            this.player.setY(-100);
        }
    }

    gameOver()
    {
        this.player.death();
        this.uiContainer.gameOverScreen.turnOn(this.stats.score);
    }
}
