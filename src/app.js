(function () {
    'use strict';

    var Model = window.app.Model.Model;
    var View = window.app.View.View;
    var Controller = window.app.Controller;

    function App() {
        var model = new Model();
        var view = new View();
        var controller = new Controller(model, view);
    }

    new App();
})();
