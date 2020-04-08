(function (window) {
	'use strict';

	var SQUARE_STATE = window.app.Constants.SQUARE_STATE;
	var EVALUATION_SCORE = window.app.Constants.EVALUATION_SCORE;
	var GAME_LEVEL = window.app.Constants.GAME_LEVEL;

	/**
	 *
	 * @param {Board} board
	 */
	function evaluate(board) {
		var mark = board.checkWinner();

		if (mark === SQUARE_STATE.X) {
			return EVALUATION_SCORE.X;
		} else if (mark === SQUARE_STATE.O) {
			return EVALUATION_SCORE.O;
		} else {
			return EVALUATION_SCORE.TIE;
		}
	}

	/**
	 *
	 * @param {Board} board Current state of the board.
	 * @param {number} depth Depth of the movement node in state tree.
	 * @param {boolean} isMax Player is maximizer or minimizer.
	 */
	function minimax(board, depth, isMax) {
		var score = evaluate(board);

		if (score === EVALUATION_SCORE.X) {
			return score - depth;
		}

		if (score === EVALUATION_SCORE.O) {
			return score + depth;
		}

		if (board.isFilled()) {
			return 0;
		}

		var bestScore;

		if (isMax) {
			 bestScore = Number.NEGATIVE_INFINITY;
			 var i, j;

			for (i = 0; i < board.squares.length; i++) {
				for (j = 0; j < board.squares.length; j++) {
					if (board.squares[i][j].isEmpty()) {
						board.markSquare(i, j, SQUARE_STATE.X);

						bestScore = Math.max(bestScore, minimax(board, depth + 1, !isMax));

						board.markSquare(i, j, SQUARE_STATE.EMPTY);
					}
 				}
			}

			return bestScore;
		} else {
			bestScore = Number.POSITIVE_INFINITY;

			for (i = 0; i < board.squares.length; i++) {
				for (j = 0; j < board.squares.length; j++) {
					if (board.squares[i][j].isEmpty()) {
						board.markSquare(i, j, SQUARE_STATE.O);

						bestScore = Math.min(bestScore, minimax(board, depth + 1, !isMax));

						board.markSquare(i, j, SQUARE_STATE.EMPTY);
					}
				}
			}

			return bestScore;
		}
	}


	/**
	 * Find the optimal movement from current state of the board.
	 *
	 * @param {Board} board
	 * @param {SQUARE_STATE} mark
	 * @param {GAME_LEVEL} difficulty
	 * @return {*} move Best movement that is evaluated from all possible moves.
	 */
	function findOptimalMove(board, mark, difficulty) {
		var isMax = mark === SQUARE_STATE.X;

		var compareFn = isMax ?
			function (a, b) { return b.moveVal - a.moveVal } : function (a, b) { return a.moveVal - b.moveVal };

		// Best move that is going to be evaluated.
		var moves = [];

		for (var i = 0; i < board.squares.length; i++) {
			for (var j = 0; j < board.squares.length; j++) {
				if (board.squares[i][j].isEmpty()) {
					board.markSquare(i, j, mark);

					var moveVal = minimax(board, 0, !isMax);

					board.markSquare(i, j, SQUARE_STATE.EMPTY);

					moves.push({
						moveVal: moveVal,
						x: i,
						y: j
					})
				}
			}
		}

		var optimalMoves = moves.sort(compareFn);

		if (difficulty === GAME_LEVEL.Easy) {
			return optimalMoves[optimalMoves.length - 1];
		} else if (difficulty === GAME_LEVEL.Medium) {
			return optimalMoves[Math.floor(optimalMoves.length / 2)]
		} else {
			return optimalMoves[0]
		}
	}

	// Export to window
	window.app = window.app || {};
	window.app.Util = window.app.Util || {};
	window.app.Util.AI = {
		EVALUATION_SCORE: EVALUATION_SCORE,
		evaluate: evaluate,
		minimax: minimax,
		findOptimalMove: findOptimalMove
	};
})(window);
