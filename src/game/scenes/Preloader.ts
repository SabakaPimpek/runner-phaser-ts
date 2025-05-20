import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        let { width, height } = this.sys.game.canvas;
        //  We loaded this image in our Boot Scene, so we can display it here

         const loadBarBg = this.add.image(width / 2, height / 2, 'load-bar-bg').setScale(0.5);

        // Rzeczywista szerokość i wysokość tła po skalowaniu
        const bgDisplayWidth = loadBarBg.width * loadBarBg.scaleX;
        const bgDisplayHeight = loadBarBg.height * loadBarBg.scaleY;

        // Lewa krawędź tła
        const barStartX = loadBarBg.x - bgDisplayWidth / 2;

        // Pasek ładowania
        const loadBar = this.add.image(barStartX + 7, height / 2, 'load-bar-content')
            .setOrigin(0, 0.5);

        const loadText = this.add.image(width/2, height/2 - 50, 'load-bar-text').setScale(0.75);

        // Skalujemy pasek ładowania tak, by dopasować jego rozmiar do tła
        const scaleX = (bgDisplayWidth - 10) / loadBar.width; // zostawiamy np. 10px margines z każdej strony
        const scaleY = (bgDisplayHeight / loadBar.height) * 0.8;

        loadBar.setScale(scaleX, scaleY);

        // Obsługa ładowania
        this.load.on('progress', (progress: number) => {
            const fullWidth = loadBar.width; // używamy surowej, nieskalowanej szerokości tekstury
            const fullHeight = loadBar.height;

            loadBar.setCrop(0, 0, fullWidth * progress, fullHeight);
        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets/images');

        this.load.image('sky', 'sky.png');
        this.load.image('menu-background', 'ui/menu/bg.png');
        this.load.image('logo', 'ui/menu/logo.png');
        
        //GameOver screen
        this.load.image('gameOver-bg', 'ui/you_lose/bg.png');
        this.load.image('gameOver-header', 'ui/you_lose/header.png');   
        this.load.image('gameOver-table', 'ui/you_lose/table.png');
        
        this.load.image('btn-play', 'ui/menu/play.png');
        this.load.image('btn-menu', 'ui/menu/menu.png');
        this.load.image('btn-restart', 'ui/menu/restart.png');

        this.load.spritesheet("character-run", 'character-run.png',
            {
                frameWidth: 128,
                frameHeight: 128,
            }
        )

        this.load.spritesheet("character-jump", 'character-jump.png',
            {
                frameWidth: 128,
                frameHeight: 128,
            }
        )
        
        this.load.spritesheet('spritesheet', 'spritesheet.png', {
            frameWidth: 21,
            frameHeight: 21,
            margin: 3,
            spacing: 2
        })

        this.loadTilemaps();
        this.loadMusic();
    }
    
    private createAnimations() {
        this.anims.create({
            key: 'character-run',
            frames: this.anims.generateFrameNumbers('character-run', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });
        
        this.anims.create({
            key: 'character-jump',
            frames: this.anims.generateFrameNumbers('character-jump', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
    }
    
    private loadTilemaps()
    {
        this.load.setPath('assets/JSON');

        this.load.tilemapTiledJSON("tile1", 'tile1.json');
        this.load.tilemapTiledJSON("tile2", 'tile2.json');
        this.load.tilemapTiledJSON("tile3", 'tile3.json');
    }

    private loadMusic()
    {
        this.load.setPath('assets/sound')

        this.load.audio('gameTheme', 'gameTheme.mp3');
        this.load.audio('menuTheme', 'menuTheme.vaw');
        this.load.audio('player-hurt', 'player-hurt.ogg');
        this.load.audio('coin-pickup', 'coin-pickup.wav');
        this.load.audio('player-jump', 'player-jump.wav');
    }
    
    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        this.createAnimations();
        
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
