'use strict';

var _ = require('lodash-node');

function Router() {
    this.routes = [];
}

Router.prototype.use = function (verb, url, handler) {
    var self = this;

    if (arguments.length === 2) {
        handler = url;
        url = verb;
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
        self.routes = self.routes.concat();
    }
};

Router.prototype.get = Router.prototype.use.bind(this, 'get');
Router.prototype.post = Router.prototype.use.bind(this, 'post');
Router.prototype.put = Router.prototype.use.bind(this, 'put');
Router.prototype.delete = Router.prototype.use.bind(this, 'delete');

module.exports = Router;
