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

mercury.Module = require('./libs/core/module');
mercury.Router = require('./libs/core/router');
mercury.Socket = require('./libs/core/socket');
mercury.express = require('./libs/servers/express');
mercury.io = require('./libs/servers/socket.io');
