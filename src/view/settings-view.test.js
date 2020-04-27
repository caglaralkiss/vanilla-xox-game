require('../util/dom');
require('../constants/game-level');
require('../constants/game-mode');
require('./settings-view');

describe('SettingsView', function () {
	const GAME_MODE = window.app.Constants.GAME_MODE;
	const GAME_LEVEL = window.app.Constants.GAME_LEVEL;
	const SettingsView = window.app.View.SettingsView;

	function createMockInput(name, mode, difficulty) {
		const mockInput = { name, mode };

		return difficulty ? { ...mockInput, difficulty } : mockInput;
	}

	function setInputDataToView(view, inputMap) {
		view.setNameInput(inputMap.name);
		view.setModeInput(inputMap.mode);

		if (inputMap.difficulty) {
			view.setDifficultyInput(inputMap.difficulty);
		}
	}

	const parser = new DOMParser();
	const TEST_TEMPLATE =
		`<div id="root">
			<form>
				<div class="form__group">
					<input type="text" id="name">
				</div>
				<div class="form__group form__group--mode">
					<input type="radio" name="mode" value="computer">
					<input type="radio" name="mode" value="real">
				</div>
				<div class="form__group form__group--difficulty">
					<input type="radio" name="difficulty" value="easy">
					<input type="radio" name="difficulty" value="medium">
					<input type="radio" name="difficulty" value="hard">
				</div>
				<button id="play__button">Play</button>
			</form>
		</div>`;

	let TEST_DOC;

	beforeEach(function () {
		TEST_DOC = parser.parseFromString(TEST_TEMPLATE, 'text/html').body;
		document.body = TEST_DOC
	});

	it('should set name, mode and difficulty inputs', function () {
		const mockInput = createMockInput('Einstein', GAME_MODE.Computer, GAME_LEVEL.Medium);

		const settingsView = new SettingsView();
		setInputDataToView(settingsView, mockInput);

		expect(settingsView.getNameInput()).toEqual(mockInput.name);
		expect(settingsView.getModeInput()).toEqual(mockInput.mode);
		expect(settingsView.getDifficultyInput()).toEqual(mockInput.difficulty);
	});

	it('should reset name, mode and difficulty inputs', function () {
		const mockInput = createMockInput('Heisenberg', GAME_MODE.Computer, GAME_LEVEL.Medium);

		const settingsView = new SettingsView();
		setInputDataToView(settingsView, mockInput);

		settingsView.reset();
		expect(settingsView.getNameInput()).toBe('');
		expect(settingsView.getModeInput()).toBe(GAME_MODE.Computer);
		expect(settingsView.getDifficultyInput()).toBe(GAME_LEVEL.Easy);
	});

	it('should return form data after binding click event', function () {
		const mockInput = createMockInput('Bohr', GAME_MODE.Computer, GAME_LEVEL.Hard);

		const settingsView = new SettingsView();
		settingsView.bind('playClick', function (formData) {
			expect(formData).toEqual(mockInput);
		});
		setInputDataToView(settingsView, mockInput);
		settingsView.$playButton.click();
	});

	it('should arrange visibility of difficulty radio buttons', function () {
		const mockInput = createMockInput('Avicenna', GAME_MODE.Computer, GAME_LEVEL.Medium);

		const settingsView = new SettingsView();

		settingsView.bind('difficultyVisibility');
		setInputDataToView(settingsView, mockInput);

		const modeButtonsArr = Array.from(settingsView.$modeInput);
		const computerModeBtn = modeButtonsArr.find(modeBtn => modeBtn.value === GAME_MODE.Computer);
		const realModeBtn = modeButtonsArr.find(modeBtn => modeBtn.value === GAME_MODE.Real);

		computerModeBtn.click();
		expect(settingsView.$difficultyView.style.visibility).toBe('visible');
		realModeBtn.click();
		expect(settingsView.$difficultyView.style.visibility).toBe('hidden');
	})
});
