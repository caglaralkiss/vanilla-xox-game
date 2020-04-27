(function (window) {

	/**
	 * Enumeration of game mode.
	 *
	 * @readonly
	 * @enum {string}
	 */
	var GAME_MODE = {
		Computer: 'computer',
		Real: 'real'
	};

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.GAME_MODE = GAME_MODE;
})(window);
