const ROT = require('rot-js');


module.exports  = class Game {
  constructor() {
   this._display = null;
   this._currentScreen = null;
   this.startScreen = null;
  }
  
  init() {
    this._display = new ROT.Display({width: 80, height: 24, layout: 'term'});
    let container = this._display.getContainer();
    let foreground, background, colors;

    for (var i = 0; i < 15; i++) {
      // Calculate the foreground color, getting progressively darker
      // and the background color, getting progressively lighter.
      foreground = ROT.Color.toRGB([255 - (i*20),
                                    255 - (i*20),
                                    255 - (i*20)]);
      background = ROT.Color.toRGB([i*20, i*20, i*20]);
      // Create the color format specifier.
      colors = "%c{" + foreground + "}%b{" + background + "}";
      // Draw the text two columns in and at the row specified
      // by i
      this._display.drawText(2, i, colors + "Hello, world!");
    }
  }
}
