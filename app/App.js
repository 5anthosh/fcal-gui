'use strict';
const __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : {default: mod};
};

Object.defineProperty(exports, '__esModule', {value: true});
const electron_1 = require('electron');
const Main_1 = __importDefault(require('./Main'));
Main_1.default.main(electron_1.app, electron_1.BrowserWindow);
