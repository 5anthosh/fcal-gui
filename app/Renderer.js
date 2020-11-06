"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const fcal_1 = require("fcal");
const localStorageKey = "fcal-playground";
const expressionEL = jquery_1.default("#expression");
const resultEL = jquery_1.default("#value");
let expressions = [
    "radius : 23 cm",
    "PI * radius ^ 2",
    "PI2 * radius",
    "log(23)",
    "23 % of 1023",
    "200 sec + 120 %",
    "20 minutes + 34 day in sec",
    "sin(PI)",
    "E",
    "speed = 20 kph",
    "speed in mps",
];
let defaultExpression = (() => {
    let val = "";
    for (const expression of expressions) {
        val = `${val}<div>${expression}</div><div></br></div>`;
    }
    return val;
})();
let expression = "0";
expressionEL.on("focusout", function () {
    const element = jquery_1.default(this);
    if (!element.text().trim().length) {
        element.empty();
    }
});
expressionEL.on("change keydown paste input", function () {
    const expr = jquery_1.default(this);
    const contents = expr.contents();
    localStorage.setItem(localStorageKey, expr.html());
    main(contents);
});
expressionEL.on("keydown", (event) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
});
jquery_1.default(window).on("load", function () {
    var value = localStorage.getItem(localStorageKey);
    if (!value) {
        value = defaultExpression;
    }
    expression = value;
    expressionEL.html(value);
    main(expressionEL.contents());
});
function main(values) {
    var fcalEngine = new fcal_1.Fcal();
    resultEL.empty();
    for (const value of values) {
        if (value instanceof HTMLElement) {
            if (value.nodeName === "DIV") {
                populateResult(value, fcalEngine);
            }
            else {
                resultEL.append(resultView());
            }
        }
        else if (value instanceof Text) {
            populateResult(value, fcalEngine);
        }
        else {
            resultEL.append(resultView());
        }
    }
}
function findText(el) { }
function addExtraLine(value) {
    const count = Math.ceil(value.length / 41);
    for (let index = 2; index <= count; index++) {
        resultEL.append(resultView());
    }
}
function populateResult(value, fcalEngine) {
    const content = value.textContent;
    if (content && content.trim().length > 0) {
        value;
        resultEL.append(evaluate(content.trim(), fcalEngine));
        addExtraLine(content);
    }
    else {
        resultEL.append(resultView());
    }
}
function resultView() {
    const p = document.createElement("p");
    p.style.marginTop = "0px";
    p.style.marginBottom = "0px";
    p.style.height = "19px";
    return p;
}
function evaluate(source, fcalEngine) {
    const p = resultView();
    if (source.trim().length === 0) {
        return p;
    }
    try {
        p.style.color = "green";
        p.textContent = fcalEngine.evaluate(source).toString();
    }
    catch (error) {
        // p.style.color = "red";
        // p.textContent = "x " + error.message;
    }
    return p;
}
