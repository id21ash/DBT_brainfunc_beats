export default class StartScene extends Phaser.Scene {
    constructor(data) {
        super({ key: 'startScene' });
    }

    preload() {
        this.load.image('logo', 'assets/beats.png');
        this.load.image('pilar', 'assets/pilar.png');
        this.load.image('playbutton', 'assets/Playbutton.png');
        this.load.image('settingsbutton', 'assets/Settingsbutton.png');
        this.load.image('infobutton', 'assets/Infobutton.png');
        this.load.image('endbutton', 'assets/Endbutton.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#D7F8FF');

        const logoScaleFactor = Math.min(this.scale.width / 1000, this.scale.height / 800);
        this.logo = this.add.image(20, 50, 'logo').setOrigin(0, 0);
        this.logo.setScale(logoScaleFactor);

        const buttonScaleFactor = Math.min(this.scale.width / 1500, this.scale.height / 1300);
        const buttonX = 220; // knapparna nära vänsterkanten

        const buttonYStart = this.logo.y + (this.logo.height * logoScaleFactor) + 100; // 50 avståndet under logon
        const buttonSpacing = 20 * buttonScaleFactor; // Avstånd mellan knapparna

        let currentButtonY = buttonYStart;

        this.playbutton = this.createButton(buttonX, currentButtonY, 'playbutton', buttonScaleFactor, () => {
            this.scene.start('gameScene');
        });
        currentButtonY += this.playbutton.height * buttonScaleFactor + buttonSpacing;

        this.settingsbutton = this.createButton(buttonX, currentButtonY, 'settingsbutton', buttonScaleFactor);
        currentButtonY += this.settingsbutton.height * buttonScaleFactor + buttonSpacing;

        this.infobutton = this.createButton(buttonX, currentButtonY, 'infobutton', buttonScaleFactor);
        currentButtonY += this.infobutton.height * buttonScaleFactor + buttonSpacing;

        this.endbutton = this.createButton(buttonX, currentButtonY, 'endbutton', buttonScaleFactor);

        const pilarScaleFactor = Math.min(this.scale.width / 1200, this.scale.height / 1000);
        const pilarX = this.scale.width - (this.textures.get('pilar').getSourceImage().width * pilarScaleFactor / 2);
        const pilarY = this.scale.height / 2;
        this.pilar = this.add.image(pilarX, pilarY, 'pilar').setOrigin(0.5, 0.5);
        this.pilar.setScale(pilarScaleFactor);
    }

    createButton(x, y, texture, scale, callback = null) {
        const button = this.add.image(x, y, texture).setOrigin(0.5, 0.5);
        button.setScale(scale);
        if (callback) {
            button.setInteractive();
            button.on('pointerdown', callback);
        }
        return button;
    }
}