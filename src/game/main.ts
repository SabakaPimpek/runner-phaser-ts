import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#6eced6',
    powerPreference: 'high-performance',
    fps: {
        target: 60
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, // lub false
            gravity: {
                y: 1200,
                x: 0
            },
            fps: 60
        },
    },

};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
