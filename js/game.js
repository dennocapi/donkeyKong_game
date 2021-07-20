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
        create: create
    }
};
let rocks;

game = new Phaser.Game(config);

function preload(){
    // Load images
    this.load.image('background','assets/sky.png');
    this.load.image('player','assets/woof.png', 32, 32);
    this.load.image('platform','assets/platform.png');
    this.load.image('rock','assets/rock.png');
    this.load.image('ladder','assets/ladder.png');

}

function create(){
   console.log(Phaser.Physics.Arcade.Sprite)

    let game_width = this.sys.game.config.width;
    let game_height = this.sys.game.config.height;

    this.bg = this.add.sprite(game_width/2,game_height/2,'background');


    // create the player sprite
    player = this.physics.add.sprite(80,580,'player');
    console.log(player)
    // game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 800;
    player.body.collideWorldBounds = true;

    // player.animations.add('left',[0, 1], 10, true);
    // player.animations.add('right',[2, 3], 10, true);

    platforms = this.add.group();
    platforms.enableBody = true;

    let ground = platforms.create(0, 600, 'platform');
    ground.scaleX = 4;
    ground.scaleY = 0.5;
    ground.angle = -1;

    let platform = platforms.create(0, 500, 'platform');
    platform.scaleX = 3.5;
    platform.scaleY = 0.5;
    platform.angle = 2;

    platform = platforms.create(500, 400, 'platform');
    platform.scaleX = 2;
    platform.scaleY = 0.5;
    platform.angle = -2;

    platform = platforms.create(300, 300, 'platform');
    platform.scaleX = 2;
    platform.scaleY = 0.5;
    platform.angle = 2;

    platform = platforms.create(500, 200, 'platform');
    platform.scaleX = 2;
    platform.scaleY = 0.5;
    platform.angle = -2;

    platform = platforms.create(300, 100, 'platform');
    platform.scaleX = 2;
    platform.scaleY = 0.5;
    platform.angle = 2;

    let ladders = this.add.group();
    ladders.enableBody = true;

    // 1st column
    ladder = ladders.create(650, 555, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.27;

    // 2nd column
    ladder = ladders.create(150, 450, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.34;

    ladder = ladders.create(450, 454, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.4;

    // 3rd column
    ladder = ladders.create(650, 350, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.34;

    ladder = ladders.create(400, 353, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.38;

    //4th column
    ladder = ladders.create(150, 250, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.34;

    ladder = ladders.create(350, 253, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.38;

    // 5th column
    ladder = ladders.create(650, 155, 'ladder');
    ladder.scaleX = 0.25;
    ladder.scaleY = 0.34;

    let rocks = this.add.group();
    rocks.enableBody = true;
    this.physics.world.enable(rocks);
    console.log(rocks)

    for (var i = 0; i < 12 ; i++) {
        let rock = rocks.create(50, 50,'rock');
        rock.scaleX = 0.25;
        rock.scaleY = 0.25;
        console.log(rock.body);
        rock.setVelocity(100, 200);
        // rock.body.gravity.y = 1000;
    }

    // create rock sprite
    // this.rock = this.physics.add.sprite(50,50,'rock');
    // this.rock.setScale(0.2,0.2);
    // this.rock.setCollideWorldBounds(true);
    // this.rock.body.setGravityY(300);
    // this.physics.add.collider(this.rock, this.platform);

    scoreText = this.add.text(16,16, '', {fontSize: '32px', fill: '#000'});
    cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    this.physics.arcade.collide(this.rock, platforms);
    this.physics.arcade.collide(this.player, platforms);
    this.physics.arcade.overlap(this.player, rocks, hitRock, null, this);

    this.player.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play(right);
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -420
    }

    if (score === 120)
    {
        alert('You win')
        score = 0
    }
}

function hitRock(player, rock) {
    rock.kill();

    score += 10;
    scoreText = 'Score ' + score;
}
