class Select extends Phaser.Scene {
    constructor() {
        super("selectScene");
    }

    create() {

        // change background color
        this.cameras.main.setBackgroundColor('#272323');

        // show credits text

        this.add.bitmapText(centerX, centerY / 3, 'cleanFont', 'Level Select', 40).setOrigin(0.5).setTint(0xfffffff);
        this.blackbox = this.add.image(centerX / 2.8, centerY / 1.4, 'blackbox').setScale(0.115);
        this.add.bitmapText(centerX / 2.7, centerY / 1.5, 'cleanFont', '1', 30).setOrigin(0.5).setTint(0xfffffff);
        this.lvl1 = this.add.image(centerX / 2.7, centerY / 1.3, 'lvl1Floor').setScale(0.04);
        
        
        //this.add.bitmapText(centerX / 1.02, centerY / 0.8, 'cleanFont', 'To Return To Menu', 30).setOrigin(0.5).setTint(0xfffffff);
        
        //add new keys for each level
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.scene.start('playScene');
        }
    }
}