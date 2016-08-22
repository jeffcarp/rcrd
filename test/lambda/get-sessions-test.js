'use strict'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda'
import test from 'ava'

test('getSessions gets a user\'s sessions', function (t) {
  lambdaTest({
    operation: 'sessions.list',
    access_token: 'some_bs_access_token'
  }, (status, sessions) => {
    t.is(dynamoDocStub._getAll('rcrd-access-tokens').length, 3)
    t.is(status, 'succeed')
    t.is(sessions.length, 2)
    t.pass()
  })
})
