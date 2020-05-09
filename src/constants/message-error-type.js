(function (window) {
	'use strict';

	/**
	 * Error type of message that is received from WS server.
	 *
	 * @readonly
	 * @enum {string}
	 */
	var MESSAGE_ERROR_TYPE = {
		ParticipantLeft: "PARTICIPANT_LEFT",
		InvalidMove: "INVALID_MOVE",
		NotYourTurn: "NOT_YOUR_TURN",
	}

	window.app = window.app || {};
	window.app.Constants = window.app.Constants || {};
	window.app.Constants.MESSAGE_ERROR_TYPE = MESSAGE_ERROR_TYPE;

})(window);
