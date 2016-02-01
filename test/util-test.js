'use strict';

var test = require('tape');
var util = require('../lib/util');

test('util.hasMagnitude', function (t) {
  t.plan(2);

  t.true(util.hasMagnitude('2 drinks'), 'has magnitude: "2 drinks"');

  t.false(util.hasMagnitude('party'), 'does not have magnitude: "party"');
});
