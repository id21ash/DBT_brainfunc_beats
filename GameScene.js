import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
        this.score = 0;

    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('arrows',
            'assets/arrows.png',
            { frameWidth: 279, frameHeight: 257 }
        );
    }

    create() {
        this.add.image(400, 300, 'background');

        this.player = this.add.sprite(100, 450, 'arrows');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('arrows', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'arrows', frame: 3 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('arrows', { start: 0, end: 6 }),
            frameRate: 3,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    update() {
        if (this.cursors.up.isDown) {
            this.scene.start('gameOverScene');
        }
        else if (this.cursors.left.isDown) {

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {

            this.player.anims.play('right', true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
        }
        else {

            this.player.anims.play('turn');
        }


    }

}