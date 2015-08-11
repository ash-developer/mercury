'use strict';

var mercury = require('mercury.js'),
    express = require('express'),
    app = express(),
    http = require('http').Server(app);

function Express() {

}

Express.prototype.initRoutes = function () {

    mercury.modules.forEach(function (module) {
        module.getRouter().routes.forEach(function (route) {
            app[route.verb](route.url, route.handler);
        });
    });

}

Express.prototype.start = function () {
    this.initRoutes();

    http.listen(mercury.config.server.port, function() {
        console.log('Mercury server starts *:' + mercury.config.server.port);
    });
}

module.exports = new Express();
