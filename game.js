import GameScene from './GameScene'
import GameOverScene from './GameOverScene'
import StartScene from './StartScene'
import TutorialScene from './TutorialScene'
import PauseScene from './PauseScene'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const config = {
    type: Phaser.AUTO,
    width: sizes.width,
    height: sizes.height,
    backgroundColor: 0xffffff,
    dom: {
        createContainer: true
    },
    scene: [StartScene, TutorialScene, GameScene, PauseScene, GameOverScene]
};

const game = new Phaser.Game(config);
