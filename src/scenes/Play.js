class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);
        
        this.bike = new Bike(this, 25, 25, 'bikeImg').setOrigin(0);
        this.bike.scale = 0.075;
        this.bike.setGravityY(500);
        
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        
        
    }

    update() {
        
    }

    
}