export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'startScene' });
        this.tutorial;
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('play_button', 'assets/play_button_small.png');
    }

    create() {
        this.tutorial = this.add.image(this.scale.width/2, this.scale.height/2, "background").setOrigin(0.5, 0.5);
        if (this.scale.width < this.scale.height) {
            this.tutorial.displayWidth = this.scale.width;
            this.tutorial.scaleY = this.tutorial.scaleX;
        } else {
            this.tutorial.displayHeight = this.scale.height;
            this.tutorial.scaleX = this.tutorial.scaleY;
        }
        this.startButton = this.add.image(this.tutorial.displayWidth*0.97, this.tutorial.displayHeight*0.1, "play_button").setOrigin(0.5, 0.5);        
        this.startButton.displayWidth = this.tutorial.displayWidth/10;
        this.startButton.scaleY = this.startButton.scaleX;

        // Add start screen UI elements
        //const startButton = this.add.text(400, 300, 'Start', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', () => {
            // Resume the main game scene when the start button is clicked
            this.scene.start('tutorialScene');
        });
    }
}