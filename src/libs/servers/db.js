'use strict';

var mercury = require('../mercury');

function DB() {
    this.queryBuilder = require('knex')(mercury.config.db);
}

module.exports = new DB();
