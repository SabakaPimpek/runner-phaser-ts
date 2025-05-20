import StateMachine from "../../stateMachine/StateMachine";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;
    private stateMachine: StateMachine = new StateMachine();
    private isInvincible: boolean = false;
    private pointerJustDown: boolean = false;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'character-run');

        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.setSize(this.width * 0.75, this.height)

        if(this.body?.halfWidth) this.setSize(this.body?.halfWidth, this.body?.height);

        this.createStates();
        this.stateMachine.setState('running');
        this.setDepth(2);
        this.setMaxVelocity(300, 900);

        scene.input.on('pointerdown', () => {
            this.pointerJustDown = true;
        });
    }

    private createStates() {
		this.stateMachine.addState('running', {
			onEnter: () => this.play('character-run', true),
            onUpdate: () => {
                this.setVelocityX(300);

                if(!this.body?.blocked.down)
                {
                    this.stateMachine.setState('jumping');
                }

                if(this.pointerJustDown)
                {
                    this.jump();
                    this.stateMachine.setState('jumping');
                }

            }
		});

		this.stateMachine.addState('jumping', {
            onEnter: () => this.play('character-jump'),
            onUpdate: () => {
                this.setVelocityX(300);

                if(this.pointerJustDown)
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
                this.setVelocityX(300);

                this.checkIfOnGround();
            }
		});

        this.stateMachine.addState('dead', {
            onEnter: () => {
                this.setActive(false).setVisible(false).setMaxVelocity(0, 0);
                
            },
            onUpdate: () => {
                this.isInvincible = true;
            }
        })
	}   
    
    public update(dt: number) {
        this.stateMachine.update(dt);
        this.pointerJustDown = false;
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

        this.stateMachine.setState('jumping');

        return true;
    }

    public death()
    {
        this.stateMachine.setState('dead');
    }
}
