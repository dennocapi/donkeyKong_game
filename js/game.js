import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';
import PreloadScene from './preloadScene.js';
import ControlsScene from './controlsScene.js';
import InfoScene from './infoScene.js';
import PauseScene from './pauseScene.js';

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();
var preloadScene = new PreloadScene();
var controlsScene = new ControlsScene();
var infoScene = new InfoScene();
var pauseScene = new PauseScene();


//* Game scene */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 200 }
    }
}
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('preloadScene', preloadScene);
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);
game.scene.add("controlsScene", controlsScene);
game.scene.add("infoScene", infoScene);
game.scene.add("pauseScene", pauseScene);

// start title
game.scene.start('preloadScene');
// game.scene.start('titleScene');
