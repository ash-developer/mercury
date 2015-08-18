'use strict';

var mercury = require('../mercury'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    router = express.Router();

function Express() {

}

function initRoutes() {
    mercury.modules.forEach(function (module) {
        module.getRouter().routes.forEach(function (route) {
            router[route.verb](route.url, route.handler);
        });
    });

    router.use(function (req, res, next) {
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

Express.prototype.getApp = function () {
    return app;
};

Express.prototype.getRouter = function () {
    initRoutes();

    return router;
};

Express.prototype.start = function () {
    app.use(this.getRouter());

    mercury.io.start();

    server.listen(mercury.config.server.port, function() {
        console.log('Mercury server starts *:' + mercury.config.server.port);
    });
};

module.exports = new Express();
