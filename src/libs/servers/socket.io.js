'use strict';

var mercury = require('../mercury'),
    socketIO = require('socket.io');

function SocketIO() {

}

SocketIO.prototype.emit = function () {
    this.io.emit(arguments);
};

function Context(io, socket) {
    this.io = io;
    this.socket = socket;
}

Context.prototype.emit = function () {
    this.socket.emit(arguments);
};

Context.prototype.broadcast = SocketIO.prototype.emit;

SocketIO.prototype.start = function (server) {
    var io = socketIO(server || mercury.express.getServer());

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
