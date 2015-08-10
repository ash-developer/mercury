'use strict';

var _ = require('lodash-node');

function SocketIO() {

    this.handlers = [];

}

SocketIO.prototype.use = function (handler) {

    var self = this;

    if (_.isFunction(handler)) {
        self.handlers.push(handler);
    } else {
        handler.handlers.forEach(function (handler) {
            self.handlers.push(handler);
        });
    }

};

module.exports = SocketIO;
