class Trick extends Phaser.Scene {
    constructor() {
        super("trickScene");
    }

    init(data) {
        this.level = data.level;
        this.numLives = data.numLives;
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);
        this.floor = this.add.sprite(0, 0, 'templateFloor').setOrigin(0);

        this.top = this.add.image(0, 25, 'scorebar').setScale(2);
        this.top.visible = false;
        
        this.bottom = this.add.image(0, 775, 'scorebar').setScale(2);
        this.bottom.visible = false;

        this.trickup = this.add.image(207, 113, 'trickup').setOrigin(0);
        this.trickup.visible = false;

        this.uparrow = this.add.image(50, 150, 'uparrow');
        this.downarrow = this.add.image(120, 150, 'downarrow');
        this.leftarrow = this.add.image(350, 150, 'leftarrow');
        this.rightarrow = this.add.image(420, 150, 'rightarrow');

        this.uparrow.visible = false;
        this.downarrow.visible = false;
        this.rightarrow.visible = false;
        this.leftarrow.visible = false;
        this.ready = false;

        this.anims.create({
            key: 'jumpAnim',
            frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 7, first: 0}),
            frameRate: 8
        });

        this.bar = this.add.graphics();
        this.bar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
        this.bar.visible = false;

        this.floor.anims.play('jumpAnim');
        this.floor.once('animationcomplete', () => {
            this.floor.destroy();
            //this.add.image(0, 0, 'midairImg').setOrigin(0);
            //this.add.image(0, 0, 'skyImg').setOrigin(0);
            this.trickup.visible = true;
            this.uparrow.visible = true;
            this.downarrow.visible = true;
            this.rightarrow.visible = true;
            this.leftarrow.visible = true;
            this.top.visible = true;
            this.bottom.visible = true;
            this.ready = true;
        });

        
        this.trickdown = this.add.image(207, 123, 'trickdown').setOrigin(0);
        this.trickleft = this.add.image(207, 113, 'trickleft').setOrigin(0);
        this.trickright = this.add.image(227, 113, 'trickright').setOrigin(0);
        this.trickdown.visible = false;
        this.trickleft.visible = false;
        this.trickright.visible = false;

        this.score = 0;

        this.timerDelta = 0;
        this.timeLeft = 5;
        
        this.timerText = this.add.bitmapText(centerX, centerY / 0.6, 'cleanFont', 'Time Remaining: 4', 25).setOrigin(0.5).setTint(0xfffffff);
        this.timerText.setOrigin(0.5);
        this.timerText.visible = false;
        this.timer = this.time.delayedCall(this.timeLeft * 1000, this.timerEnded, [], this);

        this.helpText = this.add.bitmapText(centerX, centerY / 0.55, 'cleanFont', 'Make sure to Land correctly!', 25).setOrigin(0.5).setTint(0xfffffff);
        this.helpText.visible = false;

        this.waitForInput = true;
        this.lastPressed = "";
        this.scoreText = this.add.bitmapText(centerX, centerY / 5, 'cleanFont', 'Score: ' + this.score, 35).setOrigin(0.5).setTint(0xfffffff);
        this.scoreText.visible = false;
        
    }

    update(time, delta) {
        // Update timer every second
        this.timerDelta += delta;
        while (this.timerDelta > 100) {
            this.timeLeft = Phaser.Math.RoundTo(this.timeLeft - 0.1, -1);
            this.timerDelta -= 100;
            this.timerText.text = 'Time Remaining: ' + this.timeLeft;
        }
        
        if(this.ready){
            this.scoreText.visible = true;
            this.timerText.visible = true;
            this.helpText.visible = true;

            if (cursors.up.isDown && this.lastPressed != "up") {
                this.score+=100;
                //change bike direction
                this.trickdown.visible = false;
                this.trickleft.visible = false;
                this.trickright.visible = false;
                this.trickup.visible = true;
                this.lastPressed = "up";
            }
            if (cursors.down.isDown && this.lastPressed != "down") {
                this.score+=100;
                //change bike direction
                this.trickup.visible = false;
                this.trickleft.visible = false;
                this.trickright.visible = false;
                this.trickdown.visible = true;
                this.lastPressed = "down";
            }
            if (cursors.left.isDown && this.lastPressed != "left") {
                this.score+=100;
                //change bike direction
                this.trickdown.visible = false;
                this.trickup.visible = false;
                this.trickright.visible = false;
                this.trickleft.visible = true;
                this.lastPressed = "left";
            }
            if (cursors.right.isDown && this.lastPressed != "right") {
                this.score+=100;
                //change bike direction
                this.trickdown.visible = false;
                this.trickleft.visible = false;
                this.trickup.visible = false;
                this.trickright.visible = true;
                this.lastPressed = "right";
            }
            this.scoreText.setText('Score: ' + this.score);
        }
        
    }

    // Function called when the timer ends
    timerEnded() {
        if (this.timer.getProgress() === 1) {
            console.log(this.lastPressed);
            if(this.lastPressed != "up")
            {
                if (this.numLives == 0) {
                    this.scene.start('loseScene');
                }
                else {
                    this.numLives -= 1;
                    
                    if (this.level == 1) {
                        this.scene.start('playScene', {
                            level: this.level,
                            bikePosX: levelWidth / 31,
                            bikePosY: levelHeight / 1.75,
                            numLives: this.numLives,
                            finishPosX: levelWidth / 1.05,
                            finishPosY: levelHeight / 1.77,
                            rampPosX: levelWidth / 1.4,
                            rampPosY: levelHeight / 1.83,
                            floorPNG: 'lvl1Floor', 
                            floorJSON: 'lvl1Points' 
                        });
                    }
                    

                }
                
            }
            else{
                if (this.level == 1) {
                    this.scene.start('playScene', {
                        level: this.level,
                        bikePosX: levelWidth / 1.15,
                        bikePosY: levelHeight / 1.75,
                        numLives: this.numLives,
                        finishPosX: levelWidth / 1.05,
                        finishPosY: levelHeight / 1.77,
                        rampPosX: levelWidth / 1.4,
                        rampPosY: levelHeight / 1.83,
                        floorPNG: 'lvl1Floor', 
                        floorJSON: 'lvl1Points'
                    });
                }
            }
            
            
        }
    }

    startGameLogic() {
        // Add your logic to execute after the up arrow key is pressed
        console.log('Starting game logic!');
        this.waitForInput = false; // Set to false to stop waiting for input
    }
}