(function (window) {
	'use strict';

	// Enums
	var GAME_MODE = window.app.Constants.GAME_MODE;
	var SQUARE_STATE = window.app.Constants.SQUARE_STATE;
	var MESSAGE_TYPE = window.app.Constants.MESSAGE_TYPE;
	var MESSAGE_ERROR_TYPE = window.app.Constants.MESSAGE_ERROR_TYPE;

	// Model constructors.
	var Player = window.app.Model.Player;
	var AIPlayer = window.app.Model.AIPlayer;
	var Board = window.app.Model.Board;

	// Player/Opponent view constructor.
	var PlayerView = window.app.View.PlayerView;

	/**
	 * Constructs the Controller object. Binds all events to referral views.
	 *
	 * @param {Model} model
	 * @param {View} view
	 * @constructor
	 */
	function Controller(model, view) {
		this.model = model;
		this.view = view;
		this.wsClient = WsClient.getInstance();

		this.view.bind('settingsSubmit', this.settingsHandler.bind(this));
		this.view.bind('canvasClick', this.clickHandler.bind(this));
		this.view.bind('opponentClick', this.clickHandler.bind(this));
		this.view.bind('leaveGameClick', this.leaveGameHandler.bind(this));

		this.view.render('setFragment', 'settings');
	}

	/**
	 * Handler function of 'settingsSubmit'.
	 *
	 * @param {object} formData Data returned after settings submission.
	 */
	Controller.prototype.settingsHandler = function (formData) {
		var self = this;

		this.model.updateMode(formData.mode);

		if (formData.mode === GAME_MODE.Computer) {
			var player = new Player(0, formData.name, SQUARE_STATE.X, 0);
			var opponent = new AIPlayer(1, 'Computer', SQUARE_STATE.O, 0, formData.difficulty);

			this._initializeNewGame(player, opponent);
		} else {
			this.view.render('setFragment', 'loading');

			this.wsClient.connect(formData.name);
			this.wsClient.onMessage(this.wsMessageHandler.bind(this));
			this.wsClient.onClose(this.wsCloseHandler.bind(this));

			var waitingTime = 30000;

			setTimeout(function () {
				if (self.model.player === null) {
					alert('It seems there is no active player! Try again!')
					self.leaveGameHandler();
				}
			}, waitingTime);
		}
	};

	/**
	 * Handler function of 'leaveGameClick' event.
	 */
	Controller.prototype.leaveGameHandler = function () {
		if (this.model.mode === GAME_MODE.Real) {
			this.wsClient.disconnect();
		}

		this._resetGame();
		this.view.render('setFragment', 'settings')
	}

	/**
	 * WsClient close handler.
	 */
	Controller.prototype.wsCloseHandler = function () {
		// It is a guard to force mobile users to reset game when phone is locked.
		if (this.model.mode) {
			this._resetGame();
			this.view.render('setFragment', 'settings');
		}
	}

	/**
	 * Handler function of 'canvasClick' or 'opponentClick' events.
	 *
	 * @param {{row: number, column: number}} position Clicked position.
	 * @param {boolean} isOpponent Whether the clicker was opponent.
	 */
	Controller.prototype.clickHandler = function (position, isOpponent) {
		var row = position.row;
		var column = position.column;

		if (this.model.mode === GAME_MODE.Computer) {
			this.computerModeHandler(row, column, isOpponent);
		} else {
			this.realModeHandler(row, column);
		}
	};

	/**
	 * Function of websocket 'onMessage' event.
	 *
	 * @param {object} event
	 */
	Controller.prototype.wsMessageHandler = function (event) {
		var message = JSON.parse(event.data);

		// @TODO refactor this switch. Create new methods from each message type.
		switch (message.messageType) {
			case MESSAGE_TYPE.GameStart:
				var playerData = message.player;
				var opponentData = message.opponent;

				var player = new Player(playerData.id, playerData.name, playerData.mark, playerData.score);
				var opponent = new Player(opponentData.id, opponentData.name, opponentData.mark, opponentData.score);

				this._initializeNewGame(player, opponent, message.turn)
				break;
			case MESSAGE_TYPE.GameMove:
				var mark = this.model.turn;
				this.view.canvasView.addMark(mark, message.move.row, message.move.column, true);
				this.model.updateTurn(message.turn);
				break;
			case MESSAGE_TYPE.GameResult:
				if (message.winner === SQUARE_STATE.EMPTY) {
					this._declareDraw()
				} else {
					var winnerPlayer = message.winner === this.model.player.mark ?
						message.player : message.opponent;

					this._declareWinner(winnerPlayer);
				}

				this.view.canvasView.clearBoard();
				this.model.updateTurn(message.turn);
				break;
			case MESSAGE_TYPE.GameError:
				debugger
				if (message.error === MESSAGE_ERROR_TYPE.ParticipantLeft) {
					alert("Your opponent has left! You will be returned to home page...");
					this.leaveGameHandler();
				} else if (message.error === MESSAGE_ERROR_TYPE.InvalidMove) {
					alert("You cant mark an already marked square!");
				} else if (message.error === MESSAGE_ERROR_TYPE.NotYourTurn){
					alert("Not your turn! Wait until opponent make a move")
				} else {
					alert("Undefined error!")
				}
				break;
			default:
				break;
		}
	}

	/**
	 * Define a handler function for 'canvasClick' when the mode is 'Computer'.
	 *
	 * @param {number} row Row of the clicked area on the board.
	 * @param {number} column Column of the clicked area on the board
	 * @param {boolean} isOpponent Define whether the clicker is opponent.
	 */
	Controller.prototype.computerModeHandler = function (row, column, isOpponent) {
		var self = this;

		if (this.model.board.squares[row][column].isEmpty()) {
			var player = isOpponent ? this.model.opponent : this.model.player;

			this.view.canvasView.addMark(player.mark, row, column, true);
			player.makeMove(row, column, this.model.board);

			var winner = this.model.board.checkWinner();

			// Delay this since canvas is not fast enough somehow to draw marks.
			// @TODO check this implementation to see root cause
			setTimeout(function () {
				if (winner !== SQUARE_STATE.EMPTY) {
					var winnerPlayer = self._findWinnerPlayer(winner);
					self._declareWinner(winnerPlayer);
				} else if (self.model.board.isFilled()) {
					self._declareDraw();
				} else {
					if (!isOpponent) {
						var bestMove = self.model.opponent.findBestMove(self.model.board);
						self.view.canvasView.dispatchOpponentClick(bestMove.row, bestMove.column);
					}
				}
			}, 500);
		}
	}

	/**
	 * Define a handler function for 'canvasClick' when the mode is 'Real'.
	 *
	 * @param {number} row Row of the clicked area on the board.
	 * @param {number} column Column of the clicked area on the board.
	 */
	Controller.prototype.realModeHandler = function (row, column) {
		var move = {
			row: row,
			column: column
		};

		this.wsClient.sendMessage(move);
	}

	/**
	 * Arrange a new game based on current game mode.
	 *
	 * @param {Player} player
	 * @param {Player} opponent
	 * @param {SQUARE_STATE} [turn] turn
	 * @private
	 */
	Controller.prototype._initializeNewGame = function (player, opponent, turn) {
		if (this.model.mode === GAME_MODE.Real) {
			this.model.updateTurn(turn)
		} else {
			this.model.updateBoard(new Board());
		}

		this.model.updatePlayer(player);
		this.model.updateOpponent(opponent);
		this.view.playerView = new PlayerView(player);
		this.view.opponentView = new PlayerView(opponent, true);

		this.view.playerView.setBackgroundColor(this.model.player.mark);
		this.view.opponentView.setBackgroundColor(this.model.opponent.mark);

		this.view.render('setFragment', 'play');
	}

	/**
	 * Resets the game by clearing the board and update the model instances to null.
	 * @private
	 */
	Controller.prototype._resetGame = function () {
		if (this.model.mode === GAME_MODE.Real) {
			this.model.updateTurn(null);
		}

		this.model.updateMode(null);

		this.model.updatePlayer(null);
		this.view.playerView = null;
		this.model.updateOpponent(null);
		this.view.opponentView = null;
		this.model.updateBoard(null);
		this.view.canvasView.clearBoard();
	}

	/**
	 * Declare the winner player of the game and update his/her score.
	 * Also, it clear the board for the next game.
	 *
	 * @param {Player} winnerPlayer Mark of the winner player.
	 * @private
	 */
	Controller.prototype._declareWinner = function (winnerPlayer) {
		var score = this.model.mode === GAME_MODE.Real ?
			winnerPlayer.score : winnerPlayer.score + 10;

		if (winnerPlayer.id === this.model.player.id) {
			alert('Winner is ' + this.model.player.name);
			this.model.player.updateScore(score);
			this.view.playerView.setScore(this.model.player.score);
		} else {
			alert('Winner is ' + this.model.opponent.name);
			this.model.opponent.updateScore(score);
			this.view.opponentView.setScore(this.model.opponent.score);
		}

		if (this.model.mode === GAME_MODE.Computer) {
			this.model.board.initializeBoard();
		}
		this.view.canvasView.clearBoard();
	};

	/**
	 * Declare the draw state of the game.
	 * Also, clear the board for the next game.
	 *
	 * @private
	 */
	Controller.prototype._declareDraw = function () {
		alert('Draw!');
		if (this.model.mode === GAME_MODE.Computer) {
			this.model.board.initializeBoard();
		}
		this.view.canvasView.clearBoard();
	};

	/**
	 * Find the winner player amongst Player and Opponent
	 *
	 * @param winnerMark
	 * @return {null|Player}
	 * @private
	 */
	Controller.prototype._findWinnerPlayer = function (winnerMark) {
		return winnerMark === this.model.player.mark ? this.model.player : this.model.opponent;
	}

	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
