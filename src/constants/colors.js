(function (window) {

	/**
	 * Enumeration of the color in different formats.
	 *
	 * @readonly
	 * @enum {string}
	 */
	var COLORS = {
		WHITE: '#fff',
		BLACK: '#000',
		BOARD_LINE_COLOR: 'aliceblue',
		X_MARK_COLOR: '#F15946',
		O_MARK_COLOR: '#F9C22E'
	};

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.COLORS = COLORS
})(window);
