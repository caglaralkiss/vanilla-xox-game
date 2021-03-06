(function (window) {

	/**
	 * Enumeration of game difficulty level.
	 *
	 * @readonly
	 * @enum {string}
	 */
	var GAME_LEVEL = {
		Easy: 'easy',
		Medium: 'medium',
		Hard: 'hard'
	};

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.GAME_LEVEL = GAME_LEVEL;
})(window);
