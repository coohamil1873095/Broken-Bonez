class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.titleScreen = this.add.image(0, 0,'titleScreen').setOrigin(0);
        this.titleScreen.scale = 0.5;
        
        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditsScene');
        } 
    }
}