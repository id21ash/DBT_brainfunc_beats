import Phaser from "phaser";

let beat = 500;

export default class GameScene extends Phaser.Scene {
    constructor(sizes) {
        super({ key: 'gameScene' });
        this.kick;
        this.song;
        this.quadrants;
        this.timerEvent;
        this.target;
        this.anims;
        this.cursors;
        this.score = 0;
        this.sizes = sizes;
        console.log(sizes)
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.audio("kick", "/assets/kick.mp3");
        this.load.audio("tiktok", "/assets/tiktok.mp3");
        this.load.audio("callmemaybe", "/assets/callmemaybe.mp3");

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
        this.add.image(this.sizes.width/2, this.sizes.height/2, "background").setOrigin(0.5, 0.5);        
        this.kick = this.sound.add("kick");
        this.song = this.sound.add("tiktok");
        //this.song = this.sound.add("callmemaybe");

        this.quadrants = [
            ["arrows_pink", (this.scale.width / 4) * 3, this.scale.height / 4],
            ["arrows_green", this.scale.width / 4, this.scale.height / 4],
            ["arrows_purple", this.scale.width / 4, (this.scale.height / 4) * 3],
            ["arrows_yellow", (this.scale.width / 4) * 3, (this.scale.height / 4) * 3]
        ];

        this.time.delayedCall(1000 + 700, () => {
            this.song.play();
        });

        /*
        this.beatTimer = this.time.addEvent({
            delay: beat,
            callback: this.triggerBeat,
            callbackScope: this,
            loop: true
        });*/

        this.animationTimer = this.time.addEvent({
            delay: beat * 4,
            callback: this.triggerEvent,
            callbackScope: this,
            loop: true
        });

        let position = this.getRandomQuadrant();
        this.target = this.add.sprite(position[1], position[2], position[0]).setOrigin(0.5, 0.5);

        // Set rotation of target depending on which quadrant it is in
        if (this.target.texture.key === 'arrows_green') {
            this.target.angle = this.getRandomLeftArmRotation();
        } else if (this.target.texture.key === 'arrows_pink') {
            this.target.angle = this.getRandomRightArmRotation();
        } else {
            this.target.angle = this.getRandomLegRotation();
        }

        this.createAnimations();
        this.playAnimation(position[0]);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.up.isDown) {
            this.song.stop();
            this.scene.stop();
            this.scene.remove('gameScene');
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

        // Set rotation of target depending on which quadrant it is in
        if (this.target.texture.key === 'arrows_green') {
            this.target.angle = this.getRandomLeftArmRotation();
        } else if (this.target.texture.key === 'arrows_pink') {
            this.target.angle = this.getRandomRightArmRotation();
        } else {
            this.target.angle = this.getRandomLegRotation();
        }

        this.playAnimation(newPosition[0]);
    }

    playAnimation(textureKey) {
        this.target.play(`${textureKey}_steps`, true);

        // Ensure the 'boom' animation plays after the 'steps' animation completes
        this.target.once('animationcomplete', () => {
            if (this.target.anims.currentAnim.key === `${textureKey}_steps`) {
                this.target.play(`${textureKey}_boom`);
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

    getRandomLeftArmRotation() {
        const rotations = [0, -90];
        return rotations[Math.floor(Math.random() * 2)];
    }

    getRandomRightArmRotation() {
        const rotations = [0, 90];
        return rotations[Math.floor(Math.random() * 2)];
    }

    getRandomLegRotation() {
        const rotations = [0, 180];
        return rotations[Math.floor(Math.random() * 2)];
    }

    createAnimations() {
        // Define animations for all quadrants
        this.quadrants.forEach(quadrant => {
            const texture = quadrant[0];

            /*
            this.anims.create({
                key: `${texture}_steps`,
                frames: this.anims.generateFrameNumbers(texture, { start: 1, end: 3 }),
                frameRate: 1000/beat,
                //repeat: -1
            });*/
            this.anims.create({
                key: `${texture}_steps`,
                frames: this.anims.generateFrameNumbers(texture, { start: 1, end: 3 }),
                frameRate: 100/beat
            });

            this.anims.create({
                key: `${texture}_boom`,
                frames: [
                    { key: texture, frame: 4, duration: 20 },
                    { key: texture, frame: 5, duration: 20 },
                    { key: texture, frame: 6, duration: 300 },
                    { key: texture, frame: 5, duration: 80 },
                    { key: texture, frame: 4, duration: 80 }
                ]
                //frameRate: 10
            });
        });
    }
}
