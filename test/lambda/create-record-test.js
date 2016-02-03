'use strict';

var proxyquire = require('proxyquire').noCallThru();
var test = require('tape');

var dynamoDocStub = require('./dynamodb-doc-stub');
var context = require('./context-stub');

var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

test('createRecord fails with no access token', function (t) {
  t.plan(2);

  var params = {
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, raw'
  };

  context.callback = function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
  };

  lambda.handler(params, context);
});

test('createRecord adds a record', function (t) {
  t.plan(5);

  var params = {
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, raw',
    access_token: 'yeah',
  };

  t.notOk(dynamoDocStub._getRecord('a-record-id'), 'a record does not exist');

  context.callback = function (status, arg) {
    t.equal(status, 'succeed');

    let record = dynamoDocStub._getRecord('a-record-id');
    t.ok(record, 'a record now exists');
    t.equal(record.id, params.id);
    t.equal(record.raw, params.raw);
  };

  lambda.handler(params, context);
});