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
    this.load.image('bakgrund', 'bakgrundspil.png');
    this.load.image('bakgrundkub', 'bakgrundskub.png'); 
    this.load.image('knapp', 'knapp.png'); 
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

            
            const mittBilden = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bakgrundkub').setOrigin(0.5);

            const startButton = this.add.image(this.scale.width / 2, this.scale.height / 2 + 247, 'knapp').setOrigin(0.5);
            startButton.setInteractive();
            startButton.on('pointerdown', () => {
                this.scene.start('startScene');
            });
            const randomMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
            this.add.text(this.scale.width / 2, 210, randomMessage, textStyle).setOrigin(0.5);

        }
    });
}

update(time, delta) {
  this.background.tilePositionX += 0.5;
}

}
