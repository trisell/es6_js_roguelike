const ROT = require('rot-js');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

module.exports  = class Game {
  constructor() {
   this._display = null;
   this._currentScreen = null;
   this.startScreen = null;
  }
  
  init() {
    this._display = new ROT.Display({width: 80, height: 24, layout: 'term'});
    let game = this;
    
    
    let bindEventToScreen = (event) => {
      if (game._currentScreen !== null) {
        window.addEventListener (event, (e) => {

        game._currentScreen.handleInput(event, e);
        })
      }
    }
    process.stdin.on('keypress', (chunk, key) =>{
      if (key && key.ctrl && key.name == 'c') {
        process.exit();
      }
      if(game._currentScreen !== null) {
        game._currentScreen.handleInput(key, game);
      }
    });
    bindEventToScreen('keyup');
    //bindEventToScreen('keypress');
  }

  getDisplay() {
    return this._display;
  }
  
  switchScreen(screen) {
    if (this._currentScreen !== null) {
      this._currentScreen.exit();
    }
    this.getDisplay().clear();
    this._currentScreen = screen;
    if (!this._currentScreen !== null) {
      this._currentScreen.enter();
      this._currentScreen.render(this._display);
    }
  }
  
}
