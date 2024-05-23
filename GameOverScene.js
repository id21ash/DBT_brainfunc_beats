export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOverScene');
    this.score;
    this.messages = [
      'Nu blev din hjärna glad',
      'Tjohoo du gjorde det!',
      'Bra kämpat!',
      'Starkt jobbat! Varje utmaning gör dig bättre',
      'Fantastiskt! Din uthållighet lönar sig.',
      'Härligt kämpat! Din insats är fantastisk'
    ];
  }

  init(data) {
    console.log(data);
    this.score = data;
  }

  preload() {
    this.load.image('bakgrund', 'assets/bakgrundspil.png');
    this.load.image('bakgrundkub', 'assets/bakgrundskub.png'); 
    this.load.image('knapp', 'assets/knapp.png'); 
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bakgrund');
    this.background.setOrigin(0);
    this.cameras.main.setBackgroundColor('#D7F8FF');

    WebFont.load({
        google: {
            families: ['Jaldi']
        },
        active: () => {
            const textStyle = {
                fontFamily: 'Jaldi',
                fontSize: '30px',
                color: '#1E2665',
                align: 'center',
                padding: { x: 50, y: 10 },
            };

            this.mittBilden = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bakgrundkub').setOrigin(0.5);
            this.startButton = this.add.image(this.scale.width / 2, this.scale.height / 2 + 247, 'knapp').setOrigin(0.5);
            this.startButton.setInteractive();
            this.startButton.on('pointerdown', () => {
                this.scene.start('startScene');
            });

            const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
            this.messageText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, randomMessage, textStyle).setOrigin(0.5);

            this.resize();
            this.scale.on('resize', this.resize, this);
        }
    });
  }

  update(time, delta) {
    this.background.tilePositionX += 0.5;
  }

  resize() {
    this.background.setSize(this.scale.width, this.scale.height);
    this.mittBilden.setPosition(this.scale.width / 2, this.scale.height / 2);
    this.startButton.setPosition(this.scale.width / 2, this.scale.height / 2 + 247);
    this.messageText.setPosition(this.scale.width / 2, this.scale.height / 2 - 100);

  }
}
