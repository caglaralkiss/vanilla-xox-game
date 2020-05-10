(function (window) {
    'use strict';

    var WsUrl = {
    	DEVELOPMENT: 'ws://localhost:8080/tictactoe-game/',
	    PRODUCTION: 'ws://[prodUrl]:[prodPort]/tictactoe-game/'
    }

    window.app = window.app || {};
    window.app.Constants = window.app.Constants || {};
    window.app.Constants.WsUrl = WsUrl;
})(window);
