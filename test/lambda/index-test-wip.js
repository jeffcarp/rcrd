// NOT DONE
/*
var sinon = require('sinon');
var test = require('tape');

var dynamo = require('./dynamo-stub');

var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': {}
});

test('denies access to any operaion other than get-access-token', function (t) {

  var params = {
    operation: 'list'
  };

  dynamo.getItem = sinon.spy(function (opts, cb) {
    cb(['a record']);
  });

  var context = { done: sinon.spy() };

  listRecords(dynamo, params, context);

  t.true(dynamo.scan.called, 'dynamo.scan called');
  t.true(context.done.called, 'context.done called');

  t.end();
});
*/
