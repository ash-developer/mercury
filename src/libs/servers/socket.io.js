'use strict';

var mercury = require('../mercury'),
    socketIO = require('socket.io');

function SocketIO() {

}

function Context(io, socket) {
    this.io = io;
    this.socket = socket;
}

Context.prototype.emit = function () {
    this.socket.emit(arguments);
};

Context.prototype.broadcast = function () {
    this.io.emit(arguments);
};

SocketIO.prototype.start = function () {
    var io = socketIO(mercury.express.getServer());

    io.on('connection', function (socket) {
        var context = new Context(io, socket);

        mercury.modules.forEach(function (module) {
            module.getSocket().events.forEach(function (event) {

                socket.on(event.name, function () {
                    event.handler.apply(context, arguments);
                });

            });
        });
    });
};

module.exports = new SocketIO();
