'use strict'

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after')
})

test('expired tokens are rejected', function (t) {
  testLambda({
    operation: 'record.get',
    id: 'a-record-id',
    access_token: 'expired_access_token'
  }, function (status, arg) {
    t.equal(status, 'fail', 'status is fail')
    t.equal(arg, 'access_token expired', 'error is "access_token denied"')
    t.end()
  })
})
