"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getER = void 0;
const constants_1 = require("./constants");
const node_fetch_1 = __importDefault(require("node-fetch"));
function getRates() {
    let value = "";
    (async () => {
        const response = await node_fetch_1.default(constants_1.ERUrl);
        try {
            value = await response.json();
            localStorage.setItem(constants_1.localStorageKeyER, JSON.stringify({ date: new Date(), ER: value }));
        }
        catch (e) {
            console.log(e);
            value = null;
        }
    })();
    return value;
}
function getER() {
    const ERValue = localStorage.getItem(constants_1.localStorageKeyER);
    if (!ERValue) {
        return getRates();
    }
    else {
        const value = JSON.parse(ERValue);
        if (Date.now() > value.date.getTime * 1000 * 60 * 60 * 12) {
            return getRates();
        }
        else {
            return value.ER;
        }
    }
}
exports.getER = getER;
