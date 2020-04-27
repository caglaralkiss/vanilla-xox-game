(function (window) {
    'use strict';

	/**
	 * View that abstracts 'main' sections' children in template.
	 * Main section displays one of the child(e.g Play, Settings or LoadingSpinner) in the page at same time.
	 * It hides other children when one of the child is displayed.
	 *
	 * @constructor
	 */
	function MainView() {
        this.$play = qs('#play');
        this.$settings = qs('#settings');
        this.$loadingSpinner = qs('#loading-spinner');
    }

    MainView.prototype = {
    	displayPlay: function () {
		    this.$play.style.display = 'block';
		    this.$settings.style.display = 'none';
		    this.$loadingSpinner.style.display = 'none';
	    },

	    displaySettings: function () {
		    this.$play.style.display = 'none';
		    this.$settings.style.display = 'block';
		    this.$loadingSpinner.style.display = 'none';
	    },

	    displayLoadingSpinner: function () {
		    this.$play.style.display = 'none';
		    this.$settings.style.display = 'none';
		    this.$loadingSpinner.style.display = 'block';
	    },
    };

    window.app = window.app || {};
    window.app.View = window.app.View || {};
    window.app.View.MainView = MainView;
})(window);
