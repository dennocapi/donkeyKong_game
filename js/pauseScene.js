class PauseScene extends Phaser.Scene {

    constructor() {
        super({key:'pauseScene'});
    }

    preload() {
        this.load.image('background', 'assets/bg3.jpg');
    }

    create() {
        var bg = this.add.sprite(0,0,'background');
        bg.setOrigin(0,0);

        var text = this.add.text(100,100, 'Game paused',{fontSize: '50px', fill: '#0f0' });
        var resumeText = this.add.text(100,200, 'Resume',{fontSize: '40px' });
        var quitText = this.add.text(100,250, 'Quit',{fontSize: '40px'});

        resumeText.setInteractive({ useHandCursor: true });
        resumeText.on('pointerdown', () => this.clickButtonResume());

        quitText.setInteractive({ useHandCursor: true });
        quitText.on('pointerdown', () => this.clickButtonQuit());
    }

    clickButtonResume() {
        this.scene.resume('gameScene');
        this.scene.stop();
    }

    clickButtonQuit() {
        this.scene.stop('gameScene') ;
        this.scene.start('titleScene');
    }

}

export default PauseScene;
