'use strict'
import test from 'ava'
import lambdaTest from '../support/lambda-test'

test('expired tokens are rejected', function (t) {
  lambdaTest({
    operation: 'record.get',
    id: 'a-record-id',
    access_token: 'expired_access_token'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token expired', 'error is "access_token expired"')
    t.pass()
  })
})
