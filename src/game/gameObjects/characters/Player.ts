import StateMachine from "../../stateMachine/StateMachine";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;
    private stateMachine: StateMachine = new StateMachine();
    private canJump: boolean = true;
    private isInvincible: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'character-run');

        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        if(this.body?.halfWidth) this.setSize(this.body?.halfWidth, this.body?.height);

        this.createStates();
        this.stateMachine.setState('running');
        this.setDepth(2);
    }

    private createStates() {
		this.stateMachine.addState('running', {
			onEnter: () => this.play('character-run', true),
            onUpdate: () => {
                if(!this.body?.blocked.down)
                {
                    this.stateMachine.setState('jumping');
                }

                if(this.scene.input.activePointer.isDown && this.canJump)
                {
                    this.canJump = false;
                    this.jump();
                    this.scene.time.delayedCall(200, () => {
                        this.canJump = true;   
                    })
                    this.stateMachine.setState('jumping');
                }

            }
		});

		this.stateMachine.addState('jumping', {
            onEnter: () => this.play('character-jump'),
            onUpdate: () => {

                if(this.scene.input.activePointer.isDown && this.canJump)
                {
                    this.jump();
                    this.stateMachine.setState('doubleJumping');
                }
                this.checkIfOnGround();
            }
		});


		this.stateMachine.addState('doubleJumping', {
			onEnter: () => this.play('character-jump'), // lub 'character-double-jump'
            onUpdate: () => {
                this.checkIfOnGround();
            }
		});
	}   
    
    public update(dt: number) {
        this.stateMachine.update(dt);
        this.setVelocityX(300);
    }

    private jump() {
        this.setVelocityY(-700);
        this.scene.sound.play('player-jump');
    }

    private checkIfOnGround()
    {
        if(this.body?.blocked.down) this.stateMachine.setState('running');
    }
    
    public hurt(): boolean {
    if (this.isInvincible) return false;

        this.scene.sound.play('player-hurt');

        this.isInvincible = true;

        this.scene.cameras.main.shake(100, 0.01);

        const flashTween = this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 100,
            yoyo: true,
            repeat: 4, // 5 błysków = 1 sekunda (5 * 200ms)
            onComplete: () => {
                this.alpha = 1;
            }
        });

        this.scene.time.delayedCall(1000, () => {
            this.isInvincible = false;
            this.alpha = 1;
        });

        return true;
    }
}
