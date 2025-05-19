import HeartsManager from "./uiElements/heartsManager";

export default class UIContainer {
    scene: Phaser.Scene
    heartsManager: HeartsManager
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;

       this.heartsManager = new HeartsManager(scene);
    }
}