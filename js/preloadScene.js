class PreloadScene extends Phaser.Scene {

    constructor() {
        super({key : 'preloadScene'});
    }

preload() {

        // this.load.image('background', 'assets/bg3.jpg');

        this.graphics = this.add.graphics();
        this.newGraphics = this.add.graphics();
        var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
        var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRectShape(progressBar);

        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(progressBarFill);

        var gameText = this.add.text(250,160,"Donkey Kong Game ", { fontSize: '32px', fill: '#FFF' });
        var loadingText = this.add.text(250,260,"Loading: ", { fontSize: '32px', fill: '#FFF' });


        this.load.image('background', 'assets/bg3.jpg');
        for(var i =0;i<10;i++) {
            this.load.image('background_'+i, 'assets/bg3.jpg');
        }

        this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText});
        this.load.on('complete', this.complete, {scene:this.scene});
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));

        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
        // console.log("P:" + percentage);

    }

    complete() {
        console.log("COMPLETE!");
        this.scene.start("titleScene");
    }

}

export default PreloadScene;
