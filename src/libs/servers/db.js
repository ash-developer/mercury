'use strict';

var mercury = require('../mercury'),
    repositories = {},
    util = require('util'),
    _ = require('lodash-node');

function DB() {
    this.queryBuilder = require('knex')(mercury.config.db);
}

function initRepository(name) {
    if (!repositories[name]) {
        repositories[name] = mercury.Repository;
        repositories[name].prototype.table = name;
    }
}

DB.prototype.repository = function (name) {
    initRepository(name);

    return new repositories[name]();
};

DB.prototype.registerRepository = function (name, repository) {
    initRepository(name);

    if (repository) {
        _.each(new repository(), function (value, key) {
            repositories[name].prototype[key] = value;
        });
    }
};

module.exports = new DB();
