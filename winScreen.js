const ROT = require('rot-js');

// Define our winning screen
class WinScreen {
  constructor(){
    
  }
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

exports.WinScreen = WinScreen;