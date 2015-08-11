'use strict';

var mercury = require('./libs/mercury');

mercury.Module = require('./libs/core/module');
mercury.Router = require('./libs/core/router');

mercury.express = require('./libs/servers/express');

module.exports = mercury;
