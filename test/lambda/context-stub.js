'use strict';

var sinon = require('sinon');

var context = {};

context.callback = null;

context.done = function (arg) {
  context.callback('done', arg);
};

context.succeed = function (arg) {
  context.callback('succeed', arg);
};

context.fail = function (arg) {
  context.callback('fail', arg);
};


module.exports = context;
