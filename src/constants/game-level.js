(function (window) {

	/**
	 * Enumeration of game difficulty level.
	 *
	 * @readonly
	 * @enum {number}
	 */
	var GAME_LEVEL = {
		Easy: 0,
		Medium: 1,
		Hard: 2
	};

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.GAME_LEVEL = GAME_LEVEL;
})(window);
