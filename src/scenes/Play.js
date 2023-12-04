class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        this.sfxMotor = this.sound.add('sfx_motor');

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);

        //this.floor = this.add.sprite(0, 0, 'lvl1Floor').setOrigin(0);
        //this.floor.setImmovable();
        this.floorPhysics = this.cache.json.get('lvl1Points');
        this.floor = this.matter.add.sprite(0, 0, 'lvl1Floor', null, { shape: this.floorPhysics.oneFloor });
        this.floor.setPosition(900 + this.floor.centerOfMass.x, 800 + this.floor.centerOfMass.y)
        this.floor.setToSleep();

        this.floor.setCollisionGroup(1)
        this.floor.setCollidesWith(0)


        this.finish = this.matter.add.image(this.floor.width / 1.05, this.floor.height / 1.56, 'finishImg');
        this.finish.setToSleep();
        this.finish.setCollisionGroup(1)
        this.finish.setCollidesWith(1)
        
        

        // this.floor.width / 12, this.floor.height / 1.5
        //this.bike = new Bike(this, 0, 0, 'bikeImg');
        //this.bike.scale = 0.025;

        //this.bike = this.add.sprite(this.floor.width / 12, this.floor.height / 1.5, 'bikeImg');
        //this.bike.scale = 0.025;
        
        // this.bike = this.matter.add.sprite(this.floor.width / 12, this.floor.height / 1.5, 'bikeImg');
        // this.bike.scale = 0.025;
        
        
        
        this.wheelPhysics = this.cache.json.get('wheelPoints');
        this.wheel = this.matter.add.sprite(this.floor.width / 25, this.floor.height / 1.72, 'wheelImg', null, { shape: this.wheelPhysics.wheel });
        this.wheel.scale = 0.025;      // 205 208 175
        this.wheel.setFriction(0.9);
        this.wheel.setDensity(0.001);
        this.wheel.setFrictionAir(0.001);

        this.wheel.setCollisionGroup(1)
        this.wheel.setCollidesWith(0)
        

        this.wheel2 = this.matter.add.sprite(this.floor.width / 35, this.floor.height / 1.72, 'wheelImg', null, { shape: this.wheelPhysics.wheel });
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
        this.bike = this.matter.add.sprite(this.floor.width / 31, this.floor.height / 1.75, 'bikeImg', null, { shape: this.bikePhysics.bikeFrame });
        this.bike.scale = 0.7;
        this.bike.setCollisionGroup(1)
        this.bike.setCollidesWith(0)

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
        
        this.bikeSpeed = 4;
        this.wheelInAir = false;

        //this.matter.world.setGravity(0, 50);
        
        //this.bike.setGravityY(50);
        //this.physics.world.setBoundsCollision(true, true, true, true);

        this.cameras.main.setBounds(0, 0, this.floor.width, this.floor.height);
        this.cameras.main.startFollow(this.bike, false, 0.5, 0.5);
        
        this.matter.world.setBounds(0, 0, this.floor.width, this.floor.height);


        
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
        
        // if not colliding with ground, set inAir to true
        // then check if in air before input
        if (!this.matter.overlap(this.wheel, this.floor)) {
            this.wheelInAir = true;
            
        }
        else {
            this.wheelInAir = false;
        }
        

        if(!this.wheelInAir && cursors.right.isDown)
        {
            //this.wheel.setAngularVelocity(0.75);
            //this.wheel2.setAngularVelocity(0.75);
            this.wheel.setVelocityX(this.bikeSpeed);
            this.wheel2.setVelocityX(this.bikeSpeed);
            if (!this.sfxMotor.isPlaying) {
                this.sfxMotor.play();
            }
            
        }
        if(cursors.left.isDown)
        {
            this.wheel2.setVelocityX(-1);
        }

        //this.bike.angle = this.wheel.angle;
        // console.log(this.wheel.x);
        // console.log(this.floor.x);
    }

    
}