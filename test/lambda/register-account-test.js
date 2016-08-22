'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda'

test('fails without params.email', (t) => {
  lambdaTest({
    operation: 'account.register',
    password: 'bogus'
  }, (status, data) => {
    t.is(status, 'fail', 'status is fail')
    t.pass()
  })
})

test('fails without params.password', (t) => {
  lambdaTest({
    operation: 'account.register',
    email: 'bogus@bogus.com'
  }, (status, data) => {
    t.is(status, 'fail', 'status is fail')
    t.pass()
  })
})

test('fails if account exists', (t) => {
  dynamoDocStub._set('rcrd-users', {
    id: 'bogus@bogus.com',
    hash: 'yas',
    time_zone: 'America/Los_Angeles'
  })

  lambdaTest({
    operation: 'account.register',
    email: 'bogus@bogus.com',
    password: 'yyaass'
  }, (status, data) => {
    t.is(status, 'fail', 'status is fail')
    t.is(data, 'Email already exists')
    t.pass()
  })
})

test('creates a new account and returns it', (t) => {
  lambdaTest({
    operation: 'account.register',
    email: 'bogus@bogus.com',
    password: 'yyaass'
  }, (status, data) => {
    t.is(status, 'succeed')
    t.is(dynamoDocStub._getAll('rcrd-access-tokens').length, 4)

    t.is(data.user.id, 'bogus@bogus.com', 'Result contains user email')
    t.is(data.user.time_zone, 'America/Los_Angeles', 'Result contains user TZ')
    t.truthy(data.access_token.id, 'New access token is returned')
    t.truthy(data.access_token.expiration, 'access_token.expiration is returned')

    var thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    var thirtyDaysFromNowHour = Math.floor(thirtyDaysFromNow.getTime() / 1e3 / 60)
    var expirationHour = Math.floor((new Date(data.access_token.expiration)).getTime() / 1e3 / 60)

    t.is(thirtyDaysFromNowHour, expirationHour, 'access_token.expiration is exactly 30 days in the future')
    t.is(data.access_token.user_id, data.user.id, 'New access token contains user_id')

    lambdaTest({
      operation: 'heartbeat.authenticated',
      access_token: data.access_token.id
    }, (status, data) => {
      t.is(status, 'succeed', 'New access_token passes authentication')

      lambdaTest({
        operation: 'get-access-token',
        email: 'bogus@bogus.com',
        secret_key: 'yyaass'
      }, (status, data) => {
        t.is(status, 'succeed', 'New user can get an access token')
        t.is(data.user.id, 'bogus@bogus.com')
        t.truthy(data.access_token.id)
        t.pass()
      })
    })
  })
})
