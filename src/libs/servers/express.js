'use strict';

var mercury = require('../mercury'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').Server(app),
    router = express.Router();

function Express() {
    var bodyParserConfig = mercury.config.express['body-parser'];

    if (bodyParserConfig) {
        if (bodyParserConfig.urlencoded) {
            app.use(bodyParser.urlencoded(bodyParserConfig.urlencoded));
        }
        if (bodyParserConfig.json) {
            app.use(bodyParser.json());
        }
    }
}

function initRoutes() {
    mercury.modules.forEach(function (module) {
        module.getRouter().routes.forEach(function (route) {
            router[route.verb](route.url, route.handler);
        });
    });

    if (mercury.config.express.cors) {
        var corsConfig = mercury.config.express.cors;

        app.use(function (req, res, next) {
            if (corsConfig.origin) {
                res.setHeader('Access-Control-Allow-Origin', corsConfig.origin);
            }
            if (corsConfig.methods) {
                res.setHeader('Access-Control-Allow-Methods', corsConfig.methods);
            }
            if (corsConfig.headers) {
                res.setHeader('Access-Control-Allow-Headers', corsConfig.headers);
            }
            if (corsConfig.credentials) {
                res.setHeader('Access-Control-Allow-Credentials', corsConfig.credentials);
            }

            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                mercury.logger.info(req.method + ': ' + req.url);
                next();
            }
        });
    }

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

Express.prototype.getServer = function () {
    return server;
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
