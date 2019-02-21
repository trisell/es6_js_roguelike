const { PlayScreen } = require('./playScreen');

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

exports.StartScreen = StartScreen;
