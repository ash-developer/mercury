'use strict';

var mercury = require('../mercury');

function Module(basePath) {
    this.basePath = basePath;
}

Module.prototype.getRouter = function () {
    if (!this.router) {
        this.router = new mercury.Router();
        if (this.basePath) {
            this.router.useDir(this.basePath + '/routes');
        }
    }

    return this.router;
};

Module.prototype.getSocket = function () {
    if (!this.socket) {
        this.socket = new mercury.Socket();
        if (this.basePath) {
            this.socket.mergeDir(this.basePath + '/sockets');
        }
    }

    return this.socket;
};

module.exports = Module;
