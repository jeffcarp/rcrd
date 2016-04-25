const path = require('path')
import test from 'ava'
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('../../lambda/index'), {
  before: require('../lambda/before'),
  after: require('../lambda/after')
})

test('getAccessToken fails without params.email', (t) => {
  testLambda({
    operation: 'get-access-token',
    secret_key: 'bogus'
  }, (status, data) => {
    t.is(status, 'fail', 'status is fail')
    t.is(data, 'email param required', 'error is "email param required"')
    t.pass()
  })
})

test('getAccessToken fails without params.secret_key', (t) => {
  testLambda({
    operation: 'get-access-token',
    email: 'hi@jeff.is'
  }, (status, data) => {
    t.is(status, 'fail', 'status is fail')
    t.is(data, 'secret_key param required', 'error is "secret_key param required"')
    t.pass()
  })
})

test('getAccessToken generates a new access token', (t) => {
  testLambda({
    operation: 'get-access-token',
    email: 'hi@jeff.is',
    secret_key: 'bogus'
  }, (status, data) => {
    t.is(status, 'succeed', 'status is succeed')
    const tokens = dynamoDocStub._getAll('rcrd-access-tokens')
    t.is(tokens.length, 3, 'There should now be 3 access tokens')

    t.is(data.user.id, 'hi@jeff.is', 'Result contains user email')
    t.is(data.user.time_zone, 'America/Los_Angeles', 'Result contains user TZ')
    t.truthy(data.access_token.id, 'New access token is returned')
    t.truthy(data.access_token.expiration, 'access_token.expiration is returned')
    t.truthy(new Date() < new Date(data.access_token.expiration), 'access_token.expiration is in the future')
    t.is(data.access_token.user_id, data.user.id, 'New access token contains user_id')

    testLambda({
      operation: 'heartbeat.authenticated',
      access_token: data.access_token.id
    }, (status, data) => {
      t.is(status, 'succeed', 'New access_token passes authentication')
      t.pass()
    })
  })
})
