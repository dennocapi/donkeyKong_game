class GameScene extends Phaser.Scene {

    constructor() {
        super({key : 'gameScene'});
    }

    init () {
        // game variables
        this.score = 0;
        this.lives = 3;
        this.speed= 1.5;
        this.score = 0;
        this.score_text;
        this.lives_text;
        this.text;
        this.restartText;
        this.quitText;

    };

    preload() {
        // preload some images that we can use in our game
        this.load.image('background', 'assets/bg3.jpg');
        this.load.image('platform','assets/platform.png');
        this.load.image('rock','assets/fireBall.jpg');
        this.load.image('ladder','assets/ladder.png');
        this.load.image('diamond','assets/diamond.png');
        this.load.image('invisible','assets/invisible.PNG');
        this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    };

    create() {
        let game_width = this.sys.game.config.width;
        let game_height = this.sys.game.config.height;

        this.invisible = this.physics.add.staticSprite(0, 590,'invisible').setScale(1,1);
        this.bg = this.add.sprite(game_width/2,game_height/2,'background');
        // Adds the diamond which a player picks and wins the game
        this.diamond = this.physics.add.staticSprite(100, 50,'diamond').setScale(0.7,0.7);


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
        { x:44, y:0.5 },
        { x:3.9, y:0.5 },
        { x:2.4, y:0.5 },
        { x:2.4, y:0.5 },
        { x:2.4, y:0.5 },
        { x:2.4, y:0.5 }
        ];
        // Adding a platform group

        this.platformGroup = this.physics.add.staticGroup();

        // Looping through the platform group and adding the child elements

        for (var i = 0; i < platformPositions.length; i++) {
            var platform = this.platformGroup.create(platformPositions[i].x, platformPositions[i].y, 'platform').setScale(platformScale[i].x,platformScale[i].y).refreshBody();
        }

        // Setting up rock positions

        var rockPositions = [
        { x:500, y:80 },
        { x:200, y:80 },
        { x:300, y:80 },
        { x:600, y:180 },
        { x:750, y:180 },
        { x:100, y:280 },
        { x:300, y:280 },
        { x:400, y:380 },
        { x:550, y:380 },
        { x:300, y:480 }
        ];

        // Adding a rock group

        this.rockGroup = this.physics.add.group();

        // Looping through the rock group and adding the child elements

        for (var i = 0; i < rockPositions.length; i++) {
            var rock = this.rockGroup.create(rockPositions[i].x, rockPositions[i].y, 'rock').setScale(0.02, 0.02);
            rock.setCollideWorldBounds(true);
            rock.setBounce( 0.5);
            rock.Depth = 1;
        }

        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                var rock = this.rockGroup.create(50, 80, 'rock').setScale(0.02, 0.02);
                rock.setCollideWorldBounds(true);
                rock.setBounce( 0.5);
                rock.Depth = 1;
            },
            loop: true
        })

        // Initializing ladder positions
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
        this.ladderGroup = this.physics.add.staticGroup();

        // Looping through the ladder group and adding the child elements

        for (var i = 0; i < ladderPositions.length; i++) {
        var ladder = this.ladderGroup.create(ladderPositions[i].x, ladderPositions[i].y, 'ladder').setScale(0.15, 0.15).setScale(0.25,0.34).refreshBody();
        }

        // create the player sprite
        this.player = this.physics.add.sprite(80,550,'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

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


        // add score text & game text to screen
        this.scoreText = this.add.text(100, 16, 'score: ', { fontSize: '32px', fill: '#ffffff' });
        this.liveText = this.add.text(16, this.sys.game.config.height-50, 'Lives: ' + this.lives, {fontSize: '32px', fill: '#ffffff'});
        // Initializing keyboard inputs - to control the player
        this.cursors = this.input.keyboard.createCursorKeys();
        // Adding text when one wins or loses the game
        this.text = this.add.text(250,250, '' , {fontSize: '50px', fill: '#FFFFFF'});

        this.restartText = this.add.text(100,300, '',{fontSize: '40px' });

        this.quitText = this.add.text(100,350, '',{fontSize: '40px'});

        this.restartText.setInteractive({ useHandCursor: true });
        this.restartText.on('pointerdown', () => this.clickButtonRestart());

        this.quitText.setInteractive({ useHandCursor: true });
        this.quitText.on('pointerdown', () => this.clickButtonQuit());

    };
    clickButtonRestart() {
    this.scene.restart();
    }

    clickButtonQuit() {
        // this.scene.stop('gameScene') ;
        this.scene.start('titleScene');
    }

    update() {
    // To ignore collision if the player is on ladder
        const checkLadder = () =>
        {
            this.onLadder = false;
            this.ladderGroup.children.iterate(function(child)
            {
                if (!child.body.touching.none)
                {
                    this.onLadder=true;
                }
            }.bind(this));

        }
        const checkUp = () =>
        {
            if (this.onLadder == true && this.player.body.velocity.y<0)
            {
                return false;
            }
            return true
        }
        const hitInvisible = (invisible, rock) =>
        {
            rock.disableBody(true, true);
            this.score += 100;
            this.scoreText.setText('Score: ' + this.score);

        }
            // This function runs when a player collides with the diamond at the top left corner - He/she wins
        const collectDiamond = (player, diamond) => {
            this.diamond.disableBody(true, true);

            this.physics.pause();

            this.player.setTint(0x8EF488);

            this.player.anims.play('left', true);

            this.text.setText('You win');

            this.restartText.setText('Restart');

            this.quitText.setText('Quit');

            // this.scene.pause();

            this.gameOver = true;
        }
        const clickButtonRestart = () => {
            this.scene.restart();
        }

        const clickButtonQuit = () => {
            this.scene.stop('gameScene') ;
            this.scene.start('titleScene');
        }

        // Adding colliders
        this.physics.add.collider(this.player, this.platformGroup, null, checkUp.bind(this));
        this.physics.add.collider(this.rockGroup, this.platformGroup);
        this.physics.add.collider(this.player, this.rockGroup);
        this.physics.add.overlap(this.rockGroup);
        this.physics.add.overlap(this.player, this.diamond, collectDiamond, null, this);
        this.physics.add.overlap(this.rockGroup, this.invisible, null,hitInvisible);
        this.physics.add.overlap(this.player, this.ladderGroup);
        this.physics.add.overlap(this.player, this.rockGroup);

        // Setting up the velocity and direction of each rock
        this.rockGroup.getChildren().forEach((rock) => {
            if (rock.body.velocity.x >= 0) {
                rock.setVelocityX(100);
                rock.angle += 1;

            }
            else if (rock.body.velocity.x = -1) {
                rock.setVelocityX(-100)
                rock.angle += -1;

            }
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), rock.getBounds())) {
                this.lives--;
                this.liveText.setText("Lives: " + this.lives);
                this.end();
            }

        }, this);

        // Setting up player direction if the left key if pressed
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        // Setting up player direction if the right key if pressed
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        // Setting up player direction if the right key if pressed
        else if (this.cursors.down.isDown)
        {
            checkLadder();

            if (this.onLadder==true)
            {
                this.player.setVelocityY(160);
            }

            this.player.setVelocityY(160);

            this.player.anims.play('turn', true);
        }

        // Setting up player direction if no key is pressed
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        // Enabling a player to jump when touching the floor of a platform
        if (this.cursors.up.isDown && Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.player.body.onFloor(true) && this.player.body.blocked.down)
        {
            checkLadder();
            // Direction of the player if on ladder
            if (this.onLadder==true)
            {
                // player.setAllowGravity(false);
                this.player.setVelocityY(-200);
            }
            // Player properties if not on ladder
            else{
                this.player.setVelocityY(-120);
                this.player.canDoubleJump = false;
            }
        }

        // Pause a game
        if(this.cursors.space.isDown)
        {
            this.scene.launch('pauseScene')
            this.scene.pause();
        }
    };


    end() {
        if(this.lives <= 0) {
            this.text.setText('Game over');
            this.scene.pause();
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.gameOver = true;
            // this.scene.restart();
        } else {
            this.create();
        }
    };

}

export default GameScene;
