let config = {
    type: Phaser.AUTO,
    width: 480,    //480    1920
    height: 320,   //320    1080
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "matter",
        matter: {
            gravity: {
                y: 0.15      //0.15  // 0.25
            },
            debug: true
        }
    },
    scene: [ Load, Menu, Credits, Lose, Play, Select ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let cursors;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keySpace, keyC, key1;