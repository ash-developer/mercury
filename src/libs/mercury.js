'use strict';

var path = require('path'),
    express = require('./servers/express'),
    knex = require('knex');

function Mercury() {

    this.mainPath = path.dirname(require.main.filename);
    this.config = require(this.mainPath + '/mercury');
    this.db = knex(this.config.db);

    this.modules = {};

}

Mercury.prototype.start = function () {
    express.start();
};

Mercury.prototype.addModule = function (module) {
    this.modules.push(module);
};

module.exports = Mercury;
