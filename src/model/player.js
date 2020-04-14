(function (window) {
	'use strict';

	/**
	 * Creates a new Player instance with specified mark in it.
	 *
	 * @param {number} id
	 * @param {string} name
	 * @param {SQUARE_STATE} mark
	 * @param {number} score
	 * @constructor
	 */
	function Player(id, name, mark, score) {
		this.id = id;
		this.name = name;
		this.mark = mark;
		this.score = score;
	}

	/**
	 * Update the Player's score.
	 *
	 * @param {number} score Score to be added the current score.
	 */
	Player.prototype.updateScore = function (score) {
			this.score += score;
	};


	/**
	 * Make a move on the board that is specified in the parameters
	 *
	 * @param {number} row Horizontal move on the specified board.
	 * @param {number} column Vertical move on the specified board.
	 * @param {Board} board Board that the movement will be applied
	 * @param {function} callback The callback to fire after movement is done.
	 */
	Player.prototype.makeMove = function (row, column, board, callback) {
		callback = callback || function () { };

		if (row >= 0 && column >= 0 && board.squares.length > row && board.squares[0].length > y) {
			board.markSquare(row, column, this.mark)
		} else {
			throw new Error('Player: X or Y axis are out of boundaries of board!');
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.Model = window.app.Model || {};
	window.app.Model.Player = Player;
})(window);
