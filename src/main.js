//
//  Connor Hamilton
//  Yahli Kijel
//

let config = {
    type: Phaser.AUTO,
    width: 480,    
    height: 320,   
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "matter",
        matter: {
            gravity: {
                y: 0.15      
            },
            //debug: true
        }
    },
    scene: [ Load, Menu, Credits, Lose, Play, Select, Trick]
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
let score;
let playing;
let levelWidth = 1920;
let levelHeight = 1080;

let lvl1HS = 0;
let lvl2HS = 0;
let lvl3HS = 0;
let lvl4HS = 0;
let lvl5HS = 0;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keySpace, keyC, key1, key2, key3, key4, key5;
