'use strict';

var proxyquire = require('proxyquire').noCallThru();
var test = require('tape');

var dynamoDocStub = require('./dynamodb-doc-stub');
var context = require('./context-stub');

var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

test('createRecord fails with no access token', function (t) {
  dynamoDocStub._clear();
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
  dynamoDocStub._clear();
  t.plan(5);

  var params = {
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, raw',
    access_token: 'some_bs_access_token',
  };

  t.notOk(dynamoDocStub._get('rcrd-records', 'a-record-id'), 'a record does not exist');

  context.callback = function (status, arg) {
    t.equal(status, 'succeed');

    let record = dynamoDocStub._get('rcrd-records', 'a-record-id');
    t.ok(record, 'a record now exists');
    t.equal(record.id, params.id);
    t.equal(record.raw, params.raw);
  };

  lambda.handler(params, context);
});

test('can create a record with UTF-8 characters', function (t) {
  dynamoDocStub._clear();
  t.plan(5);

  var params = {
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, テスト, 你别放屁',
    access_token: 'some_bs_access_token',
  };

  t.notOk(dynamoDocStub._get('rcrd-records', 'a-record-id'), 'a record does not exist');

  context.callback = function (status, arg) {
    t.equal(status, 'succeed');

    let record = dynamoDocStub._get('rcrd-records', 'a-record-id');
    t.ok(record, 'a record now exists');
    t.equal(record.id, params.id);
    t.equal(record.raw, params.raw);
  };

  lambda.handler(params, context);
});

test('cannot create a record with duplicate plain cats', function (t) {
  dynamoDocStub._clear();
  t.plan(3);

  var params = {
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token',
  };

  t.notOk(dynamoDocStub._get('rcrd-records', 'a-record-id'), 'a record does not exist');

  context.callback = function (status, arg) {
    t.equal(status, 'fail');

    t.notOk(dynamoDocStub._get('rcrd-records', 'a-record-id'), 'a record was not created');
  };

  lambda.handler(params, context);
});

test('cannot create a record with duplicate cats with mags', function (t) {
  dynamoDocStub._clear();
  t.plan(3);

  var params = {
    operation: 'create',
    id: 'a-record-id',
    raw: 'run, great, 13 miles, phew, 3 miles',
    access_token: 'some_bs_access_token',
  };

  t.notOk(dynamoDocStub._get('rcrd-records', 'a-record-id'), 'a record does not exist');

  context.callback = function (status, arg) {
    t.equal(status, 'fail');

    t.notOk(dynamoDocStub._get('rcrd-records', 'a-record-id'), 'a record was not created');
  };

  lambda.handler(params, context);
});
