'use strict';

var _ = require('lodash-node'),
    path = require('path'),
    fs = require('fs');

function Router(routesDir) {
    this.routes = [];

    this.get = this.use.bind(this, 'get');
    this.post = this.use.bind(this, 'post');
    this.put = this.use.bind(this, 'put');
    this.delete = this.use.bind(this, 'delete');

    if (routesDir) {
        this.useDir(routesDir);
    }
}

Router.prototype.useDir = function (routesDir) {
    var self = this;

    fs.readdirSync(routesDir).forEach(function (file) {
        var absolutePath = routesDir + file;

        if (fs.statSync(absolutePath).isDirectory()) {
            self.useDir(absolutePath);
        } else {
            self.use(require(path.relative(__dirname, absolutePath)));
        }
    });
};

Router.prototype.use = function (verb, url, handler) {
    var self = this;

    if (arguments.length === 2) {
        handler = url;
        url = verb;
        verb = 'get';
    } else if (arguments.length === 1) {
        handler = verb;
        url = '';
        verb = 'get';
    }

    if (!handler) {
        return;
    }

    //TODO: check existing pair verb, url for rewrite
    if (_.isFunction(handler)) {
        self.routes.push({ verb: verb, url: url, handler: handler });
    } else if (handler.routes) {
        handler.routes.forEach(function (route) {
            route.url = url + route.url;
            self.routes.push(route);
        });
    }

};

module.exports = Router;
