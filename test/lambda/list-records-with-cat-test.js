var sinon = require('sinon');
var test = require('tape');

var listRecordsWithCat = require('../../lambda/list-records-with-cat');

test('listRecordsWithCat succeeds with params.catName', function (t) {

  var dynamo = {
    Condition: sinon.spy(),
    scan: sinon.spy(function (opts, cb) {
      cb(['a record']);
    })
  };
  var params = {
    catName: 'yas'
  };
  var context = { 
    fail: sinon.spy(),
    done: sinon.spy() 
  };

  listRecordsWithCat(dynamo, params, context);

  t.false(context.fail.called, 'context.fail not called');
  t.true(context.done.called, 'context.done called');

  t.end();
});

test('listRecordsWithCat fails without params.catName', function (t) {

  var dynamo = {
    Condition: sinon.spy(),
    scan: sinon.spy(function (opts, cb) {
      cb(['a record']);
    })
  };
  var params = {};
  var context = { 
    fail: sinon.spy(),
    done: sinon.spy() 
  };

  listRecordsWithCat(dynamo, params, context);

  t.true(context.fail.called, 'context.fail called');
  t.false(context.done.called, 'context.done not called');

  t.end();
});
