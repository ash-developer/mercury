'use strict';

var mercury = require('mercury');

function Module() {

}

Module.prototype.getRouter = function () {
    return this.router || new mercury.Router();
};

module.exports = Module;
