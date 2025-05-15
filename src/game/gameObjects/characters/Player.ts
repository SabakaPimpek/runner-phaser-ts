type PlayerState = 'running' | 'jumping';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;
    jumpCounter: number = 0;
    state: PlayerState = 'running';    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'character-run');

        this.scene = scene;

        // Dodaj gracza do sceny i fizyki
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.play("character-run", true);
    }

    public update() {
        if(this.body?.velocity.y === 0 && this.body?.touching.down) {
            this.changeState('running');
        }
        else {
            this.changeState('jumping');
        }
    }

    public changeState(newState: PlayerState)
    {
        if(newState === this.state) return;

        this.state = newState;

        switch(newState) {
            case 'jumping':
                this.play('character-jump');
                break;
            case 'running':
                this.play('character-run');
                break;
        }
    }



    public jump(): void {
        if (this.body?.touching.down) {
            this.jumpCounter = 0;
        }

        if (this.jumpCounter >= 2) return;


        this.setVelocityY(-700);
        this.jumpCounter++;
    }
}