'use strict';

var path = require('path'),
    fs = require('fs');

function Socket() {
    this.events = [];
}

Socket.prototype.merge = function (absolutePath) {
    var self = this,
        socket = require(path.relative(__dirname, absolutePath));

    socket.events.forEach(function (event) {
        self.events.push(event);
    });
};

Socket.prototype.mergeDir = function (socketsDir) {
    var self = this;

    fs.readdirSync(socketsDir).forEach(function (file) {
        var absolutePath = socketsDir + file;

        if (fs.statSync(absolutePath).isDirectory()) {
            self.mergeDir(absolutePath);
        } else {
            self.merge(absolutePath);
        }
    });
};

Socket.prototype.on = function (name, handler) {
    this.events.push({ name: name, handler: handler });
};

module.exports = Socket;
