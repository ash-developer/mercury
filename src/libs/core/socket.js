'use strict';

var path = require('path'),
    fs = require('fs'),
    _ = require('lodash-node');

function Socket() {
    this.baseName = null;
    this.events = [];
}

Socket.prototype.setBaseEventName = function (baseName) {
    this.baseName = baseName;
};

Socket.prototype.merge = function (absolutePath) {
    var self = this,
        socket = require(path.relative(__dirname, absolutePath));

    socket.events.forEach(function (event) {
        var baseName = null;
        if (self.baseName) {
            baseName = self.baseName;
        }
        if (event.baseName) {
            if (baseName) {
                baseName += '.' + event.baseName;
            } else {
                baseName = event.baseName;
            }
        }

        self.events.push(_.extend(event, {
            baseName: baseName
        }));
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
    this.events.push({ baseName: this.baseName, name: name, handler: handler });
};

module.exports = Socket;
