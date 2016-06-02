'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

test('getAccessToken fails without params.email', (t) => {
  lambdaTest({
    operation: 'get-access-token',
    secret_key: 'bogus'
  }, (status, data) => {
    t.is(status, 'fail', 'status is fail')
    t.is(data, 'email param required', 'error is "email param required"')
    t.pass()
  })
})

test('getAccessToken fails without params.secret_key', (t) => {
  lambdaTest({
    operation: 'get-access-token',
    email: 'hi@jeff.is'
  }, (status, data) => {
    t.is(status, 'fail', 'status is fail')
    t.is(data, 'secret_key param required', 'error is "secret_key param required"')
    t.pass()
  })
})

test('getAccessToken generates a new access token', (t) => {
  lambdaTest({
    operation: 'get-access-token',
    email: 'hi@jeff.is',
    secret_key: 'bogus'
  }, (status, data) => {
    t.is(status, 'succeed', 'status is succeed')
    const tokens = dynamoDocStub._getAll('rcrd-access-tokens')
    t.is(tokens.length, 4, 'There should now be 4 access tokens')

    t.is(data.user.id, 'hi@jeff.is', 'Result contains user email')
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
      t.pass()
    })
  })
})
