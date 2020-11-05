"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const fcal_1 = require("fcal");
const localStorageKey = "fcal-playground";
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
jquery_1.default("#expression").on("focusout", function () {
    //console.log("Focus out");
    const element = jquery_1.default(this);
    if (!element.text().trim().length) {
        element.empty();
    }
});
jquery_1.default("#expression").on("change keydown paste input", function () {
    // console.log("change");
    const expr = jquery_1.default(this);
    const contents = expr.contents();
    localStorage.setItem(localStorageKey, expr.html());
    main(contents);
});
jquery_1.default("#expression").on("keydown", (event) => {
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
    jquery_1.default("#expression").html(value);
    main(jquery_1.default("#expression").contents());
});
function main(values) {
    var fcalEngine = new fcal_1.Fcal();
    var result = jquery_1.default("#value");
    result.empty();
    for (const value of values) {
        //console.log(value);
        if (value instanceof HTMLElement) {
            if (value.nodeName === "DIV") {
                const content = value.textContent;
                if (content && content.trim().length > 0) {
                    value;
                    result.append(evaluate(content, fcalEngine));
                    addExtraLine(content, result);
                }
                else {
                    result.append(resultView());
                }
            }
            else {
                result.append(resultView());
            }
        }
        else if (value instanceof Text) {
            const content = value.textContent;
            if (content && content.trim().length > 0) {
                result.append(evaluate(content, fcalEngine));
                addExtraLine(content, result);
            }
            else {
                result.append(resultView());
            }
        }
        else {
            result.append(resultView());
        }
    }
}
function findText(el) { }
function addExtraLine(value, result) {
    const count = Math.ceil(value.length / 41);
    for (let index = 2; index <= count; index++) {
        result.append(resultView());
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
