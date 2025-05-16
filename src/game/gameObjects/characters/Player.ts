import StateMachine from "../../stateMachine/StateMachine";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene;
    private stateMachine: StateMachine = new StateMachine();
    private canJump: boolean = true;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'character-run');

        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.play("character-run", true);
      
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

                if(this.scene.input.activePointer.isDown)
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
          this.setVelocityX(400);
    }

    private jump() {
        this.setVelocityY(-700);
    }

    private checkIfOnGround()
    {
        if(this.body?.blocked.down) this.stateMachine.setState('running');
    }
}
