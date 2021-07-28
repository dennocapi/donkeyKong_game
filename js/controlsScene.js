class ControlsScene extends Phaser.Scene {

    constructor() {
        super({key:'controlsScene'});
    }

    preload() {
        this.load.image('background', 'assets/bg2.jpg');
    }

    create() {
        var bg = this.add.sprite(0,0,'background');
        bg.setOrigin(0,0);

        var title = this.add.text(100,130, 'Controls',{ fontSize: '50px', fill: '#0f0' });
        var keyUpText = this.add.text(40,200, 'Press up key to Jump',{ fontSize: '30px', fill: '#fff' });
        var keyLeftText = this.add.text(40,250, 'Press left key to move left',{ fontSize: '30px', fill: '#fff' });
        var keyRightText = this.add.text(40,300, 'Press right key to right',{ fontSize: '30px', fill: '#fff' });
        var keyDownText = this.add.text(40,350, 'Press down key to move downwards',{ fontSize: '30px', fill: '#fff' });
        var keySpacebarText = this.add.text(40,400, 'Press the spacebar to pause the game',{ fontSize: '30px', fill: '#fff' });
        var goBack = this.add.text(600,550, '<< Back',{ fontSize: '40px', fill: '#fff' });

        goBack.setInteractive({ useHandCursor: true });
        goBack.on('pointerdown', () => this.clickButtonGoBack());

    }

    clickButtonGoBack() {
        this.scene.switch('titleScene');
    }

}

export default ControlsScene;
