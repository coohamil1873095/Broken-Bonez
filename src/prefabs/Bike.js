// Bike prefab
class Bike extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene.matter.world, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this);           // add Bike to existing scene
        this.scene = scene;
        this.setPosition(x, y);
        this.setTexture(texture);
        this.setFrame(frame);
        
        //console.log(this);
    }

    update() {
        this.setPosition(0, 0);
        console.log(this.x);
    }

    
}