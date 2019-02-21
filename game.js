const ROT = require('rot-js');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

module.exports  = class Game {
  constructor() {
   this._display = null;
   this._currentScreen = null;
   this.startScreen = null;
   this._screenWidth = 80;
   this._screenHeight= 24;
  }
  
  init() {
    this._display = new ROT.Display({
      width: this._screenWidth, 
      height: this._screenHeight, 
      layout: 'term'
    });
    
    let game = this;
    
    // This function handles key strokes in the game.
    process.stdin.on('keypress', (chunk, key) =>{
      if (key && key.ctrl && key.name == 'c') {
        process.exit();
      }
      if(game._currentScreen !== null) {
        game._currentScreen.handleInput(key, game);
        game._display.clear();
        game._currentScreen.render(
          game._display, 
          this._screenWidth, 
          this._screenHeight
        );
      }
    });
  }
  getDisplay() {
    return this._display;
  }
  
  getScreenWidth() {
    return this._screenWidth;
  }

  getScreenHeight() {
    return this._screenHeight;
  }

  switchScreen(screen) {
    if (this._currentScreen !== null) {
      this._currentScreen.exit();
    }
    this.getDisplay().clear();
    this._currentScreen = screen;
    if (!this._currentScreen !== null) {
      this._currentScreen.enter();
      this._currentScreen.render(
        this._display, 
        this._screenWidth, 
        this._screenHeight
      );
    }
  }
  
}
