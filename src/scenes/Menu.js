class Menu extends Phaser.Scene {
    static isBgmPlaying = false;
    constructor() {
        super("menuScene");
    }

    create() {

        if (!Menu.isBgmPlaying) {
            this.bgm = this.sound.add('bgm');
            this.bgm.play({ loop: true });
            this.bgm.setVolume(0.05);
        
            // Update the static variable to indicate that bgm is now playing
            Menu.isBgmPlaying = true;
        }
        this.blip = this.sound.add('blip');
        this.blip.setVolume(0.1);
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
            this.blip.play();
            this.scene.start('selectScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.blip.play();
            this.scene.start("creditsScene");
        }
    }
}