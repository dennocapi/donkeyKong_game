//create a new scene
let gameScene = new Phaser.Scene('Game');


// load assets
gameScene.preload = function() {

    // Load images
    this.load.image('background','assets/sky.png');
    this.load.image('player','assets/player.png');
    this.load.image('platform','assets/platform.png');
    this.load.image('rock','assets/rock.png');
};

// called once after the preload ends
gameScene.create = function(){

    // create background sprite
    let game_width = this.sys.game.config.width;
    let game_height = this.sys.game.config.height;

    this.bg = this.add.sprite(game_width/2,game_height/2,'background');

    // create the player sprite
    this.player = this.add.sprite(80,580,'player');
    // player.depth = 1;
    this.player.setScale(1,1); //changing the size of a sprite

    //flip
    // this.player.flipX = true;
    // this.player.flipY = true;

    // rotating a sprite
    // this.player.angle = 45;
    // this.player.setAngle(45);
    // this.player.setOrigin(0,0) // rotating about a specified point

    // using radians
    // this.player.rotation = Math.PI /4;
    // this.player.setRotation(Math.PI / 4);

    // create a platform sprite
    this.platform = this.add.sprite(400, 580, 'platform');
    this.platform.setScale(2,0.5);

    this.platform1 = this.add.sprite(300, 500, 'platform');
    this.platform1.setScale(2,0.5);
    this.platform1.angle = 2;

    this.platform2 = this.add.sprite(500, 400, 'platform');
    this.platform2.setScale(2,0.5);
    this.platform2.angle = -1;

    this.platform3 = this.add.sprite(300, 300, 'platform');
    this.platform3.setScale(2,0.5);
    this.platform3.angle = 2;

    this.platform4 = this.add.sprite(500, 200, 'platform');
    this.platform4.setScale(2,0.5);
    this.platform4.angle = -1;

    this.platform5 = this.add.sprite(300, 100, 'platform');
    this.platform5.setScale(2,0.5);
    this.platform5.angle = 2;

    // create the rotating rock sprite
    this.rock = this.add.sprite(50,50,'rock');
    this.rock.setScale(0.2,0.2);

};

//This update function is called 60 times per second
gameScene.update = function(){

    this.rock.x += 1;
    // this.player.x += 1;
    // this.player.rotation += 1;

    // make a sprite to grow in size over time with a limit
    // if (this.player.scaleX < 2) {
    //     this.player.scaleX += 0.01;
    // }
}

//set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: gameScene
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);
