class Trick extends Phaser.Scene {
    constructor() {
        super("trickScene");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);
        this.floor = this.add.sprite(0, 0, 'templateFloor').setOrigin(0);

        this.top = this.add.image(0, 25, 'scorebar').setScale(2);
        this.top.visible = false;
        
        this.bottom = this.add.image(0, 775, 'scorebar').setScale(2);
        this.bottom.visible = false;

        this.anims.create({
            key: 'jumpAnim',
            frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 7, first: 0}),
            frameRate: 8
        });
        this.floor.anims.play('jumpAnim');
        this.floor.once('animationcomplete', () => {
            this.floor.destroy();
            this.add.image(0, 0, 'midairImg').setOrigin(0);
            this.top.visible = true;
            this.bottom.visible = true;
        });

        this.trickup = this.add.image(100, 100, 'trickup');
        this.trickdown = this.add.image(100, 100, 'trickdown');
        this.trickleft = this.add.image(100, 100, 'trickleft');
        this.trickright = this.add.image(100, 100, 'trickright');
        this.trickup.visible = false;
        this.trickdown.visible = false;
        this.trickleft.visible = false;
        this.trickright.visible = false;
        this.uparrow = this.add.image(150, 150, 'uparrow');
        this.downarrow = this.add.image(150, 150, 'downarrow');
        this.leftarrow = this.add.image(150, 150, 'leftarrow');
        this.rightarrow = this.add.image(150, 150, 'rightarrow');
        this.uparrow.visible = false;
        this.downarrow.visible = false;
        this.leftarrow.visible = false;
        this.rightarrow.visible = false;
        this.score = 0;
        this.wrongPress = 0;
        
        this.timer = this.time.addEvent({
            delay: 4000,
            callback: this.generateRandomNumber,
            callbackScope: this,
            loop: true
        });

        
        this.generateRandomNumber();
    }

    update() {
        // Update logic if needed
    }

    generateRandomNumber() {
        // Generate a random number between 1 and 4
        let randomNumber = Phaser.Math.Between(1, 4);

        
        if (randomNumber === 1) {
            //show up arrow key sprite
            this.uparrow.visible = true;
            if (cursors.up.isDown) {
                //add to score
                this.score+=500;
                //change bike direction
                this.trickup.visible = true;
                console.log("UP arrow key is pressed");
            }
            else{
                this.score-=500;
                this.wrongPress++;
                //minus score
                //increment amount of incorrect presses
                
            }
        } else if (randomNumber === 2) {

            this.downarrow.visible = true;
            if (cursors.down.isDown) {
                this.score+=500;
                this.trickdown.visible = true;
                console.log("DOWN arrow key is pressed");
            }
            else{
                this.score-=500;
                this.wrongPress++;
                //minus score
                //increment amount of incorrect presses
                
            }
        } else if (randomNumber === 3) {

            this.leftarrow.visible = true;
            if (cursors.left.isDown) {
                this.score+=500;
                this.trickleft.visible = true;
                console.log("LEFT arrow key is pressed");
            }
            else{
                this.score-=500;
                this.wrongPress++;
                //minus score
                //increment amount of incorrect presses
                
            }
        } else if (randomNumber === 4) {
            this.rightarrow.visible = true;
            if (cursors.right.isDown) {
                this.score+=500;
                this.trickright.visible = true;
                console.log("RIGHT arrow key is pressed");
            }
            else{
                this.score-=500;
                this.wrongPress++;
                //minus score
                //increment amount of incorrect presses
                
            }
        }
        //if 3 incorrect presses have been reached, fail
        if(this.wrongPress >= 3)
        {
            console.log("fail");
        }
        this.uparrow.visible = false;
        this.downarrow.visible = false;
        this.leftarrow.visible = false;
        this.rightarrow.visible = false;
    }

}