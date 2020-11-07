'use strict';
const __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : {default: mod};
};

Object.defineProperty(exports, '__esModule', {value: true});
exports.getER = void 0;
const constants_1 = require('./constants');
const node_fetch_1 = __importDefault(require('node-fetch'));
function getRates() {
	return (async () => {
		const response = await node_fetch_1.default(constants_1.ERUrl);
		try {
			const value = await response.json();
			localStorage.setItem(constants_1.localStorageKeyER, JSON.stringify({date: Date.now(), ER: value}));
			console.info(`Getting rates data from ${constants_1.ERUrl}`);
			return value;
		} catch (error) {
			throw error;
		}
	})();
}

function getERFromLocalStorage() {
	const ERValue = localStorage.getItem(constants_1.localStorageKeyER);
	if (!ERValue) {
		return null;
	}

	return JSON.parse(ERValue);
}

function getER() {
	const ERValue = getERFromLocalStorage();
	if (!ERValue) {
		return getRates();
	}

	if (Date.now() > ERValue.timestamp * 1000 * 60 * 60 * constants_1.noOfHrToExpireER) {
		console.info(`Rates got expired: ${new Date(ERValue.timestamp)}`);
		return getRates();
	}

	return ERValue.ER;
}

exports.getER = getER;
