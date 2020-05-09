require('../src/util/dom');

describe('DOM', function () {
	const parser = new DOMParser();
	const TEST_TEMPLATE =
		`<div id="root">
			<div class="counter">0</div>
			<div class="counter">0</div>
			<div class="counter">0</div>
			<button id="increment">Increment</button>
			<button id="decrement">Decrement</button>
		</div>`;

	let TEST_DOC_BODY;

	beforeEach(function () {
		TEST_DOC_BODY = parser.parseFromString(TEST_TEMPLATE, 'text/html').body;
	});

	it('should select a DOM element in a given scope', function () {
		const rootElement = qs('#root', TEST_DOC_BODY);
		expect(rootElement.childElementCount).toEqual(5);

		const counterElements = qsa('.counter', TEST_DOC_BODY);
		expect(counterElements.length).toEqual(3);
	});

	it('should bind events to provided elements', function () {
		const incrementBtn = qs('#increment', TEST_DOC_BODY);
		const decrementBtn = qs('#decrement', TEST_DOC_BODY);
		const counterElements = qsa('.counter', TEST_DOC_BODY);

		$on(incrementBtn, 'click', function () {
			counterElements.forEach(element => {
				const currentNum = Number(element.textContent);
				element.textContent = currentNum + 1 + '';
			})
		});

		$on(decrementBtn, 'click', function () {
			counterElements.forEach(element => {
				const currentNum = Number(element.textContent);
				element.textContent = currentNum - 1 + '';
			})
		});

		incrementBtn.click();
		incrementBtn.click();
		counterElements.forEach(el => expect(el.textContent).toEqual('2'));

		decrementBtn.click();
		counterElements.forEach(el => expect(el.textContent).toEqual('1'));
	})
});
