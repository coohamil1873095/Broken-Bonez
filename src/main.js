let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [ Load, Menu, Credits, Play ]
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

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keySpace, keyC;