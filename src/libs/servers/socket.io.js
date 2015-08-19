'use strict';

var mercury = require('../mercury'),
    socketIO = require('socket.io');

function SocketIO() {

}

SocketIO.prototype.emit = function () {
    this.io.emit.apply(this.io, arguments);
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

Context.prototype.setBaseEventName = function (baseName) {
    this.baseName = baseName;
};

Context.prototype.broadcast = SocketIO.prototype.emit;

SocketIO.prototype.start = function (server) {
    var io = socketIO(server || mercury.express.getServer());

    io.on('connection', function (socket) {
        var context = new Context(io, socket);

        mercury.modules.forEach(function (module) {
            module.getSocket().events.forEach(function (event) {
                var eventName = event.baseName ? event.baseName + '.' + event.name : event.name;
                socket.on(eventName, function () {
                    event.handler.apply(context, arguments);
                });

            });
        });
    });
};

module.exports = new SocketIO();
