(function (window) {
	'use strict';

	var COLORS = window.app.Constants.COLORS;

	/**
	 * Represent the board on a canvas.
	 *
	 * @param {Element | HTMLCanvasElement} canvasRef Ref to a Canvas element.
	 * @param {number} [canvasSize] canvasSize
	 * @constructor
	 */
	function CanvasBoard(canvasRef, canvasSize) {
		this.canvas = canvasRef;
		this.context = canvasRef.getContext('2d');
		this.setBoardConfig(canvasSize);
		this.drawBoard();
		this._bindResizeEventToWindow();
		this.commands = [];
	}

	/**
	 * Set board size, section size of a board and adjust it with canvas.
	 *
	 * @param {number} [canvasSize] canvasSize
	 */
	CanvasBoard.prototype.setBoardConfig = function (canvasSize) {
		this.canvasSize = canvasSize || this._calculateCanvasSize();
		this.sectionSize = this.canvasSize / 3;
		this.canvas.width = this.canvasSize;
		this.canvas.height = this.canvasSize;
		this.context.translate(0.5, 0.5);
	};


	/**
	 * Draw the board on canvas.
	 */
	CanvasBoard.prototype.drawBoard = function () {
		var lineWidth = this._calculateLineWidth();
		var lineStart = 4;
		var lineLength = this.canvasSize - 5;
		this.context.lineWidth = lineWidth;
		this.context.lineCap = 'round';
		this.context.strokeStyle = COLORS.BOARD_LINE_COLOR;
		this.context.beginPath();

		/*
		 * Horizontal lines
		 */
		for (var y = 1; y <= 2; y++) {
			this.context.moveTo(lineStart, y * this.sectionSize);
			this.context.lineTo(lineLength, y * this.sectionSize);
		}

		/*
		 * Vertical lines
		 */
		for (var x = 1; x <= 2; x++) {
			this.context.moveTo(x * this.sectionSize, lineStart);
			this.context.lineTo(x * this.sectionSize, lineLength);
		}

		this.context.stroke();
	};

	/**
	 * Draw Tic or Toe on a board and cache the command when it needed.
	 *
	 * @param {string} mark Represent Tic or Toc on the board.
	 * @param {number} row Row of the mark on the board.
	 * @param {number} column Column of the mark on the board.
	 * @param {boolean} [isStoreCommand] isStoreCommand Define whether to cache command.
	 */
	CanvasBoard.prototype.addMark = function (mark, row, column, isStoreCommand) {
		try {
			if (mark === 'X') {
				this._drawX(row, column);
			} else if (mark === 'O') {
				this._drawO(row, column);
			} else {
				throw new Error('There is no mark such as ' + mark + '!');
			}

			if (!!isStoreCommand) {
				this.commands.push({
					mark: mark,
					row: row,
					column: column
				})
			}
		} catch (e) {
			console.error(`Something went wrong when drawing mark: ${ mark } to row: ${row} and column: ${column}`);
		}
	};

	/**
	 *  Clear the marks on the board and cache commands.
	 */
	CanvasBoard.prototype.clearBoard = function () {
		this.setBoardConfig();
		this.drawBoard();
		this.commands = [];
	};

	/**
	 * Calculate position of click on a board.
	 *
	 * @param {MouseEvent} event
	 * @return {{row: number, column: number}}
	 */
	CanvasBoard.prototype.getBoardClickPosition = function (event) {
		var self = this;

		var clientRect = this.canvas.getBoundingClientRect();

		var findSection = function (coordinate) {
			var totalSectionSize = self.sectionSize * 3;

			return Math.floor(coordinate * 3 / totalSectionSize);
		};

		return {
			row: findSection(event.clientY - clientRect.top),
			column: findSection(event.clientX - clientRect.left),
		}
	};

	/**
	 * Bind mouseUp event to canvas.
	 *
	 * @param {function} handler Callback function to pass mouse position.
	 */
	CanvasBoard.prototype.onClick = function (handler) {
		var self = this;

		$on(self.canvas, 'mouseup', function (event) {
			var mousePos = self.getBoardClickPosition(event);

			handler(mousePos);
		})
	};

	/**
	 * Redraw marks from commands cache.
	 */
	CanvasBoard.prototype.redrawMarks = function () {
		var i;

		for (i = 0; i < this.commands.length; i++) {
			var command = this.commands[i];
			this.addMark(command.mark, command.row, command.column, false)
		}
	};


	/**
	 * Draw 'X' on the board.
	 *
	 * @param {number} row Row of the mark on the board.
	 * @param {number} column Column of the mark on the board.
	 * @private
	 */
	CanvasBoard.prototype._drawX = function (row, column) {
		this.context.strokeStyle = COLORS.X_MARK_COLOR;

		this.context.beginPath();
		var offset = 30;

		var posX = (column * this.sectionSize);
		var posY = (row * this.sectionSize);

		this.context.moveTo(posX + offset, posY + offset);
		this.context.lineTo(posX + this.sectionSize - offset, posY + this.sectionSize - offset);

		this.context.moveTo(posX + offset, posY + this.sectionSize - offset);
		this.context.lineTo(posX + this.sectionSize - offset, posY + offset);

		this.context.stroke();
	};

	/**
	 * Draw 'O' on the board.
	 *
	 * @param {number} row Row of the mark on the board.
	 * @param {number} column Column of the mark on the board.
	 * @private
	 */
	CanvasBoard.prototype._drawO = function (row, column) {
		var halfSection = this.sectionSize * 0.5;
		var center = {
			x: (column * this.sectionSize) + halfSection,
			y: (row * this.sectionSize) + halfSection,
		};
		var radius = (this.sectionSize - 50) / 2;
		var startAngle = 0;
		var endAngle = 2 * Math.PI;

		this.context.lineWidth = this._calculateLineWidth();
		this.context.strokeStyle = COLORS.O_MARK_COLOR;
		this.context.beginPath();
		this.context.arc(center.x, center.y, radius, startAngle, endAngle);
		this.context.stroke();
	};


	/**
	 * Re-arrange board config and re-draw to board when resize occurs.
	 *
	 * @private
	 */
	CanvasBoard.prototype._bindResizeEventToWindow = function () {
		var self = this;

		window.onresize = function () {
			self.setBoardConfig();
			self.drawBoard();
			self.redrawMarks();
		};
	};

	/**
	 * Calculate edge of the board.
	 *
	 * @return {number}
	 * @private
	 */
	CanvasBoard.prototype._calculateCanvasSize = function () {
		var browserWidth = window.getBrowserWidth();
		var browserHeight = window.getBrowserHeight();

		var minSize = Math.min(browserHeight, browserWidth);

		return (minSize * 50) / 100;
	};

	/**
	 * Calculate width of the grid with respect to canvas size.
	 *
	 * @return {number}
	 * @private
	 */
	CanvasBoard.prototype._calculateLineWidth = function () {
		if (this.canvasSize >= 500 && this.canvasSize < 700) {
			return 5;
		} else if (this.canvasSize >= 700 && this.canvasSize < 900) {
			return 7;
		} else if (this.canvasSize >= 900 && this.canvasSize < 1200) {
			return 9;
		} else {
			return 12;
		}
	};

	window.app = window.app || {};
	window.app.Canvas = window.app.Canvas || {};
	window.app.Canvas.Board = CanvasBoard;
})(window);
