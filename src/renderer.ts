import Fcal from "./fcal";
import { exampleOffKey, localStorageKeyExpr } from "./util";
import { FcalError } from "fcal";

interface ExpressionValueMap {
  expression: string;
  value: string;
}
let OldValueCache: Array<ExpressionValueMap>;
let CurrentValueCache: Array<ExpressionValueMap> = new Array();

const expressionEL = document.getElementById("expression")!;
const resultEL = document.getElementById("value")!;
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

["change", "paste", "input"].forEach((evt) => {
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
    setTimeout(function () {
      rewriteExpressionsBoard();
      setCursorAtEnd();
    }, 0);
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
  setCursorAtEnd();
});

export function reRun() {
  const contents = expressionEL.childNodes;
  main(contents);
}

function main(values: NodeListOf<ChildNode>) {
  const fcalEngine = new Fcal();
  const expressions = generate(values);
  populateResult(expressions, fcalEngine);
  OldValueCache = CurrentValueCache;
  clearCache();
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
  let isChanged = false;
  for (let index = 0; index < expressions.length; index++) {
    const source = expressions[index];
    if (
      !isChanged &&
      OldValueCache &&
      OldValueCache.length > index &&
      OldValueCache[index].expression.trim() === source.trim()
    ) {
      resultEL.appendChild(resultView(OldValueCache[index].value));
      setCache(source, OldValueCache[index].value);
      addExtraLine(source);
    } else {
      isChanged = true;
      populateResultUnit(source, fcalEngine);
    }
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

function setCache(expression: string, value: string) {
  CurrentValueCache.push({ expression, value });
}

function clearCache() {
  CurrentValueCache = [];
}

function populateResultUnit(source: string, fcalEngine: Fcal) {
  if (source.trim().length > 0) {
    const value = evaluate(source, fcalEngine);
    setCache(source, value);
    resultEL.append(resultView(value));
  } else {
    setCache(source, empty);
    resultEL.append(resultView());
  }
  addExtraLine(source);
}

function resultView(value?: string): HTMLElement {
  const d = document.createElement("div");
  const p = createParagraphElement();
  if (value) {
    p.textContent = value;
  }
  d.appendChild(p);
  d.classList.add("ResultUnit");
  return d;
}

function createParagraphElement(): HTMLParagraphElement {
  const p = document.createElement("p");
  p.style.marginTop = "0px";
  p.style.height = "19px";
  p.style.marginBottom = "0px";
  return p;
}

function setCursorAtEnd() {
  expressionEL.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(expressionEL);
    range.collapse(false);
    var sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}

function evaluate(source: string, fcalEngine: Fcal): string {
  const value = evaluateExpression(source, fcalEngine);
  return value;
}

function evaluateExpression(source: string, fcalEngine: Fcal): string {
  if (source.trim().length === 0) {
    return empty;
  }

  try {
    source = source
      .trim()
      .replace(new RegExp(String.fromCharCode(160), "g"), " ");
    const result = fcalEngine.evaluate(source.trim()).toString();
    return result;
  } catch (error) {
    if (error instanceof FcalError) {
      console.log(Fcal.getTokensForExpression("234234 +  34234"));
      console.log(`Source: [${source.trim()}]`);
      console.trace();
      console.info(error.info());
    } else {
      console.error(error);
    }
    return empty;
  }
}
