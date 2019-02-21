const ROT = require('rot-js');
const Game = require('./game');
const { StartScreen } = require('./startScreen');

const display = new Game;
let startScreen = new StartScreen;

display.init();
display.getDisplay().getContainer();
startScreen.Game = display;
display.switchScreen(startScreen);




