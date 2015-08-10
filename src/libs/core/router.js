'use strict';

var _ = require('lodash-node');

function Router() {

    this.routes = {};

}

Router.prototype.use = function (url, handler) {
    var self = this;

    if (_.isFunction(handler)) {
        self.routes['get'] = self.routes['get'] || {};
        self.routes['get'][url] = handler;
    } else {
        self.routes['get'] = self.routes['get'] || {};
        _.each(handler.routes['get'], function (routeHandler, routeUrl) {
            self.routes['get'][url + routeUrl] = routeHandler;
        });
        self.routes['post'] = self.routes['post'] || {};
        _.each(handler.routes['post'], function (routeHandler, routeUrl) {
            self.routes['post'][url + routeUrl] = routeHandler;
        });
        self.routes['put'] = self.routes['put'] || {};
        _.each(handler.routes['put'], function (routeHandler, routeUrl) {
            self.routes['put'][url + routeUrl] = routeHandler;
        });
    }
};

Router.prototype.get = function (url, handler) {

    var self = this;

    self.routes['get'] = self.routes['get'] || {};
    if (_.isFunction(handler)) {
        self.routes['get'][url] = handler;
    } else {
        _.each(handler.routes['get'], function (routeHandler, routeUrl) {
            self.routes['get'][url + routeUrl] = routeHandler;
        });
    }

};

module.exports = Router;
