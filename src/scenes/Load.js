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

        this.load.image('bikeFull', 'Bike/bike-full.png');
        this.load.image('bikeImg', 'Bike/bike-nowheels.png');
        this.load.json('bikePoints', 'Bike/bikeFrame.json');

        this.load.image('wheelImg', 'Bike/wheel.png');
        this.load.json('wheelPoints', 'Bike/wheel.json');

        this.load.image('skyImg', 'Background/sky.png');
        this.load.image('lives', 'lives.png');
        this.load.image('scorebar', 'scorebar.png');
        this.load.image('lvl1Floor', 'Levels/1_floor.png');
        this.load.json('lvl1Points', 'Levels/level1Points.json')
        // load audio assets
        this.load.audio('sfx_motor', 'Audio/bikesound.mp3')
        // load font
        this.load.bitmapFont('cleanFont', 'font/CleanPlate.png', 'font/CleanPlate.xml');
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