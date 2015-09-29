var EventEmitter = require('events').EventEmitter;

function Stream() {
    this.events = new EventEmitter();
}

Stream.prototype.on = function () {
    this.events.on.apply(events, arguments);
};

Stream.prototype.emit = function () {
    this.events.emit.apply(events, arguments);
};

Stream.prototype.once = function () {
    this.events.once.apply(events, arguments);
};

Stream.prototype.write = function (chunk) {
    this.emit('data', chunk);
};

Stream.prototype.end = function () {
    this.emit('end');
};
