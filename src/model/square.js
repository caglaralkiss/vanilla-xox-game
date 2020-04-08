(function (window) {
	'use strict';

	/**
	 * Get possible states of Square from constants.
	 * @type {{X, EMPTY, O}}
	 */

	var SQUARE_STATE = window.app.Constants.SQUARE_STATE;

	/**
	 * Creates a new Square instance and hooks up.
	 *
	 * @constructor
	 * @param {SQUARE_STATE} [mark] mark Current mark state of square
	 */
	function Square(mark) {
		this.mark = mark || SQUARE_STATE.EMPTY;
	}

	/**
	 * Check if square is empty.
	 *
	 * @return {boolean}
	 */
	Square.prototype.isEmpty = function () {
		if (this.mark === SQUARE_STATE.EMPTY) {
			return true;
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.Model = window.app.Model || {};
	window.app.Model.Square = Square;
})(window);
