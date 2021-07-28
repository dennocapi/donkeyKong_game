class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:'titleScene'});
    }

    preload() {
        this.load.image('background', 'assets/bg2.jpg');
    }

    create() {
        var bg = this.add.sprite(0,0,'background');
         bg.setOrigin(0,0);

        var text = this.add.text(50,100, 'Welcome donkey kong game',{ fontSize: '50px', fill: '#0f0' });
        var playText = this.add.text(100,200, 'Play', { fontSize: '40px', fill: '#FFF' });
        var controlsText = this.add.text(100,250, 'Controls', { fontSize: '40px', fill: '#FFF' });
        var infoText = this.add.text(100,300, 'Instructions', { fontSize: '40px', fill: '#FFF' });

        playText.setInteractive({ useHandCursor: true });
        playText.on('pointerdown', () => this.clickButtonText());

        controlsText.setInteractive({ useHandCursor: true });
        controlsText.on('pointerdown', () => this.clickButtonControls());

        infoText.setInteractive({ useHandCursor: true });
        infoText.on('pointerdown', () => this.clickButtonInfo());
    }

    clickButtonText() {
        this.scene.switch('gameScene');
    }

    clickButtonControls() {
        this.scene.switch('controlsScene');
    }

    clickButtonInfo() {
        this.scene.switch('infoScene');
    }

}

export default TitleScene;
