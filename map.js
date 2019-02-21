const Tile = require('./tile').Tile;
const Glyph = require('./glyph').Glyph;

const nullTile = new Tile(new Glyph());
const floortile = new Tile(new Glyph('.'));
const wallTile = new Tile(new Glyph('#', 'goldenrod'));

class Map {
  constructor(tiles){
    this._tiles = tiles;
    this._width = tiles.length;
    this._height = tiles[0].length;
  }
  
  getWidth() {
    return this._width;
  }
  
  getHeight() {
    return this._height;
  }

  getTile(x, y) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      return tile.nullTile;
    } else {
      return this._tiles[x][y] || tile.nullTile;
    }
  }

}

exports.Map = Map;