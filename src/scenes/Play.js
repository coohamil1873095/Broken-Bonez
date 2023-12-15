class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init(data) {
        console.log(data);
        
        this.level = data.level;
        
        this.bikePosX = data.bikePosX;
        this.bikePosY = data.bikePosY;
        this.numLives = data.numLives;
    
        this.finishPosX = data.finishPosX;
        this.finishPosY = data.finishPosY;
    
        this.rampPosX = data.rampPosX;
        this.rampPosY = data.rampPosY;
    
        this.floorPNG = data.floorPNG;
        this.floorJSON = data.floorJSON;
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        this.sfxMotor = this.sound.add('sfx_motor');
        this.sfxMotor.setVolume(0.07);

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);
        this.scorebar = this.add.image(0, 0, 'scorebar').setScale(2);
        this.scorebar.setScrollFactor(0);
    
        //this.floor = this.add.sprite(0, 0, 'lvl1Floor').setOrigin(0);
        //this.floor.setImmovable();
        

        this.floorPhysics = this.cache.json.get(this.floorJSON);   
        this.floor = this.matter.add.sprite(0, 0, this.floorPNG, null, { shape: this.floorPhysics.floorPlan }); 
        this.floor.setPosition(900 + this.floor.centerOfMass.x, 800 + this.floor.centerOfMass.y)
        this.floor.setToSleep();

        this.floor.setCollisionGroup(1)
        this.floor.setCollidesWith(0)


        this.finish = this.matter.add.image(this.finishPosX, this.finishPosY, 'finishImg');
        this.finish.setToSleep();
        this.finish.setCollisionGroup(1)
        this.finish.setCollidesWith(1)
        
        this.ramp = this.matter.add.image(this.rampPosX, this.rampPosY, 'rampImg');
        this.ramp.setToSleep();
        this.ramp.setCollisionGroup(1)
        this.ramp.setCollidesWith(1)

        

        // this.floor.width / 12, this.floor.height / 1.5
        //this.bike = new Bike(this, 0, 0, 'bikeImg');
        //this.bike.scale = 0.025;

        //this.bike = this.add.sprite(this.floor.width / 12, this.floor.height / 1.5, 'bikeImg');
        //this.bike.scale = 0.025;
        
        // this.bike = this.matter.add.sprite(this.floor.width / 12, this.floor.height / 1.5, 'bikeImg');
        // this.bike.scale = 0.025;
        
        
        
        this.wheelPhysics = this.cache.json.get('wheelPoints');
        this.wheel = this.matter.add.sprite(this.bikePosX + 15, this.bikePosY + 10, 'wheelImg', null, { shape: this.wheelPhysics.wheel });
        this.wheel.scale = 0.025;      // 205 208 175
        this.wheel.setFriction(0.9);
        this.wheel.setDensity(0.001);
        this.wheel.setFrictionAir(0.001);

        this.wheel.setCollisionGroup(1)
        this.wheel.setCollidesWith(0)
        

        this.wheel2 = this.matter.add.sprite(this.bikePosX - 8, this.bikePosY + 10, 'wheelImg', null, { shape: this.wheelPhysics.wheel });
        this.wheel2.scale = 0.025;
        this.wheel2.setFriction(0.9);
        this.wheel2.setDensity(0.001);
        this.wheel2.setFrictionAir(0.001);

        this.wheel2.setCollisionGroup(1)
        this.wheel2.setCollidesWith(0)

        // let xDiff = this.wheel2.x + ((this.wheel.x - this.wheel2.x) / 2); 
        // this.center = this.matter.add.polygon(xDiff, this.wheel.y, 4, 2);
        // this.left = this.matter.add.polygon(this.wheel2.x, this.wheel2.y-10, 4, 2);
        // this.right = this.matter.add.polygon(this.wheel.x-5, this.wheel.y-10, 4, 2);
        // this.top = this.matter.add.polygon(xDiff, this.wheel.y-20, 4, 2);
        

        this.bikePhysics = this.cache.json.get('bikePoints');
        // this.floor.width / 35, this.floor.height / 1.8
        this.bike = this.matter.add.sprite(this.bikePosX, this.bikePosY, 'bikeImg', null, { shape: this.bikePhysics.bikeFrame });
        this.bike.scale = 0.7;
        this.bike.setCollisionGroup(1)
        this.bike.setCollidesWith(0)
        

        
        //this.bike.addChild(this.wheel);
        //this.bike.addChild(this.wheel2);
        //const container = this.add.container(100, -50, [ this.bike, this.wheel, this.wheel2 ]);
        //const physicsImage = this.matter.add.gameObject(this.bike);

        //this.bike.setIgnoreGravity();
        // this.bike.setMass(0.1);
        //this.bike.setToSleep();
        //this.bike.setFixedRotation();
        
        this.matter.add.constraint(this.wheel, this.wheel2);
        this.matter.add.constraint(this.bike, this.wheel);
        this.matter.add.constraint(this.bike, this.wheel2);
        // this.matter.add.constraint(this.top, this.left);
        // this.matter.add.constraint(this.top, this.right);
        //this.matter.add.constraint(this.wheel, this.center);
        //this.matter.add.constraint(this.wheel, this.right);
        //this.matter.add.constraint(this.wheel2, this.center);
        //this.matter.add.constraint(this.wheel2, this.left);
        // this.matter.add.constraint(this.bike, this.center);
        // this.matter.add.constraint(this.bike, this.left);
        // this.matter.add.constraint(this.bike, this.right);
        // this.matter.add.constraint(this.bike, this.top);

        //this.car = this.matter.add.car(this.floor.width / 40, this.floor.height / 2, 15, 15, 5);
        
        this.bikeSpeed = 3;
        this.wheelInAir = false;
        this.gameOver = false;
        this.finishedLevel = false;
        this.performingTrick = false;

        //this.matter.world.setGravity(0, 50);
        
        //this.bike.setGravityY(50);
        //this.physics.world.setBoundsCollision(true, true, true, true);

        this.cameras.main.setBounds(0, 0, this.floor.width, this.floor.height);
        this.cameras.main.startFollow(this.bike, false, 0.5, 0.5);
        
        this.matter.world.setBounds(0, 0, this.floor.width, this.floor.height);

        this.lives1 = this.add.image(460 , 20, 'lives').setScale(0.04);
        this.lives2 = this.add.image(425 , 20, 'lives').setScale(0.04);
        this.lives3 = this.add.image(390 , 20, 'lives').setScale(0.04);
        this.lives1.setScrollFactor(0);
        this.lives2.setScrollFactor(0);
        this.lives3.setScrollFactor(0);

        if (this.numLives <= 2) {this.lives3.visible = false;}
        if (this.numLives == 1) {this.lives2.visible = false;}

        //this.scoreText = this.add.bitmapText(100, 100, 'cleanFont', 'Score: ' + this.score, 35).setOrigin(0.5).setTint(0xfffffff);
        this.text = this.add.text(200, 200, 50).setTint(0xfffffff);
        console.log(this.text);
        this.text.depth = 1;
        
        // this.physics.add.collider(this.bike, this.floor, () => {
        //     console.log("collision");
        // });

        //console.log(this.wheel.y);
    }

    update() {
        
        //console.log(this.bike);
        //console.log(this.bike.y);
        // if(this.bike.y + this.bike.height * this.bike.scale.y / 2 <= this.game.config.height) {
        //     this.bike.setGravityY(0);
        // }
        //console.log(this.bike.y);
        
        if(this.bike.rotation >= 0.15){
            //console.log(this.bike.rotation);
            this.bike.rotation -= 0.02;
        }
        else if(this.bike.rotation <= -0.15){
            //console.log(this.bike.rotation);
            this.bike.rotation += 0.02;
        }
        this.bike.resetFlip();
        //this.bike.setAngle(this.wheel.angle);
        this.wheel2.angle = this.wheel.angle;
        

        if (this.finishedLevel) {
            this.add.bitmapText(centerX, centerY, 'cleanFont', 'Level', 25).setOrigin(0.5).setTint(0xff0000);
            this.add.bitmapText(centerX, centerY, 'cleanFont', '(Insert Level Num)', 25).setOrigin(0.5).setTint(0xff0000);
            this.add.bitmapText(centerX, centerY, 'cleanFont', 'Cleared!', 25).setOrigin(0.5).setTint(0xff0000);
        }

        if(this.matter.overlap(this.bike, this.floor)){
            this.bike.setPosition(this.floor.width / 31, this.floor.height / 1.75)
            this.wheel.setPosition(this.floor.width / 25, this.floor.height / 1.72);
            this.wheel2.setPosition(this.floor.width / 35, this.floor.height / 1.72);
            this.bike.rotation = 0;
            this.bike.setAngularVelocity(0);
            this.numLives -= 1;
            if(this.numLives == 2)
            {
                this.lives3.visible = false;
            }
            else if(this.numLives == 1)
            {
                this.lives2.visible = false;
            }
            else if(this.numLives == 0)
            {
                this.lives1.visible = false;
                this.scene.start('loseScene');
                //go to lose screen
            }

        }
        if(this.matter.overlap(this.wheel, this.floor) || this.matter.overlap(this.wheel2, this.floor)){
            //this.bike.rotation = 0;
        }
        if(this.matter.overlap(this.bike, this.finish) || this.matter.overlap(this.wheel, this.finish) || this.matter.overlap(this.wheel2, this.finish)){
            this.scene.start('selectScene');
            this.finishedLevel = true;
            //go to next level
        }
        if(this.matter.overlap(this.bike, this.ramp) || this.matter.overlap(this.wheel, this.ramp) || this.matter.overlap(this.wheel2, this.ramp)){
            console.log("trick!");
            this.performingTrick = true;
            //go to trick scene
            this.scene.start('trickScene', {
                level: this.level,
                numLives: this.numLives
            });
        }
        // if not colliding with ground, set inAir to true
        // then check if in air before input
        if (!this.matter.overlap(this.wheel, this.floor)) {
            this.wheelInAir = true;
        } else {
            this.wheelInAir = false;
        }
    
        if (!this.wheelInAir && cursors.right.isDown) {
            this.wheel.setVelocityX(this.bikeSpeed);
            this.wheel2.setVelocityX(this.bikeSpeed);

            // this.wheel.setAngularVelocity(0.3);
            // this.wheel2.setAngularVelocity(0.3);
    
            if (!this.sfxMotor.isPlaying) {
                this.sfxMotor.play();
            }
        }
        if(!this.wheelInAir && cursors.left.isDown)
        {
            this.wheel2.setVelocityX(-1.3);
        }
        
        if(this.wheelInAir && cursors.right.isDown)
        {
            this.bike.rotation += 0.01;
        }

        //this.bike.angle = this.wheel.angle;
        // console.log(this.wheel.x);
        // console.log(this.floor.x);
    }

    
}