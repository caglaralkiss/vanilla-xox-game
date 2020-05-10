/**
 * Singleton client class for Websocket.
 *
 * @classdesc WsClient singleton
 * @class
 * @hideconstructor
 */
var WsClient = (function () {
    'use strict';

    // Environment enum
    var Environment = window.app.Constants.Environment;

    // Websocket urls for different environments
    var WsUrl = window.app.Constants.WsUrl;

    // Curr environment injected to window at build phase
    var CURR_ENVIRONMENT = window.CURR_ENVIRONMENT;

    // WS-URL based on current environment.
    var WEBSOCKET_SERVER_URL = CURR_ENVIRONMENT === Environment.DEVELOPMENT ?
        WsUrl.DEVELOPMENT : WsUrl.PRODUCTION;

    var instance = null;

    function WsClient() {
        this.ws = null;
    }

    /**
     * Create a new WS connection with websocket server.
     *
     * @param {string} name Username of the player.
     */
    WsClient.prototype.connect = function (name) {
        this.ws = new WebSocket(WEBSOCKET_SERVER_URL + name);
    }

    /**
     * Disconnect from current ws connection.
     */
    WsClient.prototype.disconnect = function () {
        this.ws.close();
        this.ws = null;
    }

    /**
     * Bind the onMessage handler to current Ws connection.
     *
     * @param {function} messageHandler
     */
    WsClient.prototype.onMessage = function (messageHandler) {
        this.ws.onmessage = messageHandler;
    }

    /**
     * Bind the onOpen handler to current Ws connection.
     *
     * @param {function} openConnectionHandler
     */
    WsClient.prototype.onOpen = function (openConnectionHandler) {
        this.ws.onopen = openConnectionHandler;
    }

    /**
     * Bind the onClose handler to current Ws connection.
     *
     * @param {function} onCloseHandler
     */
    WsClient.prototype.onClose = function (onCloseHandler) {
        this.ws.onclose = onCloseHandler;
    }

    /**
     * Send a serialized message to the ws server.
     *
     * @param {object} message
     */
    WsClient.prototype.sendMessage = function (message) {
        this.ws.send(JSON.stringify(message));
    }

    /**
     * Return the state of current ws connection.
     *
     * @return {number} readyState
     */
    WsClient.prototype.readyState = function () {
        return this.ws.readyState;
    }

    return {
        getInstance: function () {
            if (instance === null) {
                instance = new WsClient();
                delete instance.constructor;
            }

            return instance;
        }
    }
})();

