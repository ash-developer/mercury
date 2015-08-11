'use strict';

var Mercury = require('./libs/mercury'),
    mercury = new Mercury();

mercury.Module = require('./libs/core/module');
mercury.Router = require('./libs/core/router');

module.exports = mercury;
