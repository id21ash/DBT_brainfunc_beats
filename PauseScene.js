import Phaser from "phaser";

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image('pausescreen', 'assets/blur.png'); 
        this.load.image('overlay', 'assets/blurr.png'); 
        this.load.image('startaom', 'assets/startaom.png');
        this.load.image('startsida', 'assets/startsida.png');
        this.load.image('aterga', 'assets/aterga.png');
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        const buttonOffsetY = 100;

        this.overlay = this.add.image(centerX, centerY, 'overlay');
        this.overlay.setDisplaySize(this.scale.width, this.scale.height);
        this.pausescreen = this.add.image(centerX, centerY - buttonOffsetY / 2, 'pausescreen').setOrigin(0.5, 0.5);

        //Återgå knapp
        const resumeY = centerY + buttonOffsetY / 2 -260;
        this.resumeButton = this.add.image(centerX, resumeY , 'aterga').setOrigin(0.5, 0.5);
        this.resumeButton.setInteractive();
        this.resumeButton.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('gameScene');
        });

        //Startsida knapp
        const startsidaY = centerY + buttonOffsetY / 2 -20; 
        this.startsidaButton = this.add.image(centerX, startsidaY, 'startsida').setOrigin(0.5, 0.5);
        this.startsidaButton.setInteractive();
        this.startsidaButton.on('pointerdown', () => {
            this.scene.stop('gameScene'); 
            this.scene.stop(); 
            this.scene.start('startScene'); 
        });

        //Starta om knapp
        const startaomY = centerY + buttonOffsetY / 2 -180; 
        this.startaomButton = this.add.image(centerX, startaomY , 'startaom').setOrigin(0.5, 0.5);
        this.startaomButton.setInteractive();
        this.startaomButton.on('pointerdown', () => {
            this.scene.stop('gameScene'); 
            this.scene.stop(); 
            this.scene.start('gameScene'); 
        });
        
    }
}
