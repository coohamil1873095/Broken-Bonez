class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';

        // load graphics assets
        this.load.image('titleScreen', 'Title_Screen.png');

        this.load.image('finishImg', 'finishline.png');

        this.load.image('rampImg', 'ramp.png');

        this.load.image('midairImg', 'Trick/midair.png');
        this.load.image('trickup', 'Trick/trickup.png');
        this.load.image('trickdown', 'Trick/trickdown.png');
        this.load.image('trickleft', 'Trick/trickleft.png');
        this.load.image('trickright', 'Trick/trickright.png');
        this.load.image('uparrow', 'Trick/uparrow.png');
        this.load.image('downarrow', 'Trick/downarrow.png');
        this.load.image('leftarrow', 'Trick/leftarrow.png');
        this.load.image('rightarrow', 'Trick/rightarrow.png');

        this.load.image('bikeFull', 'Bike/bike-full.png');
        this.load.image('bikeImg', 'Bike/bike-nowheels.png');
        this.load.json('bikePoints', 'Bike/bikeFrame.json');

        this.load.image('wheelImg', 'Bike/wheel.png');
        this.load.json('wheelPoints', 'Bike/wheel.json');

        this.load.image('skyImg', 'Background/sky.png');
        this.load.image('lives', 'lives.png');
        this.load.image('scorebar', 'scorebar.png');
        this.load.image('blackbox', 'blackbox.png');

        this.load.image('templateFloor', 'Levels/1_floor.png');
        this.load.image('lvl1Floor', 'Levels/1_floor.png');
        this.load.json('lvl1Points', 'Levels/level1Points.json');
        this.load.image('lvl2Floor', 'Levels/2_floor.png');
        this.load.json('lvl2Points', 'Levels/level2Points.json');
        this.load.image('lvl3Floor', 'Levels/3_floor.png');
        this.load.json('lvl3Points', 'Levels/level3Points.json');
        this.load.image('lvl4Floor', 'Levels/4_floor.png');
        this.load.json('lvl4Points', 'Levels/level4Points.json');
        this.load.image('lvl5Floor', 'Levels/5_floor.png');
        this.load.json('lvl5Points', 'Levels/level5Points.json');
        
        

        // load audio assets
        this.load.audio('sfx_motor', 'Audio/bikesound.mp3');
        this.load.audio('bgm', 'Audio/loopingmusic.mp3');
        this.load.audio('blip', 'Audio/blip_select12.wav');

        // load font
        this.load.bitmapFont('cleanFont', 'font/CleanPlate.png', 'font/CleanPlate.xml');

        // load animations
        this.load.spritesheet('jump', 'Bike/jump.png', {
            frameWidth: 544,     // 544
            frameHeight: 384,    // 384
            startFrame: 0,   
            endFrame: 7,
        });
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}