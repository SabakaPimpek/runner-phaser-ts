import gameOverScreen from "./uiElements/gameOverScreen";
import HeartsManager from "./uiElements/heartsManager";
import UiText from "./uiElements/UiText";

export default class UIContainer {
    scene: Phaser.Scene
    heartsManager: HeartsManager
    scoreText: UiText
    gameOverScreen: gameOverScreen
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;

       this.heartsManager = new HeartsManager(scene);

       this.scoreText = new UiText(scene, 0, 0, 'Punkty: 0', {
        fontSize: 48,
       })

       this.gameOverScreen = new gameOverScreen(scene, 0.5);
    }
}