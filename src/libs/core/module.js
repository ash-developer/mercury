'use strict';

var mercury = require('../mercury');

function Module() {

}

Module.prototype.getRouter = function () {
    return this.router || new mercury.Router();
};

Module.prototype.getSocket = function () {
    return this.socket || new mercury.Socket();
};

module.exports = Module;
