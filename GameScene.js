import Phaser from "phaser";

let beat = 600;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
        this.kick;
        this.quadrants;
        this.timerEvent;
        this.target;
        this.anims;
        this.cursors;
        this.score = 0;
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.audio("kick", "/assets/kick.mp3");
        this.load.spritesheet('arrows_green',
            'assets/arrows_green.png',
            { frameWidth: 279, frameHeight: 257 }
        );
        this.load.spritesheet('arrows_pink',
            'assets/arrows_pink.png',
            { frameWidth: 279, frameHeight: 257 }
        );
        this.load.spritesheet('arrows_yellow',
            'assets/arrows_yellow.png',
            { frameWidth: 279, frameHeight: 257 }
        );
        this.load.spritesheet('arrows_purple',
            'assets/arrows_purple.png',
            { frameWidth: 279, frameHeight: 257 }
        );
    }

    create() {
        this.add.image(0, 0, "background").setOrigin(0, 0);
        this.kick = this.sound.add("kick");

        this.quadrants = [
            ["arrows_pink", (this.scale.width / 4) * 3, this.scale.height / 4], 
            ["arrows_green", this.scale.width / 4, this.scale.height / 4], 
            ["arrows_purple", this.scale.width / 4, (this.scale.height / 4) * 3], 
            ["arrows_yellow", (this.scale.width / 4) * 3, (this.scale.height / 4) * 3]
        ];

        this.beatTimer = this.time.addEvent({
            delay: beat,
            callback: this.triggerBeat,
            callbackScope: this,
            loop: true
        });

        this.animationTimer = this.time.addEvent({
            delay: beat*4,
            callback: this.triggerEvent,
            callbackScope: this,
            loop: true
        });

        let position = this.getRandomQuadrant();
        this.target = this.add.sprite(position[1], position[2], position[0]).setOrigin(0.5, 0.5);
        this.target.angle = this.getRandomRotation();

        this.createAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.up.isDown) {
            this.scene.start('gameOverScene');
        }
    }

    triggerBeat() {
        this.kick.play();
    }

    triggerEvent() {
        // Change the texture and play the animations
        let newPosition = this.getRandomQuadrant();
        this.target.setTexture(newPosition[0]);
        this.target.setX(newPosition[1]);
        this.target.setY(newPosition[2]);
        this.target.angle = this.getRandomRotation();

        this.target.play(`${newPosition[0]}_steps`, true);

        // Ensure the 'boom' animation plays after the 'steps' animation completes
        this.target.on('animationcomplete', () => {
            if (this.target.anims.currentAnim.key === `${newPosition[0]}_steps`) {
                this.target.play(`${newPosition[0]}_boom`);
            }
        });
    }

    getRandomQuadrant() {
        return this.quadrants[Math.floor(Math.random() * 4)];
    }

    getRandomRotation() {
        const rotations = [0, 90, 180, 270];
        return rotations[Math.floor(Math.random() * 4)];
    }

    createAnimations() {
        // Define animations for all quadrants
        this.quadrants.forEach(quadrant => {
            const texture = quadrant[0];

            /*
            this.anims.create({
                key: `${texture}_steps`,
                frames: this.anims.generateFrameNumbers(texture, { start: 0, end: 3 }),
                frameRate: 4,
                //repeat: -1
            });*/
            this.anims.create({
                key: `${texture}_steps`,
                frames: [
                    { key: texture, frame: 1, duration: beat },
                    { key: texture, frame: 2, duration: beat },
                    { key: texture, frame: 3, duration: beat }
                ],
                frameRate: 10
            });

            this.anims.create({
                key: `${texture}_boom`,
                frames: [
                    { key: texture, frame: 4, duration: 20 },
                    { key: texture, frame: 5, duration: 20 },
                    { key: texture, frame: 6, duration: 200 }, // Longer duration for frame 6
                    { key: texture, frame: 5, duration: 50 },
                    { key: texture, frame: 4, duration: 50 }
                ],
                frameRate: 10
            });
        });
    }
}
