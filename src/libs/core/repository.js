'use strict';

var mercury = require('../mercury');

function Repository() {
}

Repository.prototype.list = function (callback) {
    mercury.db.queryBuilder(this.table).select().then(function (response) {
        callback(null, response);
    }).catch(callback);
};

Repository.prototype.get = function (identifier, callback) {
    mercury.db.queryBuilder(this.table).select().where(identifier).limit(1).then(function (response) {
        callback(null, response);
    }).catch(callback);
};

Repository.prototype.create = function (attributes, callback) {
    mercury.db.queryBuilder(this.table).insert(attributes).then(function (response) {
        callback(null, response);
    }).catch(callback);
};

Repository.prototype.update = function (attributes, callback) {
    mercury.db.queryBuilder(this.table).update(attributes).then(function (response) {
        callback(null, response);
    }).catch(callback);
};

Repository.prototype.remove = function (identifier, callback) {
    mercury.db.queryBuilder(this.table).del().where(identifier).then(function (response) {
        callback(null, response);
    }).catch(callback);
};

module.exports = Repository;
