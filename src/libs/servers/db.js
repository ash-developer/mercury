'use strict';

var mercury = require('../mercury'),
    repositories = {};

function DB() {
    this.queryBuilder = require('knex')(mercury.config.db);
}

function initRepository(name) {
    if (!repositories[name]) {
        repositories[name] = new mercury.Repository();
        repositories[name].table = name;
}
    }

DB.prototype.repository = function (name) {
    initRepository(name);

    return repositories[name];
};

DB.prototype.registerRepository = function (name, repository) {
    initRepository(name);

    if (repository) {
        repositories[name].table = repository.table;
        util.inherits(repositories[name], repository);
    }
};

module.exports = new DB();
