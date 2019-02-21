const ROT = require('rot-js');
const Game = require('./game');
const Screens = require('./screen');

const display = new Game;
let startScreen = new Screens.StartScreen;
//const playScreen = new Screens.PlayScreen;

display.init();
display.getDisplay().getContainer();
startScreen.Game = display;
display.switchScreen(startScreen);




