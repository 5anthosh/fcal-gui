import Fcal from "./fcal";
import { exampleOffKey, localStorageKeyExpr } from "./util";
import { FcalError } from "fcal";
import { remote } from "electron";

const expressionEL = document.getElementById("expression")!;
const resultEL = document.getElementById("value")!;
const closeApp = document.getElementById("close")!;
const minimizeApp = document.getElementById("minimize")!;
const deleteExpr = document.getElementById("delete")!;
const empty = "";

const expressions = [
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

const defaultExpression = (() => {
  let value = "";
  for (const expression of expressions) {
    value = `${value}<div>${expression}</div><div></br></div>`;
  }

  return value;
})();

closeApp.addEventListener("click", () => {
  remote.getCurrentWindow().close();
});

minimizeApp.addEventListener("click", () => {
  remote.getCurrentWindow().minimize();
});

deleteExpr.addEventListener("click", () => {
  expressionEL.innerHTML = "";
  resultEL.innerHTML = "";
  localStorage.setItem(localStorageKeyExpr, "");
  expressionEL.focus();
});

["change", "keydown", "paste", "input"].forEach((evt) => {
  expressionEL.addEventListener(evt, function (this: HTMLElement) {
    const contents = this.childNodes;
    localStorage.setItem(localStorageKeyExpr, this.innerHTML);
    main(contents);
  });
});

expressionEL.addEventListener("keydown", (event) => {
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

  if (event.ctrlKey && event.keyCode === 86) {
    console.log("CTR+v");
    console.log(generate(expressionEL.childNodes));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let value = localStorage.getItem(localStorageKeyExpr);
  if (!value) {
    value = !localStorage.getItem(exampleOffKey) ? defaultExpression : "";
    localStorage.setItem(localStorageKeyExpr, value);
  }
  expressionEL.innerHTML = value;
  localStorage.setItem(exampleOffKey, "true");
  main(expressionEL.childNodes);
  expressionEL.focus();
});

export function reRun() {
  const contents = expressionEL.childNodes;
  main(contents);
}

function main(values: NodeListOf<ChildNode>) {
  const fcalEngine = new Fcal();
  const expressions = generate(values);
  populateResult(expressions, fcalEngine);
}

function generate(values: NodeListOf<ChildNode>): Array<string> {
  const expressions = Array<string>();
  values.forEach((value) => {
    if (value instanceof HTMLElement) {
      if (value.nodeName === "DIV") {
        if (value.childNodes.length > 1) {
          jumpInDIv(expressions, value);
        } else {
          expressions.push(getInnerText(value));
        }
      } else {
        expressions.push(empty);
      }
    } else if (value instanceof Text) {
      expressions.push(value.data);
    } else {
      expressions.push(empty);
    }
  });
  return expressions;
}

function generateInDIV(
  expressions: Array<string>,
  values: NodeListOf<ChildNode>
) {
  values.forEach((value) => {
    if (value instanceof HTMLElement) {
      if (value.nodeName === "DIV") {
        jumpInDIv(expressions, value);
      } else if (value.nodeName === "SPAN") {
        expressions.push(getInnerText(value));
      }
    } else if (value instanceof Text) {
      expressions.push(value.data);
    }
  });
}

function jumpInDIv(expressions: Array<string>, value: HTMLElement) {
  if (value.getElementsByTagName("div").length > 0) {
    generateInDIV(expressions, value.childNodes);
  } else {
    expressions.push(getInnerText(value));
  }
}

function populateResult(expressions: Array<string>, fcalEngine: Fcal) {
  resultEL.innerHTML = "";
  for (const expr of expressions) {
    populateResultUnit(expr, fcalEngine);
  }
}

function rewriteExpressionsBoard() {
  const contents = expressionEL.childNodes;
  const expressions = generate(contents);
  populateExpressions(expressions);
}

function populateExpressions(expressions: Array<string>) {
  expressionEL.innerHTML = empty;
  for (const expr of expressions) {
    expressionEL.append(createExpressionUnit(expr));
  }
}

function createExpressionUnit(expression: string): HTMLElement {
  if (expression.length == 0) {
    return createDIVElement(null);
  }
  return createDIVElement(expression);
}

function createDIVElement(value: string | null): HTMLElement {
  const d = document.createElement("div");
  if (value) {
    d.innerText = value;
  } else {
    d.appendChild(document.createElement("br"));
  }
  return d;
}
function getInnerText(value: HTMLElement): string {
  return value.textContent ? value.textContent : empty;
}

function addExtraLine(value: string) {
  const count = Math.ceil(value.length / 41);
  for (let index = 2; index <= count; index++) {
    resultEL.append(resultView());
  }
}

function populateResultUnit(value: string, fcalEngine: Fcal) {
  if (value.trim().length > 0) {
    resultEL.append(resultView(value.trim(), fcalEngine));
  } else {
    resultEL.append(resultView());
  }
  addExtraLine(value);
}

function resultView(source?: string | null, fcalEngine?: Fcal): HTMLElement {
  const d = document.createElement("div");
  const p = createParagraphElement();
  if (source && fcalEngine) {
    p.textContent = evaluate(source, fcalEngine);
  }
  d.appendChild(p);
  d.classList.add("ResultUnit");
  return d;
}

function createParagraphElement(): HTMLParagraphElement {
  const p = document.createElement("p");
  p.style.marginTop = "0px";
  p.style.marginBottom = "0px";
  return p;
}

function evaluate(source: string, fcalEngine: Fcal): string {
  if (source.trim().length === 0) {
    return empty;
  }

  try {
    const result = fcalEngine.evaluate(source).toString();
    return result;
  } catch (error) {
    if (error instanceof FcalError) {
      console.info(error.info());
    } else {
      console.error(error);
    }
    return empty;
  }
}
