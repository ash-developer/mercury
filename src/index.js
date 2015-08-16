'use strict';

var mercury = require('./libs/mercury');

mercury.Module = require('./libs/core/module');
mercury.Router = require('./libs/core/router');
mercury.Socket = require('./libs/core/socket');

mercury.express = require('./libs/servers/express');
mercury.io = require('./libs/servers/socket.io');

module.exports = mercury;
