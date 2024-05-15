export default class StartScene extends Phaser.Scene {
    constructor(data) {
        super({ key: 'startScene' });
    }

    create() {
        // Display highscore list
        const startY = 100; // Adjust as needed
        const spacingY = 30; // Adjust as needed
        let i = 0;

        // Add start screen UI elements
        const startButton = this.add.text(400, 300, 'Start', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            // Resume the main game scene when the start button is clicked
            this.scene.start('gameScene');
        });
    }
}