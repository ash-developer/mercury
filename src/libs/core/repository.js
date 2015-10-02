'use strict';

var mercury = require('../mercury'),
    _ = require('lodash-node');

function Repository() {
}

Repository.prototype.list = function (conditions, callback) {
    var self = this,
        query = mercury.db.queryBuilder(this.table).select();

    if (conditions) {
        if (conditions.where) {
            _.each(conditions.where, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query = query.where(self.table + '.' + key, value);
                    });
                } else {
                    query = query.where(self.table + '.' + key, values);
                }
            });
        }
        if (conditions.whereNot) {
            _.each(conditions.whereNot, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query = query.whereNot(self.table + '.' + key, value);
                    });
                } else {
                    query = query.whereNot(self.table + '.' + key, values);
                }
            });
        }
        if (conditions.whereRaw) {
            _.each(conditions.whereRaw, function (value) {
                query = query.whereRaw(value);
            });
        }
        if (conditions.limit) {
            query = query.limit(parseInt(conditions.limit));
        }
        if (conditions.offset) {
            query = query.offset(parseInt(conditions.offset));
        }
        if (conditions.order) {
            query = query.orderByRaw(conditions.order);
        }
    }

    query.then(function (response) {
        callback(null, response);
    }).catch(callback);
};

Repository.prototype.count = function (conditions, callback) {
    var self = this,
        query = mercury.db.queryBuilder(this.table);

    if (conditions) {
        if (conditions.where) {
            _.each(conditions.where, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query = query.where(self.table + '.' + key, value);
                    });
                } else {
                    query = query.where(self.table + '.' + key, values);
                }
            });
        }
        if (conditions.whereNot) {
            _.each(conditions.whereNot, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query = query.whereNot(self.table + '.' + key, value);
                    });
                } else {
                    query = query.whereNot(self.table + '.' + key, values);
                }
            });
        }
        if (conditions.whereRaw) {
            _.each(conditions.whereRaw, function (value) {
                query = query.whereRaw(value);
            });
        }
    }

    query.count('ROWID as COUNT').then(function (rows) {
        callback(null, rows[0].COUNT);
    }).catch(callback);
};

Repository.prototype.get = function (identifier, callback) {
    mercury.db.queryBuilder(this.table).select().where(identifier).limit(1).then(function (response) {
        if (response.length === 0) {
            return callback({ message: 'No items for provided identifier' });
        }

        callback(null, response[0]);
    }).catch(callback);
};

Repository.prototype.create = function (attributes, callback) {
    mercury.db.queryBuilder(this.table).insert(attributes).then(function (response) {
        callback(null, response);
    }).catch(callback);
};

Repository.prototype.update = function (identifier, attributes, callback) {
    mercury.db.queryBuilder(this.table).update(attributes).where(identifier).then(function (response) {
        callback(null, response);
    }).catch(callback);
};

Repository.prototype.remove = function (identifier, callback) {
    var self = this,
        query = mercury.db.queryBuilder(this.table).del().where(identifier);

    if (conditions) {
        if (conditions.where) {
            _.each(conditions.where, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query = query.where(self.table + '.' + key, value);
                    });
                } else {
                    query = query.where(self.table + '.' + key, values);
                }
            });
        }
        if (conditions.whereNot) {
            _.each(conditions.whereNot, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query = query.whereNot(self.table + '.' + key, value);
                    });
                } else {
                    query = query.whereNot(self.table + '.' + key, values);
                }
            });
        }
    }

    query.then(function (response) {
        callback(null, response);
    }).catch(callback);
};

module.exports = Repository;
