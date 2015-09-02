'use strict';

var mercury = require('../mercury'),
    repositories = {},
    util = require('util');

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
        repositories[name].prototype.table = repository.table;
        util.inherits(repositories[name], repository);
    }
};

module.exports = new DB();
