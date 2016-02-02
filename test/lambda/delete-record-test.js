'use strict';

var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var test = require('tape');

var dynamoDocStub = require('./dynamodb-doc-stub');
var context = require('./context-stub');

var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

test('deleteRecord fails with no access token', function (t) {
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

test('deleteRecord marks a record as deleted', function (t) {
  t.plan(2);

  var params = {
    operation: 'record.delete',
    id: 'a-record-id',
    access_token: 'yeah'
  };

  // put a record in the db with that id
  dynamoDocStub._addRecord({Key: 'a-record-id'});

  context.callback = function (status, arg) {
    t.equal(status, 'success');

    let record = dynamoDocStub._getRecord('a-record-id');
    t.true(record.deleted, 'record was marked as deleted');
  };

  lambda.handler(params, context);
});
