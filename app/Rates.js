"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getER = void 0;
const constants_1 = require("./constants");
const node_fetch_1 = __importDefault(require("node-fetch"));
function getRates() {
    return (async () => {
        const response = await node_fetch_1.default(constants_1.ERUrl);
        try {
            const value = await response.json();
            localStorage.setItem(constants_1.localStorageKeyER, JSON.stringify({ date: new Date(), ER: value }));
            return value;
        }
        catch (e) {
            throw e;
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
    else {
        if (Date.now() > ERValue["date"].getTime * 1000 * 60 * 60 * 12) {
            return getRates();
        }
        else {
            return ERValue["ER"];
        }
    }
}
exports.getER = getER;
