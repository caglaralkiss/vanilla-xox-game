(function (window) {
	'use strict';

	var Player = window.app.Model.Player;
	var AI = window.app.Util.AI;

	/**
	 * @augments Player
	 * @constructor
	 */
	function AIPlayer(id, name, mark, score, gameLevel) {
		Player.call(this, id, name, mark, score);

		// Difficulty level of game.
		this.gameLevel = gameLevel;
	}

	AIPlayer.prototype = Object.create(Player.prototype);
	AIPlayer.prototype.constructor = AIPlayer;

	/**
	 * Find best possible move from board current state.
	 *
	 * @param {Board} board
	 * @return {*}
	 */
	AIPlayer.prototype.findBestMove = function (board) {
		return AI.findOptimalMove(board, this.mark, this.gameLevel);
	};

	window.app = window.app || {};
	window.app.Model = window.app.Model || {};
	window.app.Model.AIPlayer = AIPlayer;
})(window);
