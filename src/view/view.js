(function (window) {
    'use strict';

    var MainView = window.app.View.MainView;
	var SettingsView = window.app.View.SettingsView;
	var PlayerView = window.app.View.PlayerView;
	var CanvasBoard = window.app.Canvas.Board;

	/**
	 * View of the project.
	 * It includes sub-views and acts as bridge between them.
	 *
	 * @constructor
	 */
	function View() {
        this.mainView = new MainView();
		this.settingsView =  new SettingsView();
		this.playerView = new PlayerView();
		this.opponentView = new PlayerView(null, true);
		this.canvasView = new CanvasBoard(qs('#game-board'));
    }

	/**
	 * Bind specified event with it's handler to sub-views.
	 *
	 * @param {string} event Event type.
	 * @param {function} handler Handler function of specified event.
	 */
	View.prototype.bind = function (event, handler) {
	    switch (event) {
		    case 'settingsSubmit':
			    this.settingsView.onPlayClick(handler);
			    break;
		    case 'canvasClick':
			    this.canvasView.onClick(handler);
			    break;
		    case 'opponentClick':
			    this.canvasView.onOpponentClick(handler);
			    break;
		    case 'leaveGameClick':
		    	this.mainView.onLeaveGame(handler);
		    	break;
		    default:
			    throw new Error('Unknown event binding attempt! Event: ' + event);
	    }
    };

	/**
	 * Render the view with specified view command
	 *
	 * @param {string} viewCmd View command.
	 * @param {object} paramMap Params of the specified view command.
	 */
    View.prototype.render = function (viewCmd, paramMap) {
	    var self = this;

	    var viewCommands = {
	    	setFragment: function () {
			    switch (paramMap) {
				    case 'play':
				    	self.mainView.displayPlay();
				    	self.canvasView.clearBoard();
					    break;
				    case 'settings':
				    	self.mainView.displaySettings();
				    	break;
				    case 'loading':
				    	self.mainView.displayLoadingSpinner();
				    	break;
				    default:
					    break;
			    }
		    },
	    };

	    viewCommands[viewCmd](paramMap);
    };

    window.app = window.app || {};
    window.app.View = window.app.View || {};
    window.app.View.View = View;
})(window);
