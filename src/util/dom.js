(function (window) {

	/**
	 * Find the first Element in a given scope or document.
	 *
	 * @param {string} selector Refer the selector of the query.
	 * @param scope
	 * @return {Element}
	 */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};

	/**
	 * Find all element in a given scope or document.
	 *
	 * @param selector
	 * @param scope
	 * @return {NodeListOf<Element>}
	 */
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * Bind an event listener to a target with given callback function.
	 *
	 * @param {Element} target Target element
	 * @param {string} type Event type
	 * @param {function} callback
	 * @param useCapture
	 */
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/**
	 * Calculate the width of the browser.
	 *
	 * @return {number} width
	 */
	window.getBrowserWidth = function () {
		return window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;
	};

	/**
	 * Calculate the height of the browser
	 *
	 * @return {number} height
	 */
	window.getBrowserHeight = function () {
		return window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
	}
})(window);
