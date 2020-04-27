require('../util/dom');
require('./main-view');

describe('MainView', function () {
	const parser = new DOMParser();
	const MainView = window.app.View.MainView;

	let MOCK_TEMPLATE =
		`<div id="root">
			<div id="play">
				Play View
			</div>
			<div id="settings">
				Settings View
			</div>
			<div id="loading-spinner">
				Loading View
			</div>
		</div>`;

	let MOCK_BODY;

	beforeEach(function () {
		MOCK_BODY = parser.parseFromString(MOCK_TEMPLATE, 'text/html').body;
		document.body = MOCK_BODY;
	});

	it('should display only Settings when demanded', function () {
		const mainView = new MainView();

		mainView.displaySettings();
		expect(mainView.$settings.style.display).toBe('block');
		expect(mainView.$loadingSpinner.style.display).toBe('none');
		expect(mainView.$play.style.display).toBe('none');
	});


	it('should display only Play when demanded', function () {
		const mainView = new MainView();

		mainView.displayPlay();
		expect(mainView.$settings.style.display).toBe('none');
		expect(mainView.$loadingSpinner.style.display).toBe('none');
		expect(mainView.$play.style.display).toBe('block');
	});


	it('should display only Loading when demanded', function () {
		const mainView = new MainView();

		mainView.displayLoadingSpinner();
		expect(mainView.$settings.style.display).toBe('none');
		expect(mainView.$loadingSpinner.style.display).toBe('block');
		expect(mainView.$play.style.display).toBe('none');
	});
});
