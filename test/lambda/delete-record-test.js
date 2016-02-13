'use strict';

var proxyquire = require('proxyquire').noCallThru();
var test = require('tape');

var dynamoDocStub = require('./dynamodb-doc-stub');
var context = require('./context-stub');

var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});


test('deleteRecord fails with no access token', function (t) {
  dynamoDocStub._clear();
  t.plan(2);

  var params = {
    operation: 'record.delete',
    id: 'a-record-id'
  };

  context.callback = function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
  };

  lambda.handler(params, context);
});

test('deleteRecord actually deletes a record', function (t) {
  dynamoDocStub._clear();
  t.plan(4);

  var params = {
    operation: 'record.delete',
    id: 'a-record-id',
    access_token: 'yeah'
  };

  t.notOk(dynamoDocStub._getRecord('a-record-id'), 'a record does not exist');
  dynamoDocStub._setRecord({id: 'a-record-id'});
  t.ok(dynamoDocStub._getRecord('a-record-id'), 'a record now exists');

  context.callback = function (status, arg) {
    t.equal(status, 'succeed');

    t.notOk(dynamoDocStub._getRecord('a-record-id'), 'a record was deleted');
  };

  lambda.handler(params, context);
});
