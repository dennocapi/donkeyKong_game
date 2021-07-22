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
let rocks;

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
    platforms = this.physics.add.staticGroup();

    platform = platforms.create(0, 590, 'platform').setScale(4,0.5).refreshBody();
    // platform.angle = -1;

    platform = platforms.create(0, 500, 'platform').setScale(3.5,0.5).refreshBody();
    // platform.angle = 2;

    platform = platforms.create(500, 400, 'platform').setScale(2,0.5).refreshBody();
    // platform.angle = -2;

    platform = platforms.create(300, 300, 'platform').setScale(2,0.5).refreshBody();
    // platform.angle = 2;

    platform = platforms.create(500, 200, 'platform').setScale(2,0.5).refreshBody();
    // platform.angle = -2;

    platform = platforms.create(300, 100, 'platform').setScale(2,0.5).refreshBody();
    // platform.angle = 2;


    // create rock sprite

        // setInterval(()=>{

        // rock = this.physics.add.sprite(50, 50,'rock').setScale(0.15, 0.15);
        // rock.setCollideWorldBounds(true);
        // rock.body.setGravityY(100);
        // rock.setBounce( 0.5);
        // rock.body.setVelocity(100);

        //  }, 3000);

        rock = this.physics.add.sprite(50, 50,'rock').setScale(0.15, 0.15);
        rock.setCollideWorldBounds(true);
        rock.body.setGravityY(100);
        rock.setBounce( 0.5);
        rock.body.setVelocity(100);
        rock.body.Depth = 1;
        random_seconds = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;

        function myfunction(){

        rock = this.physics.add.sprite(50, 50,'rock').setScale(0.15, 0.15);
        rock.setCollideWorldBounds(true);
        rock.body.setGravityY(100);
        rock.setBounce( 0.5);
        rock.body.setVelocity(100);
        random_seconds = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
        }

        add_rocks = this.time.addEvent({ delay: random_seconds, callback: myfunction, callbackScope: this, loop: true });


    // Adding the ladders
    ladders = this.physics.add.staticGroup();
    // ladders.enableBody = true;

    // 1st column
    ladders.create(650, 550, 'ladder').setScale(0.25,0.34).refreshBody();

    // 2nd column
    ladders.create(150, 450, 'ladder').setScale(0.25,0.34);

    ladders.create(450, 454, 'ladder').setScale(0.25,0.4);

    // 3rd column
    ladders.create(650, 350, 'ladder').setScale(0.25,0.34);

    ladders.create(400, 353, 'ladder').setScale(0.25,0.38);

    //4th column
    ladders.create(150, 250, 'ladder').setScale(0.25,0.34);

    ladders.create(350, 253, 'ladder').setScale(0.25,0.38);

    // 5th column
    ladders.create(650, 155, 'ladder').setScale(0.25,0.34);


    // create the player sprite
    player = this.physics.add.sprite(80,550,'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // creating frames tho handle the player in a certain direction
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
    this.physics.add.collider(player, platforms,null ,checkUp.bind(this));
    this.physics.add.collider(rock, platforms);
    this.physics.add.collider(player, rock, hitRock, null, this);
    this.physics.add.overlap(rock, invisible,hitInvisible, null, this);
    this.physics.add.overlap(player, diamond, collectDiamond, null, this);
    this.physics.add.overlap(player, ladders);

    function checkLadder()
    {
        this.onLadder=false;
        ladders.children.iterate(function(child)
        {
            if (!child.body.touching.none)
            {
                this.onLadder=true;
            }
        }.bind(this));

    }


    function checkUp(){
        if (this.onLadder==true && player.velocity.y < 0)
        {
            return false
        }
    }

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
        // player.body.touching.down
    {
        player.setVelocityY(-200);
        player.canDoubleJump = false;
    }


    if (cursors.up.isDown)
    {
        checkLadder();
        if (this.onLadder==true)
        {
            player.setVelocityY(-50);
        }
    }

    // Setting up the direction of the rock
    if (rock.body.velocity.x == 0) {
     rock.setVelocityX(500)

    }
    else if (rock.body.velocity.x < 0) {
     rock.setVelocityX(-500)

    }
    else if (rock.body.velocity.x > 0) {
        rock.setVelocityX(500)

    }

}

// This function runs when a player collides with a rock - the game ends
function hitRock (player, rock)
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
function hitInvisible (rock, invisible)
{

    rock.disableBody(true, true);

}




