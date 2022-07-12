//const { TapEngine } = require("./TapEngine.js");

//Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
console.debug(`apps.js- beginning of script`);
//const TapEngine_js_1 = require("./TapEngine.js");

//import { TapEngine } from './TapEngine.js';

//Variable Declarations
/*
//Variables
 */


function startGame() {
    var gEngine = new TapEngine('thegame');
    gEngine.gv.width = document.body.clientWidth; //document.width is obsolete
    gEngine.gv.height = document.body.clientHeight; //document.height is obsolete
    gEngine.increment = 0.01;
    gEngine.startGame();
}

//File Loads
console.debug('tapcomp.js entry');
