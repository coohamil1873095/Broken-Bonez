class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);
        
        this.bike = new Bike(this, 25, 25, 'bikeImg').setOrigin(0);
        this.bike.scale = 0.075;
        this.bike.setGravityY(0);
        this.physics.world.setBoundsCollision(true, true, true, true);

        cursors = this.input.keyboard.createCursorKeys();

        
        
    }

    update() {

        if(this.bike.y + this.bike.height * this.bike.scale.y / 2 <= this.game.config.height) {
            this.bike.setGravityY(0);
        }

        if(cursors.right.isDown)
        {
            this.bike.x += 5;
            //implement screen moving here instead of bike moving
        }
        if(cursors.left.isDown)
        {
            this.bike.x -= 5;
            //implement screen moving here instead of bike moving
        }

        
    }

    
}