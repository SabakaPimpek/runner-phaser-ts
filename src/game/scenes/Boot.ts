import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.setPath('assets/images/ui/load_bar');

        this.load.image('load-bar-content', '2.png');
        this.load.image('load-bar-bg', 'bg.png');
        this.load.image('load-bar-text', 'text.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
