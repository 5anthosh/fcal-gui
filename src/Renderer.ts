import $, { event } from "jquery";
import Fcal from "./Fcal";
import { localStorageKeyExpr } from "./constants";

const expressionEL = $("#expression");
const resultEL = $("#value");

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
  const element = $(this);
  if (!element.text().trim().length) {
    element.empty();
  }
});

expressionEL.on("change keydown paste input", function () {
  const expr = $(this);
  const contents = expr.contents();
  localStorage.setItem(localStorageKeyExpr, expr.html());
  main(contents);
});

expressionEL.on("keydown", (event) => {
  if (
    event.ctrlKey &&
    !(event.keyCode === 67 || event.keyCode === 65 || event.keyCode === 86)
  ) {
    console.log(event.key, event, event.keyCode);
    event.preventDefault();
  }
});

$(window).on("load", function () {
  var value = localStorage.getItem(localStorageKeyExpr);
  if (!value) {
    value = defaultExpression;
  }
  expression = value;
  expressionEL.html(value);
  main(expressionEL.contents());
});

function main(values: JQuery<HTMLElement | Text | Comment | Document>) {
  resultEL.empty();
  const fcalEngime = new Fcal();
  generate(values, fcalEngime);
}
function generate(
  values: JQuery<HTMLElement | Text | Comment | Document>,
  fcalEngine: Fcal
) {
  for (const value of values) {
    if (value instanceof HTMLElement) {
      if (value.nodeName === "DIV") {
        generate($(value).contents(), fcalEngine);
      } else {
        resultEL.append(resultView());
      }
    } else if (value instanceof Text) {
      populateResult(value, fcalEngine);
    } else {
      resultEL.append(resultView());
    }
  }
}

function findText(el: JQuery<HTMLElement>) {}
function addExtraLine(value: string) {
  const count = Math.ceil(value.length / 41);
  for (let index = 2; index <= count; index++) {
    resultEL.append(resultView());
  }
}

function populateResult(
  value: HTMLElement | Text | Comment | Document,
  fcalEngine: Fcal
) {
  const content = value.textContent;
  if (content && content.trim().length > 0) {
    // console.log(Fcal.getTokensForExpression(content.trim()));
    resultEL.append(evaluate(content.trim(), fcalEngine));
    addExtraLine(content);
  } else {
    resultEL.append(resultView());
  }
}
function resultView(): HTMLParagraphElement {
  const p = document.createElement("p");
  p.style.marginTop = "0px";
  p.style.marginBottom = "0px";
  p.style.height = "19px";
  return p;
}

function evaluate(source: string, fcalEngine: Fcal): HTMLParagraphElement {
  const p = resultView();
  if (source.trim().length === 0) {
    return p;
  }
  try {
    p.textContent = fcalEngine.evaluate(source).toString();
  } catch (error) {}
  return p;
}
