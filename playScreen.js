const { LoseScreen } = require('./loseScreen');
const { WinScreen } = require('./winScreen');
const ROT = require('rot-js');
const Tile = require('./tile').Tile;
const Glyph = require('./glyph').Glyph;
const Map = require('./map').Map;
const fs = require('fs');
const util = require('util');


const nullTile = new Tile(new Glyph());
const floorTile = new Tile(new Glyph('.'));
const wallTile = new Tile(new Glyph('#', 'goldenrod'));

class PlayScreen {
  constructor() {
    this._map = null;
    this._centerX= 0;
    this._centerY= 0;
    this.loseScreen = new LoseScreen;
    this.winScreen = new WinScreen;
  }
  
  enter() { 
    let map = [];
    const mapWidth = 500;
    const mapHeight = 500;
    for (var x = 0; x < mapWidth; x++) {
        // Create the nested array for the y values
        map.push([]);
        // Add all the tiles
        for (var y = 0; y < mapHeight; y++) {
            map[x].push(nullTile);
        }
    }
    const generator = new ROT.Map.Cellular(mapWidth, mapHeight);
    generator.randomize(0.5);
    const totalIterations = 2;
    // Iteratively smoothen the map
    for (let i = 0; i < totalIterations - 1; i++) {
        generator.create();
    }
    // Smoothen it one last time and then update our map
    generator.create(function(x,y,v) {
        if (v === 1) {
            map[x][y] = floorTile;
        } else {
            map[x][y] = wallTile;
        }
    });
    // Create our map from the tiles
    this._map = new Map(map);
   };

  exit() { console.log("Exited play screen."); };

  render(display, screenWidth, screenHeight) {
    var topLeftX = Math.max(0, this._centerX - (screenWidth / 2));
    // Make sure we still have enough space to fit an entire game screen
    topLeftX = Math.min(topLeftX, this._map.getWidth() - screenWidth);
    // Make sure the y-axis doesn't above the top bound
    var topLeftY = Math.max(0, this._centerY - (screenHeight / 2));
    // Make sure we still have enough space to fit an entire game screen
    topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);

    for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
      for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
          // Fetch the glyph for the tile and render it to the screen
          // at the offset position.
          var glyph = this._map.getTile(x, y).getGlyph();
          display.draw(
              x - topLeftX,
              y - topLeftY,
              glyph.getChar(), 
              glyph.getForeground(), 
              glyph.getBackground());
      }
    };
    display.draw(
      this._centerX - topLeftX, 
      this._centerY - topLeftY,
      '@',
      'white',
      'black');
  };

  move(dX, dY) {
    this._centerX = Math.max(0,
     Math.min(this._map.getWidth() - 1, this._centerX + dX)
    );
    this._centerY = Math.max(0,
      Math.min(this._map.getHeight() - 1, this._centerY + dY)    
    );
  };

  handleInput(inputType, Game) {
    if (inputType.sequence === '\r') {
        Game.switchScreen(this.winScreen);
    } else if (inputType.sequence === '\u001b') {
        Game.switchScreen(this.loseScreen);
    }

    if (inputType.sequence === '\u001b[D'){
      this.move(-1, 0);
    }else if (inputType.sequence === '\u001b[C'){
      this.move(1, 0);
    }else if (inputType.sequence === '\u001b[A'){
      this.move(0, -1);
    }else if (inputType.sequence === '\u001b[B'){
      this.move(0, 1);
    }
  }
}

exports.PlayScreen = PlayScreen;