class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {

        // change background color
        this.cameras.main.setBackgroundColor('#272323');

        this.blip = this.sound.add('blip');
        this.blip.setVolume(0.1);
       
        // show credits text

        this.add.bitmapText(centerX, centerY / 5, 'cleanFont', 'Credits', 20).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX / 5, centerY / 3, 'cleanFont', 'Music', 20).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX / 1.4, centerY / 2, 'cleanFont', 'https://pixabay.com/music/rock-sunshine-whistle-175139/', 10).setOrigin(0.5).setTint(0xfffffff);
        // insert music text
        this.add.bitmapText(centerX / 6, centerY / 1.1, 'cleanFont', 'SFX', 20).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX / 1.6, centerY / 0.925, 'cleanFont', 'https://mixkit.co/free-sound-effects/motorcycle/', 10).setOrigin(0.5).setTint(0xfffffff);

        // insert sfx text 

        this.add.bitmapText(centerX / 6, centerY / 0.7, 'cleanFont', 'Font', 20).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX / 1.825, centerY / 0.625, 'cleanFont', 'https://emhuo.itch.io/nico-pixel-fonts-pack', 10).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX, centerY / 0.55, 'cleanFont', 'All other assets made using GIMP and PhysicsEditor', 10).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX, centerY / 0.525, 'cleanFont', 'Press C to Return to Menu', 10).setOrigin(0.5).setTint(0xfff200);


        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.blip.play();
            this.scene.start('menuScene');
        }
    }
}