'use strict'
import test from 'ava'
import lambdaTest from '../support/lambda-test'

test('getSessions gets a user\'s sessions', function (t) {
  lambdaTest({
    operation: 'sessions.list',
    access_token: 'some_bs_access_token'
  }, (status, sessions) => {
    t.is(status, 'succeed')
    t.is(sessions.length, 2)
    t.pass()
  })
})
