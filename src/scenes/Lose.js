class Lose extends Phaser.Scene {
    constructor() {
        super("loseScene");
    }

    create() {

        // change background color
        this.cameras.main.setBackgroundColor('#272323');

        // show credits text

        this.add.bitmapText(centerX, centerY / 3, 'cleanFont', 'You Lose...', 40).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX / 1.02, centerY / 1, 'cleanFont', 'Press Space', 30).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX / 1.02, centerY / 0.8, 'cleanFont', 'To Return To Menu', 30).setOrigin(0.5).setTint(0xfffffff);
        
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('menuScene');
        }
    }
}