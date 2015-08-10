'use strict';

var mercury = require('mercury.js'),
    express = require('express'),
    app = express(),
    http = require('http').Server(app);

function start() {
    http.listen(mercury.config.server.port, function() {
        console.log('Mercury server starts *:' + mercury.config.server.port);
    });
}

module.exports = {
    start: start
};
