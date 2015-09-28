'use strict';

var mercury = require('../mercury'),
    _ = require('lodash-node');

function Repository() {
}

Repository.prototype.list = function (conditions) {
    var self = this,
        query = mercury.db.queryBuilder(this.table).select();

    if (conditions) {
        if (conditions.where) {
            _.each(conditions.where, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query.where(self.table + '.' + key, value);
                    });
                } else {
                    query.where(self.table + '.' + key, values);
                }
            });
        }
        if (conditions.whereNot) {
            _.each(conditions.whereNot, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query.whereNot(self.table + '.' + key, value);
                    });
                } else {
                    query.whereNot(self.table + '.' + key, values);
                }
            });
        }
    }

    return query;
};

Repository.prototype.get = function (identifier) {
    var resolver = Promise.pending();

    mercury.db.queryBuilder(this.table).select().where(identifier).limit(1).then(function (products) {
        if (products.length === 0) {
            resolver.reject({ message: 'No items for provided identifier' });
        }

        resolver.resolve(response[0]);
    }).catch(resolver.reject);

    return resolver.promise;
};

Repository.prototype.create = function (attributes) {
    return mercury.db.queryBuilder(this.table).insert(attributes);
};

Repository.prototype.update = function (identifier, attributes) {
    return mercury.db.queryBuilder(this.table).update(attributes).where(identifier);
};

Repository.prototype.remove = function (conditions) {
    var query = mercury.db.queryBuilder(this.table).del();

    if (conditions) {
        if (conditions.where) {
            _.each(conditions.where, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query.where(self.table + '.' + key, value);
                    });
                } else {
                    query.where(self.table + '.' + key, values);
                }
            });
        }
        if (conditions.whereNot) {
            _.each(conditions.whereNot, function (values, key) {
                if (_.isArray(values)) {
                    values.forEach(function (value) {
                        query.whereNot(self.table + '.' + key, value);
                    });
                } else {
                    query.whereNot(self.table + '.' + key, values);
                }
            });
        }
    }

    return query;
};

module.exports = Repository;
