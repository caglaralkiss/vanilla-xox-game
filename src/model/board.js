(function (window) {
	'use strict';

	var Square = app.Model.Square;
	var SQUARE_STATE = app.Constants.SQUARE_STATE;

	/**
	 * Creates a new Board instance and hooks up.
	 *
	 * @param {Square[][]} [squares] squares Holds board state
	 * @constructor
	 */
	function Board(squares) {
		if (squares) {
			this.squares = squares;
		} else {
			this.initializeBoard();
		}
	}

	/**
	 * Fill squares property with empty squares
	 * @param {function} [callback] The callback to fire after board initialized.
	 */
	Board.prototype.initializeBoard = function (callback) {
		callback = callback || function () { };

		this.squares = [
			[new Square(), new Square(), new Square()],
			[new Square(), new Square(), new Square()],
			[new Square(), new Square(), new Square()]
		];
	};

	Board.prototype.markSquare = function (x, y, mark, callback) {
		callback = callback || function () { };

		this.squares[x][y].mark = mark;
	};

	/**
	 * Decide whether there is empty square in the board.
	 *
	 * @return {boolean}
	 */
	Board.prototype.isFilled = function () {
		for (var i = 0; i < this.squares.length; i++) {
			for (var j = 0; j < this.squares[0].length; j++) {
				if (this.squares[i][j].mark === SQUARE_STATE.EMPTY) {
					return false;
				}
			}
		}

		return true;
	};

	/**
	 * Check the winner of the board based on current state of squares.
	 * If there is no winner, return empty mark
	 *
	 * @return {SQUARE_STATE|string}
	 */
	Board.prototype.checkWinner = function () {
		var diagonalWinner = this._diagonalWinnerCheck();

		if (diagonalWinner !== SQUARE_STATE.EMPTY) {
			return diagonalWinner
		}

		var vectorWinner, i;

		for (i = 0; i < this.squares.length; i++) {
			vectorWinner = this._vectorWinnerCheck(i);

			if (vectorWinner !== SQUARE_STATE.EMPTY) {
				return vectorWinner;
			}
		}

		return SQUARE_STATE.EMPTY;
	};

	/**
	 * Check whether there is a 'X' or 'O' mark on columns or rows. If there is no 'X' or 'O' mark on cols/rows,
	 * return empty mark.
	 *
	 * @param index
	 * @return {SQUARE_STATE|string}
	 * @private
	 */
	Board.prototype._vectorWinnerCheck = function (index) {
		var row0 = this.squares[index][0].mark;
		var row1 = this.squares[index][1].mark;
		var row2 = this.squares[index][2].mark;

		var col0 = this.squares[0][index].mark;
		var col1 = this.squares[1][index].mark;
		var col2 = this.squares[2][index].mark;

		if (row0 === row1 && row1 === row2) {
			if (row0 === SQUARE_STATE.X) {
				return SQUARE_STATE.X;
			} else if (row0 === SQUARE_STATE.O) {
				return SQUARE_STATE.O;
			}
			return SQUARE_STATE.EMPTY;
		} else if (col0 === col1 && col1 === col2) {
			if (col0 === SQUARE_STATE.X) {
				return SQUARE_STATE.X;
			} else if (col0 === SQUARE_STATE.O) {
				return SQUARE_STATE.O;
			}
			return SQUARE_STATE.EMPTY;
		} else {
			return SQUARE_STATE.EMPTY;
		}
	};

	/**
	 * Check whether there is a 'X' or 'O' mark on a diagonal line. If there is no 'X' o 'O' mark, return empty mark.
	 *
	 * @return {SQUARE_STATE|string}
	 * @private
	 */
	Board.prototype._diagonalWinnerCheck = function () {
		if (this.squares[0][0].mark === this.squares[1][1].mark && this.squares[1][1].mark === this.squares[2][2].mark) {
			if (this.squares[0][0].mark === SQUARE_STATE.X) {
				return SQUARE_STATE.X;
			} else if (this.squares[0][0].mark === SQUARE_STATE.O) {
				return SQUARE_STATE.O;
			}
			return SQUARE_STATE.EMPTY
		} else if (this.squares[0][2].mark === this.squares[1][1].mark && this.squares[1][1].mark === this.squares[2][0].mark) {
			if (this.squares[0][2].mark === SQUARE_STATE.X) {
				return SQUARE_STATE.X;
			} else if (this.squares[0][2].mark === SQUARE_STATE.O) {
				return SQUARE_STATE.O;
			}
			return SQUARE_STATE.EMPTY;
		} else {
			return SQUARE_STATE.EMPTY;
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.Model = window.app.Model || {};
	window.app.Model.Board = Board;
})(window);
