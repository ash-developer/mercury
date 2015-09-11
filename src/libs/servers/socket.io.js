'use strict';

var mercury = require('../mercury'),
    socketIO = require('socket.io'),
    currentSocket = null;

function SocketIO() {
    this.io = null;
    this.events = [];
}

//TODO: it is bug, currentSocket is last connected user
SocketIO.prototype.emit = function () {
    if (currentSocket) {
        currentSocket.emit.apply(currentSocket, arguments);
    }
};

SocketIO.prototype.broadcast = function () {
    if (this.io !== null) {
        this.io.sockets.emit.apply(this.io.sockets, arguments);
    }
};

function Context(io, socket) {
    this.io = io;
    this.socket = socket;

    this.baseName = null;
}

Context.prototype.emit = function () {
    arguments[0] = this.baseName ? this.baseName + '.' + arguments[0] : arguments[0];
    this.socket.emit.apply(this.socket, arguments);
};

Context.prototype.straightEmit = function () {
    this.socket.emit.apply(this.socket, arguments);
};

Context.prototype.setBaseEventName = function (baseName) {
    this.baseName = baseName;
};

Context.prototype.broadcast = SocketIO.prototype.broadcast;

SocketIO.prototype.start = function (server) {
    var self = this;

    self.io = socketIO(server || mercury.express.getServer());

    mercury.modules.forEach(function (module) {
        module.getSocket().events.forEach(function (event) {
            self.events.push(event);
        });
    });

    self.io.on('connection', function (socket) {
        currentSocket = socket;

        self.events.forEach(function (event) {
            var eventName = event.baseName ? event.baseName + '.' + event.name : event.name;

            socket.on(eventName, function () {
                var context = new Context(self.io, socket);
                context.setBaseEventName(event.baseName);
                event.handler.apply(context, arguments);
            });
        });
    });
};

module.exports = new SocketIO();
