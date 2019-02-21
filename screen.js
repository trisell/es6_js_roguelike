const { display } = require('./main');
const ROT = require('rot-js');
const Tile = require('./tile').Tile;
const Glyph = require('./glyph').Glyph;
const Map = require('./map').Map;


const nullTile = new Tile(new Glyph());
const floorTile = new Tile(new Glyph('.'));
const wallTile = new Tile(new Glyph('#', 'goldenrod'));

// Define our winning screen
class WinScreen {
  enter() {    console.log("Entered win screen."); };
  exit() { console.log("Exited win screen."); };
  render(display) {
      // Render our prompt to the screen
      for (var i = 0; i < 22; i++) {
          // Generate random background colors
          var r = Math.round(Math.random() * 255);
          var g = Math.round(Math.random() * 255);
          var b = Math.round(Math.random() * 255);
          var background = ROT.Color.toRGB([r, g, b]);
          display.drawText(2, i + 1, "%b{" + background + "}You win!");
      }
  };
  handleInput(inputType, inputData) {
      // Nothing to do here      
  }
}

// Define our winning screen
class LoseScreen {
  enter() {    console.log("Entered lose screen."); };
  exit() { console.log("Exited lose screen."); };
  render(display) {
      // Render our prompt to the screen
      for (var i = 0; i < 22; i++) {
          display.drawText(2, i + 1, "%b{red}You lose! :(");
      }
  };
  handleInput(inputType, inputData) {
      // Nothing to do here      
  }
}

class PlayScreen {
  constructor() {
    this._map = null;
    this.loseScreen = new LoseScreen;
    this.winScreen = new WinScreen;
  }
  
  enter() { 
    console.log("Entered start screen");
   };
  exit() { console.log("Exited play screen."); };
  render(display) {
    // Render the Text for this screen.
    display.drawText(3,5, "%c{red}%b{white}This game is so much fun!");
    display.drawText(4,6, "Press [Enter] to win, or [Esc] to lose!");
  };
  handleInput(inputType, Game) {
    if (inputType.sequence === '\r') {
        Game.switchScreen(this.winScreen);
    } else if (inputType.sequence === '\u001b') {
        Game.switchScreen(this.loseScreen);
    }
  }
}



class StartScreen {
  constructor() {
   this.Game = null;
   this.playscreen = new PlayScreen; 
  }
  
  enter() {    console.log("Entered start screen."); };

  exit() { console.log("Exited start screen."); };
  render(display) {
      // Render our prompt to the screen
      display.drawText(1,1, "%c{yellow}Javascript Roguelike");
      display.drawText(1,2, "Press [Enter] to start!");
  };
  handleInput(inputType, Game) {
      // When [Enter] is pressed, go to the play screen
      console.log(inputType);
        if (inputType.sequence === '\r') {
              Game.switchScreen(this.playscreen);
          }
      
  }
}

module.exports = { 
  StartScreen: StartScreen, 
  PlayScreen: PlayScreen 
};


