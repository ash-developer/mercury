'use strict';

function Static() {

    this.statics = {};

}

Static.prototype.use = function (url, path) {

    this.statics[url] = path;

}

module.exports = Static;
