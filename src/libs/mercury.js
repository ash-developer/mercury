'use strict';

var path = require('path'),
    _ = require('lodash-node'),
    mercury;

function Mercury() {
    this.mainPath = path.dirname(require.main.filename);
    this.config = _.extend(
        require('../mercury'),
        require(this.mainPath + '/mercury')
    );

    this.modules = [];
}

Mercury.prototype.start = function () {
    this.express.start();
};

Mercury.prototype.addModule = function (module) {
    this.modules.push(module);
};

mercury = new Mercury();

module.exports = mercury;

mercury.Module = require('./core/module');
mercury.Router = require('./core/router');
mercury.Socket = require('./core/socket');
mercury.express = require('./servers/express');
mercury.io = require('./servers/socket.io');
mercury.Repository = require('./core/repository');
mercury.db = require('./servers/db');
