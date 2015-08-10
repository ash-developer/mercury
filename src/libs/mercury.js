'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    _ = require('lodash-node'),
    knex = require('knex'),

    Module = require('./core/module'),
    Router = require('./core/router'),
    Static = require('./core/static'),
    SocketIO = require('./core/socket-io');

function Mercury() {

    this.mainPath = path.dirname(require.main.filename);
    this.config = require(this.mainPath + '/mercury');
    this.db = knex(this.config.db);

    this.debugMode = false;
    this.modules = {};

    this.Module = Module;
    this.Router = Router;
    this.Static = Static;
    this.SocketIO = SocketIO;

}

Mercury.prototype.use = function (baseUrl, module) {
    this.modules[baseUrl] = module;

    var routes = module.getRouter.call(module).routes;

    _.each(routes['get'], function (handler, url) {
        app.get(baseUrl + url, handler);
    });

    _.each(module.static.statics, function (path, url) {
        app.use(baseUrl + url, express.static(module.basePath + '/' + path));
    });

    io.on('connection', function (socket) {
        module.socketIO.handlers.forEach(function (handler) {
            handler(io, socket);
        });
    });
};

Mercury.prototype.start = function () {
    var self = this;

    http.listen(self.config.server.port, function() {
        console.log('Mercury server starts *:' + self.config.server.port);
    });
};

Mercury.prototype.generateWSData = function (table) {
    var self = this,
        socketIO = new this.SocketIO();

    socketIO.use(function (io, socket) {

        socket.on(table + '.list', function () {

            self.db('test').select().then(function (posts) {
                socket.emit(table + '.list', null, posts);
            }).catch(function (error) {
                socket.emit(table + '.list', error);
            });

        });

        socket.on(table + '.details', function (identifier) {

            self.db('test').select().where({ id: identifier }).then(function (posts) {
                socket.emit(table + '.details', null, posts[0]);
            }).catch(function (error) {
                socket.emit(table + '.details', error);
            });

        });

    });

    return socketIO;
};

module.exports = Mercury;
