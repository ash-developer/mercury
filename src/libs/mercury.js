'use strict';

var path = require('path'),
    _ = require('lodash-node');

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

var mercury = new Mercury();

module.exports = mercury;
