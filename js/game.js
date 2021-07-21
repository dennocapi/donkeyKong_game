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
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

}

function create(){
    let game_width = this.sys.game.config.width;
    let game_height = this.sys.game.config.height;

    this.bg = this.add.sprite(game_width/2,game_height/2,'background');

    // platforms = this.physics.add.sprite(0, 600, 'platform');
    // platforms.scaleX = 3.5;
    // platforms.scaleY = 0.5;
    // platforms.angle = 2;
    // platforms.setCollideWorldBounds = true;

    platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, 'platform').setScale(2,0.5).refreshBody();
    platform = platforms.create(0, 600, 'platform').setScale(4,0.5).refreshBody();
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

    ladders = this.physics.add.staticGroup();
    // ladders.enableBody = true;

    // 1st column
    ladders.create(650, 555, 'ladder').setScale(0.25,0.27).refreshBody();

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
    player = this.physics.add.sprite(80,400,'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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

    // create rock sprite
    rock = this.physics.add.sprite(50, 50,'rock').setScale(0.15, 0.15);
    rock.setCollideWorldBounds(true);
    rock.body.setGravityY(100);
    rock.body.setVelocity(80, 200)
    rock.setBounce(0.5, 0.5);

    score = 0;
    scoreText = this.add.text(16,16,'Score: ' + score, {fontSize: '32px', fill: '#000'});
    status_text = this.add.text(300,300, '' , {fontSize: '50px', fill: '#FF0000'});
    cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    // console.log('update function running');
    // this.physics.add.collider(rock, platforms);
    // this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, platforms,null ,checkUp.bind(this));
    // this.physics.add.overlap(player, rock,null ,overlap_rock, null, this);
    this.physics.add.collider(rock, platforms);
    this.physics.add.collider(player, rock, hitRock, null, this);
    this.physics.add.overlap(player, ladders);
    // rock.angle += 0.5;
    // this.player.velocity.x = 0;

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
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down && player.body.onFloor())
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

}

//     function overlap_rock (player, rock)
// {
//     rock.disableBody(true, true);
//     score += 10;
//     scoreText.setText('Score: ' + score);
// }

function hitRock (player, rock)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    status_text.setText('You lose');

    gameOver = true;
}

    // setTimeout(rock_init()
    // {

    // }, 2000 );
    // // rock_init();
