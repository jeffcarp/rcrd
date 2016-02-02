'use strict';

var sinon = require('sinon');

var context = {};

context.callback = null;

context.done = function (arg) {
  context.callback('done', arg);
};

context.success = function (arg) {
  context.callback('success', arg);
};

context.fail = function (arg) {
  context.callback('fail', arg);
};


module.exports = context;
