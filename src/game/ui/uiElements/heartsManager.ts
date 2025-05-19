/**
 * @param {Phaser.Scene} scene
 * @param {number} maxLives
 */

// Tilemap IDs

const spritesheetName = "spritesheet";
const fullHeartID = 139;
const EmptyHeartID = 141;
const margin = 40;
const spacing = 70;

export default class HeartsManager {
    private scene: Phaser.Scene;
    private maxLives: number;
    private currentLives: number;
    private group: Phaser.GameObjects.Sprite[] = []
    constructor(scene: Phaser.Scene, maxLives: number = 3)
    {
        this.scene = scene;

        // this.group = scene.add.group(); // Displayed hearts images in group
        this.maxLives = maxLives;
        this.currentLives = maxLives;

        this.create();
    }

    private create()
    {
        for(let i = 0; i < this.maxLives; i++)
        {
            const sprite = this.scene.add.sprite(
                this.scene.sys.canvas.width - margin - (i * spacing),
                margin,
                spritesheetName,
                fullHeartID
            );

            sprite.setScrollFactor(0);
            sprite.setScale(3);
            sprite.setDepth(100);

            this.group.push(sprite);
        }

        this.group.sort((a, b) => a.x - b.x);
    }

    private updateTexture()
    {
        for(let i = 0; i < this.group.length; i++)
            {
            if(i < this.currentLives) this.group[i].setTexture(spritesheetName, fullHeartID);
            else this.group[i].setTexture(spritesheetName, EmptyHeartID);
        }
    
    }

    public addLife()
    {
        if(this.currentLives >= this.maxLives) return;
        this.currentLives++;
        this.updateTexture();
    }

    public removeLife()
    {
        if(this.currentLives > 0)
        {
            this.currentLives--;
            this.updateTexture();
        }
    }
}