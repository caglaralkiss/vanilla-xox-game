(function (window) {
    'use strict';

	/**
	 * Model of the project.
	 *
	 * @constructor
	 */
	function Model() {
        this.player = null;
        this.opponent = null;
        this.board = null;
        this.mode = null;
        this.turn = null;
    }

    Model.prototype = {
	    /**
	     * @param {Player} player New player state.
	     */
        updatePlayer: function (player) {
	        this.player = player;
        },
	    /**
	     * @param {Player} opponent New opponent state.
	     */
	    updateOpponent: function (opponent) {
		    this.opponent = opponent;
	    },
	    /**
	     * @param {GAME_MODE} newMode New mode flag.
	     */
	    updateMode: function (newMode) {
		    this.mode = newMode;
	    },
	    /**
	     * @param {Board} board New Board object.
	     */
	    updateBoard: function (board) {
			this.board = board;
	    },
	    /**
	     * @param {SQUARE_STATE} turn
	     */
	    updateTurn: function (turn) {
			this.turn = turn;
	    }
    };

    window.app = window.app || {};
    window.app.Model = window.app.Model || {};
    window.app.Model.Model = Model;
})(window);
