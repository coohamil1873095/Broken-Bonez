class Select extends Phaser.Scene {
    constructor() {
        super("selectScene");
    }

    create() {

        // change background color
        this.cameras.main.setBackgroundColor('#272323');

        this.blip = this.sound.add('blip');
        this.blip.setVolume(0.1);
        
        this.add.bitmapText(centerX, centerY / 3, 'cleanFont', 'Level Select', 40).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX/3.4, centerY*1.97, 'cleanFont', 'Press C To Return To Menu', 10).setOrigin(0.5).setTint(0xfffffff);
        //level 1
        this.blackbox = this.add.image(centerX / 2.8, centerY / 1.4, 'blackbox').setScale(0.115);
        this.add.bitmapText(centerX / 2.7, centerY / 1.5, 'cleanFont', '1', 30).setOrigin(0.5).setTint(0xfffffff);
        this.lvl1 = this.add.image(centerX / 2.7, centerY / 1.29, 'lvl1Floor').setScale(0.04);
        this.add.bitmapText(centerX / 2.7, centerY / 1.04, 'cleanFont', 'High Score: ', 10).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX / 2.7, centerY / 0.97, 'cleanFont', lvl1HS, 10).setOrigin(0.5).setTint(0xfffffff);
        //level 2
        this.blackbox = this.add.image(centerX, centerY / 1.4, 'blackbox').setScale(0.115);
        this.add.bitmapText(centerX+3, centerY / 1.5, 'cleanFont', '2', 30).setOrigin(0.5).setTint(0xfffffff);
        this.lvl1 = this.add.image(centerX+3, centerY / 1.29, 'lvl1Floor').setScale(0.04);
        this.add.bitmapText(centerX+3, centerY / 1.04, 'cleanFont', 'High Score: ', 10).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX+3, centerY / 0.97, 'cleanFont', lvl2HS, 10).setOrigin(0.5).setTint(0xfffffff);

        //level 3
        this.blackbox = this.add.image(centerX*1.65, centerY / 1.4, 'blackbox').setScale(0.115);
        this.add.bitmapText(centerX*1.65+3, centerY / 1.5, 'cleanFont', '3', 30).setOrigin(0.5).setTint(0xfffffff);
        this.lvl1 = this.add.image(centerX*1.65+3, centerY / 1.29, 'lvl1Floor').setScale(0.04);
        this.add.bitmapText(centerX*1.65+3, centerY / 1.04, 'cleanFont', 'High Score: ', 10).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX*1.65+3, centerY / 0.97, 'cleanFont', lvl3HS, 10).setOrigin(0.5).setTint(0xfffffff);

        //level 4
        this.blackbox = this.add.image(centerX/1.5, centerY *1.46, 'blackbox').setScale(0.115);
        this.add.bitmapText(centerX/1.47, centerY * 1.42, 'cleanFont', '4', 30).setOrigin(0.5).setTint(0xfffffff);
        this.lvl1 = this.add.image(centerX/1.47, centerY * 1.525, 'lvl1Floor').setScale(0.04);
        this.add.bitmapText(centerX/1.47, centerY * 1.715, 'cleanFont', 'High Score: ', 10).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX/1.47, centerY *1.785, 'cleanFont', lvl4HS, 10).setOrigin(0.5).setTint(0xfffffff);
        

        //level 5
        this.blackbox = this.add.image(centerX*1.32, centerY *1.46, 'blackbox').setScale(0.115);
        this.add.bitmapText(centerX*1.33, centerY * 1.42, 'cleanFont', '5', 30).setOrigin(0.5).setTint(0xfffffff);
        this.lvl1 = this.add.image(centerX*1.33, centerY * 1.525, 'lvl1Floor').setScale(0.04);
        this.add.bitmapText(centerX*1.33, centerY * 1.715, 'cleanFont', 'High Score: ', 10).setOrigin(0.5).setTint(0xfffffff);
        this.add.bitmapText(centerX*1.33, centerY *1.785, 'cleanFont', lvl5HS, 10).setOrigin(0.5).setTint(0xfffffff);
        
        //this.add.bitmapText(centerX / 1.02, centerY / 0.8, 'cleanFont', 'To Return To Menu', 30).setOrigin(0.5).setTint(0xfffffff);
        
        //add new keys for each level
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        
    }
    
    update() {
        //go to each level when the corresponding key is pressed
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.blip.play();
            this.scene.start('menuScene');
        }
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.blip.play();
            this.scene.start('playScene', { 
                level: 1,
                bikePosX: levelWidth / 31,
                bikePosY: levelHeight / 1.75,
                numLives: 3,
                finishPosX: levelWidth / 1.05,
                finishPosY: levelHeight / 1.77,
                rampPosX: levelWidth / 1.4,
                rampPosY: levelHeight / 1.83,
                floorPNG: 'lvl1Floor', 
                floorJSON: 'lvl1Points' 
            });
        }
        if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.blip.play();
            this.scene.start('playScene', { 
                level: 2,
                bikePosX: levelWidth / 35,
                bikePosY: levelHeight / 1.7,
                numLives: 3,
                finishPosX: levelWidth / 1.075,
                finishPosY: levelHeight / 1.77,
                rampPosX: levelWidth / 3.25,
                rampPosY: levelHeight / 1.83,
                floorPNG: 'lvl2Floor', 
                floorJSON: 'lvl2Points' 
            });
        }
        if (Phaser.Input.Keyboard.JustDown(key3)) {
            this.blip.play();
            this.scene.start('playScene', { 
                level: 3,
                bikePosX: levelWidth / 35,
                bikePosY: levelHeight / 1.7,
                numLives: 3,
                finishPosX: levelWidth / 1.075,
                finishPosY: levelHeight / 1.77,
                rampPosX: levelWidth / 1.3,
                rampPosY: levelHeight / 1.83,
                floorPNG: 'lvl3Floor', 
                floorJSON: 'lvl3Points' 
            });
        }
        if (Phaser.Input.Keyboard.JustDown(key4)) {
            this.blip.play();
            this.scene.start('playScene', { 
                level: 4,
                bikePosX: levelWidth / 35,
                bikePosY: levelHeight / 1.7,
                numLives: 3,
                finishPosX: levelWidth / 1.075,
                finishPosY: levelHeight / 1.77,
                rampPosX: levelWidth / 2.2,
                rampPosY: levelHeight / 2.65,
                floorPNG: 'lvl4Floor', 
                floorJSON: 'lvl4Points' 
            });
        }
        if (Phaser.Input.Keyboard.JustDown(key5)) {
            this.blip.play();
            this.scene.start('playScene', { 
                level: 5,
                bikePosX: levelWidth / 35,
                bikePosY: levelHeight / 1.7,
                numLives: 3,
                finishPosX: levelWidth / 1.075,
                finishPosY: levelHeight / 1.77,
                rampPosX: levelWidth / 1.35,
                rampPosY: levelHeight / 1.83,
                floorPNG: 'lvl5Floor', 
                floorJSON: 'lvl5Points' 
            });
        }
    }
}