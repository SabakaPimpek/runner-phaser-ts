import HeartsManager from "./uiElements/heartsManager";

export default class UIContainer {
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;

       new HeartsManager(scene);
    }
}