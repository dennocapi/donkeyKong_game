class InfoScene extends Phaser.Scene {

    constructor() {
        super({key:'infoScene'});
    }

    preload() {
        this.load.image('background', 'assets/bg2.jpg');
    }

    create() {
        var bg = this.add.sprite(0,0,'background');
        bg.setOrigin(0,0);

        var title = this.add.text(100,150, 'Instructions',{ fontSize: '50px', fill: '#0f0' });
        var text1 = this.add.text(15,250, 'You win when you collect the diamond at the top left corner',{ fontSize: '20px', fill: '#fff' });
        var text2 = this.add.text(15,300, 'You have 3 lives - You lose a life when you get hit by a rock',{ fontSize: '20px', fill: '#fff' });
        var text3 = this.add.text(15,350, 'You gain 100 points if a rock reaches the bottom left corner',{ fontSize: '20px', fill: '#fff' });
        var goBack = this.add.text(600,550, '<< Back',{ fontSize: '40px', fill: '#fff' });

        goBack.setInteractive({ useHandCursor: true });
        goBack.on('pointerdown', () => this.clickButtonGoBack());

    }

    clickButtonGoBack() {
        this.scene.switch('titleScene');
    }

}

export default InfoScene;
