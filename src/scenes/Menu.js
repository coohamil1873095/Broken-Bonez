class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.titleScreen = this.add.image(0, 0,'titleScreen').setOrigin(0);
        this.titleScreen.scale = 0.5;

        this.add.bitmapText(centerX / 1.4, centerY / 0.7, 'cleanFont', 'Press Space to Start', 25).setOrigin(0.5).setTint(0xfff200);
        this.add.bitmapText(centerX / 2, centerY / 0.575, 'cleanFont', 'C for Credits', 25).setOrigin(0.5).setTint(0xfff200);

        this.bike = this.add.sprite(centerX + 55, centerY + 65, 'bikeFull').setOrigin(0);
        this.bike.scale = 0.10;
        this.bike.angle = -20;
        
        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            
            // CHANGE TO PLAY
            // this.scene.start('playScene', { 
            //     bikePosX: levelWidth / 31,
            //     bikePosY: levelHeight / 1.75,
            //     numLives: 3,
            //     finishPosX: levelWidth / 1.05,
            //     finishPosY: levelHeight / 1.77,
            //     rampPosX: levelWidth / 1.4,
            //     rampPosY: levelHeight / 1.83,
            //     floorPNG: 'lvl1Floor', 
            //     floorJSON: 'lvl1Points' 
            // });
            this.scene.start('playScene', { 
                bikePosX: levelWidth / 35,
                bikePosY: levelHeight / 1.7,
                numLives: 3,
                finishPosX: levelWidth / 1.05,
                finishPosY: levelHeight / 1.77,
                rampPosX: levelWidth / 3.25,
                rampPosY: levelHeight / 1.83,
                floorPNG: 'lvl2Floor', 
                floorJSON: 'lvl2Points' 
            });
        
        
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start("creditsScene");
        } 
    }
}