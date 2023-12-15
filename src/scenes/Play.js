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

        this.ding = this.sound.add('ding');
        this.ding.setVolume(0.1);

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);
        this.scorebar = this.add.image(0, 0, 'scorebar').setScale(2);
        this.scorebar.setScrollFactor(0);
    
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

        this.wheelPhysics = this.cache.json.get('wheelPoints');
        this.wheel = this.matter.add.sprite(this.bikePosX + 15, this.bikePosY + 10, 'wheelImg', null, { shape: this.wheelPhysics.wheel });
        this.wheel.scale = 0.025;      
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

        this.bikePhysics = this.cache.json.get('bikePoints');
        this.bike = this.matter.add.sprite(this.bikePosX, this.bikePosY, 'bikeImg', null, { shape: this.bikePhysics.bikeFrame });
        this.bike.scale = 0.7;
        this.bike.setCollisionGroup(1)
        this.bike.setCollidesWith(0)
        
        this.matter.add.constraint(this.wheel, this.wheel2);
        this.matter.add.constraint(this.bike, this.wheel);
        this.matter.add.constraint(this.bike, this.wheel2);
        
        this.bikeSpeed = 3;
        this.wheelInAir = false;
        this.gameOver = false;
        this.finishedLevel = false;
        this.performingTrick = false;

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

        if (this.level == 1) {
            this.rightarrow = this.add.image(62, 575, 'rightarrow');
        }
    }

    update() {
        
        if(this.bike.rotation >= 0.15){
            this.bike.rotation -= 0.02;
        }
        else if(this.bike.rotation <= -0.15){
            this.bike.rotation += 0.02;
        }
        this.bike.resetFlip();
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
                // go to lose scene
                this.scene.start('loseScene');
            }

        }
        
        if(this.matter.overlap(this.bike, this.finish) || this.matter.overlap(this.wheel, this.finish) || this.matter.overlap(this.wheel2, this.finish)){
            this.ding.play();
            this.scene.start('selectScene');
            this.finishedLevel = true;
        }

        if(this.matter.overlap(this.bike, this.ramp) || this.matter.overlap(this.wheel, this.ramp) || this.matter.overlap(this.wheel2, this.ramp)){
            this.performingTrick = true;
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

            if (!this.sfxMotor.isPlaying) {
                this.sfxMotor.play();
            }
        }
        
        if(this.wheelInAir && cursors.right.isDown)
        {
            this.bike.rotation += 0.01;
        }
    }

    
}