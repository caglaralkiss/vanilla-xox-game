(function (window) {
    'use strict';

	/**
	 * Enum of environment.
	 * Environment will be injected on build phase to window.CURR_ENVIRONMENT.
	 *
	 * @readonly
	 * @enum {string}
	 */
	var Environment = {
    	PRODUCTION: "PRODUCTION",
	    DEVELOPMENT: "DEVELOPMENT"
    }

    window.app = {};
    window.app.Constants = window.app.Constants || {};
    window.app.Constants.Environment = Environment;
})(window);
