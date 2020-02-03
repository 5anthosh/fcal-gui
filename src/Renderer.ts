import $ from "jquery";
import { Fcal } from "fcal";

const localStorageKey = "fcal-playground";
let defaultExpression =
  "radius : 23\nPI * radius ^ 2 \nPI2 * radius \n\nlog(23) \n \n23 % of 1023 \n \
        \n200 sec + 120 % \n \n20 minutes + 34 day in sec \n \nsin(PI) \n \nE \n \nspeed = 20 kph \n \nspeed in mps";
let expression = "0";

$("#expression").on("change keydown paste input", function() {
  const expr = $(this);
  let exprVal = expr.val();
  if (exprVal === undefined) {
    expression = expr.text();
    exprVal = expression;
  }

  if (typeof exprVal === "string") {
    expression = exprVal;
  }
  localStorage.setItem(localStorageKey, expression);
  main(expression);
});


$(window).on("load", function() {
  var value = localStorage.getItem(localStorageKey);
  if (!value) {
    value = defaultExpression;
  }
  expression = value;
  $("#expression").text(value);
  main(value);
});

function main(input: string) {
  const values = input.split("\n");
  var fcalEngine = new Fcal();
  var result = $("#value");
  result.empty();
  for (const value of values) {
    result.append(evaluate(value, fcalEngine));
    const count = Math.ceil(value.length / 30);
    for (let index1 = 2; index1 <= count; index1++) {
      result.append(resultView());
    }
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
    p.style.color = "green";
    p.textContent = "# " + fcalEngine.evaluate(source);
  } catch (error) {
    p.style.color = "red";
    p.textContent = "x " + error.message;
  }
  return p;
}
