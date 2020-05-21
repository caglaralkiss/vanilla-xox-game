(function (window) {
	'use strict';

	var GAME_MODE = window.app.Constants.GAME_MODE;
	var GAME_LEVEL = window.app.Constants.GAME_LEVEL;

	/**
	 * View that abstracts away the Settings template.
	 *
	 * @constructor
	 */
	function SettingsView() {
		this.$nameInput = qs('#name');
		this.$modeInput = qsa('input[name="mode"]');
		this.$difficultyView = qs('.form__group--difficulty');
		this.$difficultyInput = qsa('input[name="difficulty"]');
		this.$playButton = qs('#play__button');

		this._bindModeEvent();
		this._bindDifficultyEvent();
	}

	/**
	 * @param {string} name
	 */
	SettingsView.prototype.setNameInput = function (name) {
		this.$nameInput.value = name;
	};

	/**
	 * @param {GAME_MODE} mode
	 */
	SettingsView.prototype.setModeInput = function (mode) {
		var i = 0;

		for (i; i < this.$modeInput.length; i++) {
			this.$modeInput[i].checked = mode === this.$modeInput[i].value;
		}
	};

	/**
	 *
	 * @param {GAME_LEVEL} difficulty
	 */
	SettingsView.prototype.setDifficultyInput = function (difficulty) {
		var i = 0;

		for (i; i < this.$difficultyInput.length; i++) {
			this.$difficultyInput[i].checked = difficulty === this.$difficultyInput[i].value;
		}
	};

	SettingsView.prototype.setDifficultyViewVisibility = function (visibility) {
		this.$difficultyView.style.visibility = visibility;
	}

	/**
	 * @return {string}
	 */
	SettingsView.prototype.getNameInput = function () {
		return this.$nameInput.value;
	};

	/**
	 * @return {GAME_MODE | null}
	 */
	SettingsView.prototype.getModeInput = function () {
		var i = 0;

		for (i; i < this.$modeInput.length; i++) {
			if (this.$modeInput[i].checked) {
				return this.$modeInput[i].value;
			}
		}

		return null;
	};

	/**
	 * @return {GAME_LEVEL | null}
	 */
	SettingsView.prototype.getDifficultyInput = function () {
		var i = 0;

		for (i; i < this.$difficultyInput.length; i++) {
			if (this.$difficultyInput[i].checked) {
				return this.$difficultyInput[i].value;
			}
		}

		return null;
	};

	/**
	 * Resets all inputs in original state.
	 */
	SettingsView.prototype.reset = function () {
		this.setNameInput('');
		this.setModeInput(GAME_MODE.Computer);
		this.setDifficultyInput(GAME_LEVEL.Easy);
		this.setDifficultyViewVisibility('visible');
	};

	/**
	 * Bind events with respect to the given commands.
	 *
	 * @param {function} [handler] handler
	 */
	SettingsView.prototype.onPlayClick = function (handler) {
		var self = this;

		$on(this.$playButton, 'click', function (e) {
			e.preventDefault();

			var isValid = self._checkFormValidity();

			if (isValid) {
				handler(self.getFormData());
			} else {
				if (!self.getFormData().name) {
					alert('You should set a name before play TicTacToe!');
				}
			}
		})
	};

	/**
	 * @return {{mode: GAME_MODE, difficulty: GAME_LEVEL, name: string}|{mode: GAME_MODE, name: string}}
	 */
	SettingsView.prototype.getFormData = function () {
		if (this.getModeInput() === GAME_MODE.Computer) {
			return {
				mode: this.getModeInput(),
				name: this.getNameInput(),
				difficulty: this.getDifficultyInput(),
			}
		} else {
			return {
				mode: this.getModeInput(),
				name: this.getNameInput(),
			}
		}
	};

	/**
	 * Binds click event to the mode input.
	 * Difficulty radio inputs disappear when 'Real' mode is selected
	 *
	 * @private
	 */
	SettingsView.prototype._bindModeEvent = function () {
		var i = 0;
		var self = this;

		for (i; i < this.$modeInput.length; i++) {
			$on(this.$modeInput[i], 'click', function () {

				self._synchronizeModeCheckedAttr();

				if (self.getModeInput() === GAME_MODE.Computer) {
					self.setDifficultyViewVisibility('visible');
				} else {
					self.setDifficultyViewVisibility('hidden');
				}
			})
		}
	};

	SettingsView.prototype._bindDifficultyEvent = function () {
		var i = 0;
		var self = this;

		for (i; i < this.$difficultyInput.length; i++) {
			$on(this.$difficultyInput[i], 'click', function () {
				self._synchronizeDifficultyCheckedAttr();
			})
		}
	}

	SettingsView.prototype._synchronizeModeCheckedAttr = function () {
		if (this.getModeInput() === GAME_MODE.Computer) {
			this.$modeInput[0].setAttribute('checked', 'checked');
			this.$modeInput[1].removeAttribute('checked');
		} else {
			this.$modeInput[0].removeAttribute('checked');
			this.$modeInput[1].setAttribute('checked', 'checked');
		}
	}

	SettingsView.prototype._synchronizeDifficultyCheckedAttr = function () {
		var difficulty = this.getDifficultyInput();
		if (difficulty === GAME_LEVEL.Easy) {
			this.$difficultyInput[0].setAttribute('checked', 'checked');
			this.$difficultyInput[1].removeAttribute('checked');
			this.$difficultyInput[2].removeAttribute('checked');
		} else if (difficulty === GAME_LEVEL.Medium) {
			this.$difficultyInput[0].removeAttribute('checked');
			this.$difficultyInput[1].setAttribute('checked', 'checked');
			this.$difficultyInput[2].removeAttribute('checked');
		} else {
			this.$difficultyInput[0].removeAttribute('checked');
			this.$difficultyInput[1].removeAttribute('checked');
			this.$difficultyInput[2].setAttribute('checked', 'checked');
		}
	}

	/**
	 * Checks validity of name input.
	 *
	 * @return {boolean}
	 * @private
	 */
	SettingsView.prototype._isNameValid = function () {
		if (this.getNameInput()) {
			return this.getNameInput().length > 0 || this.getNameInput().length < 30;
		}

		return false;
	};

	/**
	 * Checks validity of difficulty input.
	 *
	 * @return {boolean}
	 * @private
	 */
	SettingsView.prototype._isDifficultyValid = function () {
		return this.getDifficultyInput() === GAME_LEVEL.Easy
			|| this.getDifficultyInput() === GAME_LEVEL.Medium
			|| this.getDifficultyInput() === GAME_LEVEL.Hard;
	};

	/**
	 * Check validity of mode input.
	 *
	 * @return {boolean}
	 * @private
	 */
	SettingsView.prototype._isModeValid = function () {
		return this.getModeInput() === GAME_MODE.Computer || this.getModeInput() === GAME_MODE.Real;
	};

	/**
	 * Checks validity of all inputs with respect to selected mode.
	 *
	 * @return {boolean}
	 * @private
	 */
	SettingsView.prototype._checkFormValidity = function () {
		if (this._isModeValid()) {
			if (this.getModeInput() === GAME_MODE.Computer) {
				return this._isNameValid() && this._isDifficultyValid();
			} else {
				return this._isNameValid();
			}
		}

		return false;
	};

	window.app = window.app || {};
	window.app.View = window.app.View || {};
	window.app.View.SettingsView = SettingsView;
})(window);
