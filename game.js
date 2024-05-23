import GameScene from './GameScene'
import GameOverScene from './GameOverScene'
import StartScene from './StartScene'

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
    scene: [StartScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);
