class Trick extends Phaser.Scene {
    constructor() {
        super("trickScene");
    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        this.sky = this.add.image(0, 0, 'skyImg').setOrigin(0);

    }

    update() {
        
    }

}