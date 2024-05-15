export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOverScene');
    this.score;
  }

  init(data) {
    console.log(data);
    this.score = data;
  }

  preload() {

  }

  create() {
    // Display the "Game Over!" text
    this.add.text(400, 190, 'Game Over!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 220, 'Hej på dig :)', { fontSize: '28px', fill: '#fff' }).setOrigin(0.5);

    const startButton = this.add.text(400, 300, 'Start', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', () => {
        // Resume the main game scene when the start button is clicked
        this.scene.start('startScene');
    });
  }
}