(function (window) {
    'use strict';

	/**
	 * Message types that is received from WS server.
	 *
	 * @readonly
	 * @enum {string}
	 */
	var MESSAGE_TYPE = {
    	GameStart: "GAME_START",
	    GameMove: "GAME_MOVE",
	    GameResult: "GAME_RESULT",
	    GameError: "GAME_ERROR"
    }

    window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.MESSAGE_TYPE = MESSAGE_TYPE;

})(window);
