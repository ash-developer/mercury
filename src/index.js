'use strict';

var Mercury = require('./libs/mercury'),
    mercury = new Mercury();

mercury.Module = require('./libs/core/module');
mercury.Router = require('./libs/core/router');

mercury.Static = require('./libs/core/static');
mercury.SocketIO = require('./libs/core/socket-io');

module.exports = mercury;
