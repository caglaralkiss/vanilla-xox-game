require('../constants/evaluation-score');
require('../constants/square-state');
require('../constants/game-level');
require('../model/square');
require('../model/board');
require('./ai');

describe('AI', function () {
	const { SQUARE_STATE, EVALUATION_SCORE, GAME_LEVEL } = window.app.Constants;
	const { Board, Square } = window.app.Model;

	const { evaluate, findOptimalMove } = window.app.Util.AI;

	const MOCKS = {
		xWinBoard: new Board([
			[new Square(SQUARE_STATE.EMPTY), new Square(SQUARE_STATE.O), new Square(SQUARE_STATE.O)],
			[new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.X)],
			[new Square(SQUARE_STATE.EMPTY), new Square(SQUARE_STATE.EMPTY), new Square(SQUARE_STATE.EMPTY)]
		]),
		oWinBoard: new Board([
			[new Square(SQUARE_STATE.O), new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.O)],
			[new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.O), new Square(SQUARE_STATE.X)],
			[new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.EMPTY), new Square(SQUARE_STATE.O)]
		]),
		tieBoard: new Board([
			[new Square(SQUARE_STATE.O), new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.O)],
			[new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.O), new Square(SQUARE_STATE.X)],
			[new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.EMPTY)]
		]),
		possibleMoves: function () {
			var unfinishedBoard =  new Board([
				[new Square(SQUARE_STATE.EMPTY), new Square(SQUARE_STATE.EMPTY), new Square(SQUARE_STATE.O)],
				[new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.X), new Square(SQUARE_STATE.O)],
				[new Square(SQUARE_STATE.O), new Square(SQUARE_STATE.EMPTY), new Square(SQUARE_STATE.X)]
			]);

			return {
				board: unfinishedBoard,
				hard: {
					moveVal: 10,
					row: 0,
					column: 0
				},
				medium: {
					moveVal: 8,
					row: 0,
					column: 1
				},
				easy: {
					moveVal: 8,
					row: 2,
					column: 1
				}
			}
		}
	};

	test('should evaluate board correctly', function () {
		const { xWinBoard, oWinBoard, tieBoard } = MOCKS;

		expect(evaluate(xWinBoard)).toBe(EVALUATION_SCORE.X);
		expect(evaluate(oWinBoard)).toBe(EVALUATION_SCORE.O);
		expect(evaluate(tieBoard)).toBe(EVALUATION_SCORE.TIE);
	});

	test('should find optimal move on board for different diff. level', function () {
		const possibleMoves = MOCKS.possibleMoves();

		expect(findOptimalMove(possibleMoves.board, SQUARE_STATE.X, GAME_LEVEL.Hard)).toEqual(possibleMoves.hard);
		expect(findOptimalMove(possibleMoves.board, SQUARE_STATE.X, GAME_LEVEL.Medium)).toEqual(possibleMoves.medium);
		expect(findOptimalMove(possibleMoves.board, SQUARE_STATE.X, GAME_LEVEL.Easy)).toEqual(possibleMoves.easy);
	});
});
