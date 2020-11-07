import $ from "jquery";
import Fcal from "./Fcal";
import { localStorageKeyExpr } from "./constants";
import { FcalError } from "fcal";

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
    !(
      event.keyCode === 67 ||
      event.keyCode === 65 ||
      event.keyCode === 86 ||
      event.keyCode === 88 ||
      event.keyCode === 90 ||
      event.keyCode === 89
    )
  ) {
    event.preventDefault();
  }
});

$(window).on("load", function () {
  var value = localStorage.getItem(localStorageKeyExpr);
  if (!value) {
    value = defaultExpression;
  }
  expressionEL.html(value);
  main(expressionEL.contents());
});

function main(values: JQuery<HTMLElement | Text | Comment | Document>) {
  resultEL.empty();
  const fcalEngine = new Fcal();
  generate(values, fcalEngine);
}

function generate(
  values: JQuery<HTMLElement | Text | Comment | Document>,
  fcalEngine: Fcal
) {
  for (const value of values) {
    if (value instanceof HTMLElement) {
      if (value.nodeName === "DIV") {
        if (value.childNodes.length > 1) {
          jumpInDIv(value, fcalEngine);
        } else {
          populateResult(getInnerText(value), fcalEngine);
        }
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

function generateInDIV(
  values: JQuery<HTMLElement | Text | Comment | Document>,
  fcalEngine: Fcal
) {
  for (const value of values) {
    if (value instanceof HTMLElement) {
      if (value.nodeName === "DIV") {
        jumpInDIv(value, fcalEngine);
      } else if (value.nodeName === "SPAN") {
        populateResult(getInnerText(value), fcalEngine);
      }
    } else if (value instanceof Text) {
      populateResult(value, fcalEngine);
    }
  }
}

function jumpInDIv(value: HTMLElement, fcalEngine: Fcal) {
  if ($(value).has("div").length > 0) {
    generateInDIV($(value).contents(), fcalEngine);
  } else {
    populateResult(getInnerText(value), fcalEngine);
  }
}

function getInnerText(value: HTMLElement): string {
  return $(value).text();
}

function addExtraLine(value: string) {
  const count = Math.ceil(value.length / 41);
  for (let index = 2; index <= count; index++) {
    resultEL.append(resultView());
  }
}

function populateResult(
  value: HTMLElement | Text | Comment | Document | string,
  fcalEngine: Fcal
) {
  let content: string | null = "";
  if (typeof value === "string") {
    content = value;
  } else {
    content = value.textContent;
  }
  if (content && content.trim().length > 0) {
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
  } catch (error) {
    if (error instanceof FcalError) {
      console.info(error.info());
    } else {
      console.error(error);
    }
  }
  return p;
}
