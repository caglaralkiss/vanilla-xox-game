(function (window) {

	/**
	 * Enum for possible mark of the square.
	 *
	 * @readonly
	 * @enum {string}
	 */
	var SQUARE_STATE = {
		X: 'X',
		O: 'O',
		EMPTY: '_'
	};

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.SQUARE_STATE = SQUARE_STATE;
})(window);
