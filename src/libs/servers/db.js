'use strict';

var mercury = require('../mercury'),
    repositories = {};

function DB() {
    this.queryBuilder = require('knex')(mercury.config.db);
}

DB.prototype.registerRepository = function (name, repository) {
    if (!repositories[name]) {
        repositories[name] = new mercury.Repository();
        repositories[name].table = name;
    }

    if (repository) {
        repositories[name].table = repository.table;
        util.inherits(repositories[name], repository);
    }
};

module.exports = new DB();
