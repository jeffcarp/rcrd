'use strict';

var proxyquire = require('proxyquire').noCallThru();
var test = require('tape');

var dynamoDocStub = require('./dynamodb-doc-stub');
var context = require('./context-stub');

var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

test('getRecord fails with no access token', function (t) {
  t.plan(2);

  var params = {
    operation: 'record.get',
    id: 'a-record-id',
    raw: 'test, raw'
  };

  context.callback = function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
  };

  lambda.handler(params, context);
});

test('getRecord gets a record', function (t) {
  t.plan(4);

  var expectedRecord = {id: 'a-record-id', raw: 'test, raw'};
  dynamoDocStub._setRecord(expectedRecord);

  var params = {
    operation: 'record.get',
    id: 'a-record-id',
    access_token: 'some_bs_access_token',
  };

  context.callback = function (status, record) {
    t.equal(status, 'succeed');
    t.ok(record);
    t.equal(record.id, expectedRecord.id);
    t.equal(record.raw, expectedRecord.raw);
  };

  lambda.handler(params, context);
});
