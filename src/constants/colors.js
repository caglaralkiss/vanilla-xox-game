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
		BOARD_LINE_COLOR: '#ddd',
		X_MARK_COLOR: '#ffa500',
		O_MARK_COLOR: '#007a7a'
	};

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.COLORS = COLORS
})(window);
