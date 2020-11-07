'use strict';
const __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : {default: mod};
};

Object.defineProperty(exports, '__esModule', {value: true});
exports.reRun = void 0;
const jquery_1 = __importDefault(require('jquery'));
const Fcal_1 = __importDefault(require('./Fcal'));
const constants_1 = require('./constants');
const fcal_1 = require('fcal');
const expressionEL = jquery_1.default('#expression');
const resultEL = jquery_1.default('#value');
const expressions = [
	'radius : 23 cm',
	'PI * radius ^ 2',
	'PI2 * radius',
	'log(23)',
	'23 % of 1023',
	'200 sec + 120 %',
	'20 minutes + 34 day in sec',
	'sin(PI)',
	'E',
	'speed = 20 kph',
	'speed in mps'
];
const defaultExpression = (() => {
	let value = '';
	for (const expression of expressions) {
		value = `${value}<div>${expression}</div><div></br></div>`;
	}

	return value;
})();
expressionEL.on('focusout', function () {
	const element = jquery_1.default(this);
	if (!element.text().trim().length) {
		element.empty();
	}
});
expressionEL.on('change keydown paste input', function () {
	const expr = jquery_1.default(this);
	const contents = expr.contents();
	localStorage.setItem(constants_1.localStorageKeyExpr, expr.html());
	main(contents);
});
expressionEL.on('keydown', event => {
	if (event.ctrlKey &&
        !(event.keyCode === 67 ||
            event.keyCode === 65 ||
            event.keyCode === 86 ||
            event.keyCode === 88 ||
            event.keyCode === 90 ||
            event.keyCode === 89)) {
		event.preventDefault();
	}
});
jquery_1.default(window).on('load', () => {
	let value = localStorage.getItem(constants_1.localStorageKeyExpr);
	if (!value) {
		value = defaultExpression;
	}

	expressionEL.html(value);
	main(expressionEL.contents());
});
function reRun() {
	const contents = expressionEL.contents();
	main(contents);
}

exports.reRun = reRun;
function main(values) {
	resultEL.empty();
	const fcalEngine = new Fcal_1.default();
	generate(values, fcalEngine);
}

function generate(values, fcalEngine) {
	for (const value of values) {
		if (value instanceof HTMLElement) {
			if (value.nodeName === 'DIV') {
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

function generateInDIV(values, fcalEngine) {
	for (const value of values) {
		if (value instanceof HTMLElement) {
			if (value.nodeName === 'DIV') {
				jumpInDIv(value, fcalEngine);
			} else if (value.nodeName === 'SPAN') {
				populateResult(getInnerText(value), fcalEngine);
			}
		} else if (value instanceof Text) {
			populateResult(value, fcalEngine);
		}
	}
}

function jumpInDIv(value, fcalEngine) {
	if (jquery_1.default(value).has('div').length > 0) {
		generateInDIV(jquery_1.default(value).contents(), fcalEngine);
	} else {
		populateResult(getInnerText(value), fcalEngine);
	}
}

function getInnerText(value) {
	return jquery_1.default(value).text();
}

function addExtraLine(value) {
	const count = Math.ceil(value.length / 41);
	for (let index = 2; index <= count; index++) {
		resultEL.append(resultView());
	}
}

function populateResult(value, fcalEngine) {
	let content = '';
	content = typeof value === 'string' ? value : value.textContent;
	if (content && content.trim().length > 0) {
		resultEL.append(evaluate(content.trim(), fcalEngine));
		addExtraLine(content);
	} else {
		resultEL.append(resultView());
	}
}

function resultView() {
	const p = document.createElement('p');
	p.style.marginTop = '0px';
	p.style.marginBottom = '0px';
	p.style.height = '19px';
	return p;
}

function evaluate(source, fcalEngine) {
	const p = resultView();
	if (source.trim().length === 0) {
		return p;
	}

	try {
		p.textContent = fcalEngine.evaluate(source).toString();
	} catch (error) {
		if (error instanceof fcal_1.FcalError) {
			console.info(error.info());
		} else {
			console.error(error);
		}
	}

	return p;
}
