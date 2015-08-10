'use strict';

var mercury = require('mercury');

function Module() {

    this.router = new mercury.Router();

}

Module.prototype.getRouter = function () {

    return this.router;

};

module.exports = Module;
