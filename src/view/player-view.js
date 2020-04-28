(function (window) {
	'use strict';

	/**
	 * View that includes Player/Opponent DOM bindings.
	 * It includes getters & setters for Player template.
	 *
	 * @param {Player} [playerModel] playerModel Player model data
	 * @param {boolean} [isOpponent] isOpponent Define whether player is user or opponent.
	 * @constructor
	 */
	function PlayerView(playerModel, isOpponent) {
		this.$name = qs((isOpponent ? '#opponent' : '#player') +  ' .player__name');
		this.$mark = qs((isOpponent ? '#opponent' : '#player') +  ' .player__mark');
		this.$score = qs((isOpponent ? '#opponent' : '#player') +  ' .player__score');

		if (playerModel) {
			if (playerModel.name) {
				this.setName(playerModel.name);
			}

			if (playerModel.score) {
				this.setScore(playerModel.score);
			}

			if (playerModel.mark) {
				this.setMark(playerModel.mark);
			}
		}
	}

	PlayerView.prototype = {
		/**
		 * @param {string} name
		 */
		setName: function (name) {
			this.$name.textContent = name;
		},
		/**
		 * @param {SQUARE_STATE} mark
		 */
		setMark: function (mark) {
			this.$mark.textContent = mark;
		},
		/**
		 * @param {number} score
		 */
		setScore: function (score) {
			this.$score.textContent = score + '';
		},
		getName: function () {
			return this.$name.textContent;
		},
		getMark: function () {
			return this.$mark.textContent;
		},
		getScore: function () {
			return this.$score.textContent;
		}
	};

	window.app = window.app || {};
	window.app.View = window.app.View || {};
	window.app.View.PlayerView = PlayerView;
})(window);