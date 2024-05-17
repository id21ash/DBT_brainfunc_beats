import GameScene from './GameScene'
import GameOverScene from './GameOverScene'
import StartScene from './StartScene'

const config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 816,
    backgroundColor: 0x000000,
    dom: {
        createContainer: true
    },
    scene: [StartScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);
