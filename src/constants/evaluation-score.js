(function (window) {

	/**
	 * Score of maximizer, minimizer and tie.
	 *
	 * @readonly
	 * @enum {number}
	 */
	var EVALUATION_SCORE = {
		X: 10,
		O: -10,
		TIE: 0,
	};

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.EVALUATION_SCORE = EVALUATION_SCORE;
})(window);
