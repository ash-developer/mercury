'use strict';

var mercury = require('../mercury'),
    express = require('express'),
    app = express(),
    http = require('http').Server(app);

function Express() {

}

function initRoutes() {

    mercury.modules.forEach(function (module) {
        module.getRouter().routes.forEach(function (route) {
            app[route.verb](route.url, route.handler);
        });
    });

    app.use(function (req, res, next) {
        var error = new Error('Not Found');
        error.status = 404;
        next(error);
    }, function (error, req, res, next) {
        res.status(error.status || 500).json({
            message: error.message,
            error: error
        });
    });

}

Express.prototype.start = function () {
    initRoutes();

    http.listen(mercury.config.server.port, function() {
        console.log('Mercury server starts *:' + mercury.config.server.port);
    });
};

module.exports = new Express();
