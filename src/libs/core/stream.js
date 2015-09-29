var EventEmitter = require('events').EventEmitter;

function Stream() {
    this.events = new EventEmitter();
}

Stream.prototype.on = function () {
    this.events.on.apply(this.events, arguments);
};

Stream.prototype.emit = function () {
    this.events.emit.apply(this.events, arguments);
};

Stream.prototype.once = function () {
    this.events.once.apply(this.events, arguments);
};

Stream.prototype.write = function (chunk) {
    this.emit('data', chunk);
};

Stream.prototype.end = function () {
    this.emit('end');
};

module.exports = Stream;
