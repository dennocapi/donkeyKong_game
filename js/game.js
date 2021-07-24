var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update, update
    }
};


game = new Phaser.Game(config);

function preload(){
    // Load images
    this.load.image('background','assets/sky.png');
    this.load.image('platform','assets/platform.png');
    this.load.image('rock','assets/rock.png');
    this.load.image('ladder','assets/ladder.png');
    this.load.image('diamond','assets/diamond.png');
    this.load.image('invisible','assets/invisible.PNG');
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

}

function create(){
    let game_width = this.sys.game.config.width;
    let game_height = this.sys.game.config.height;

    this.bg = this.add.sprite(game_width/2,game_height/2,'background');

    diamond = this.physics.add.staticSprite(10, 50,'diamond').setScale(0.7,0.7);

    invisible = this.physics.add.staticSprite(0, 590,'invisible').setScale(1,1);


    // Adding platforms
    // Setting up platform positions
    var platformPositions = [
    { x:0, y:590 },
    { x:0, y:500 },
    { x:500, y:400 },
    { x:300, y:300 },
    { x:500, y:200 },
    { x:300, y:100 }
    ];
    // Setting platform scale
    var platformScale = [
    { x:4, y:0.5 },
    { x:3.5, y:0.5 },
    { x:2, y:0.5 },
    { x:2, y:0.5 },
    { x:2, y:0.5 },
    { x:2, y:0.5 }
    ];
    // Adding a platform group

    platformGroup = this.physics.add.staticGroup();

    // Looping through the platform group and adding the child elements

    for (var i = 0; i < platformPositions.length; i++) {
        var platform = platformGroup.create(platformPositions[i].x, platformPositions[i].y, 'platform').setScale(platformScale[i].x,platformScale[i].y).refreshBody();
    }
    // Setting up rock positions

    var rockPositions = [
    { x:50, y:80 },
    { x:500, y:80 },
    { x:200, y:80 },
    { x:300, y:80 },
    { x:400, y:180 },
    { x:550, y:180 },
    { x:750, y:180 },
    { x:50, y:280 },
    { x:300, y:280 },
    { x:600, y:280 },
    { x:400, y:380 },
    { x:550, y:380 },
    { x:50, y:480 },
    { x:300, y:480 }
    ];
    // Adding a rock group

    rockGroup = this.physics.add.group();

    // Looping through the rock group and adding the child elements

    for (var i = 0; i < rockPositions.length; i++) {
        var rock = rockGroup.create(rockPositions[i].x, rockPositions[i].y, 'rock').setScale(0.15, 0.15);
        rock.setCollideWorldBounds(true);
        rock.setBounce( 0.5);
        rock.Depth = 1;
    }

    var ladderPositions = [
    { x:650, y:550 },
    { x:150, y:450 },
    { x:450, y:454 },
    { x:650, y:350 },
    { x:400, y:353 },
    { x:150, y:250 },
    { x:350, y:253 },
    { x:650, y:155 }
    ];

    // Adding ladders
    ladderGroup = this.physics.add.staticGroup();

    // Looping through the ladder group and adding the child elements

    for (var i = 0; i < ladderPositions.length; i++) {
    var ladder = ladderGroup.create(ladderPositions[i].x, ladderPositions[i].y, 'ladder').setScale(0.15, 0.15).setScale(0.25,0.34).refreshBody();
    }


    // create the player sprite
    player = this.physics.add.sprite(80,550,'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // creating frames to handle the player in a certain direction
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


    // Adding text for the score
    score = 0;
    scoreText = this.add.text(16,16,'Score: ' + score, {fontSize: '32px', fill: '#000'});
    // Adding text when one wins the game
    win_text = this.add.text(200,300, '' , {fontSize: '100px', fill: '#953553'});
    // Adding text when one loses the game
    lose_text = this.add.text(300,300, '' , {fontSize: '50px', fill: '#FF0000'});
    // Initializing keyboard inputs - to control the player
    cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    // Adding colliders
    this.physics.add.collider(player, platformGroup);
    this.physics.add.collider(rockGroup, platformGroup);
    this.physics.add.collider(player, rockGroup, hitRock, null, this);
    this.physics.add.overlap(rockGroup, invisible, hitInvisible, null, this);
    this.physics.add.overlap(player, diamond, collectDiamond, null, this);
    this.physics.add.overlap(player, ladderGroup);

    // Setting up the velocity and direction of each rock
    rockGroup.getChildren().forEach(function(rock) {
        if (rock.body.velocity.x >= 0) {
            rock.setVelocityX(100);
            rock.angle += 1;

        }
        else if (rock.body.velocity.x = -1) {
            rock.setVelocityX(-100)
            rock.angle += -1;

        }
    }, this);

    // Setting up player direction if the left key if pressed
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    // Setting up player direction if the right key if pressed
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }

    // Setting up player direction if no key is pressed
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    // Enabling a player to jump when touching the floor of a platform
    if (cursors.up.isDown && player.body.touching.down && player.body.onFloor())
    {
        player.setVelocityY(-200);
        player.canDoubleJump = false;
    }

}

// This function runs when a player collides with a rock - the game ends
function hitRock (player, rocks)
{

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    lose_text.setText('You lose');

    gameOver = true;
}

// This function runs when a player collides with the diamond at the top left corner - He/she wins
function collectDiamond(player, diamond)
{
    diamond.disableBody(true, true);

    this.physics.pause();

    player.setTint(0x8EF488);

    player.anims.play('turn');

    win_text.setText('You win');

    gameOver = true;
}

// This function runs when a rock reaches the bottom left corner - Its disabled
function hitInvisible (rocks, invisible)
{

    rocks.disableBody(true, true);

}







