const dynamoDocStub = require('./dynamodb-doc-stub')
const proxyquire = require('proxyquire').noCallThru()
const test = require('tape')
const testLambda = require('./test-lambda')

const lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
})

test('getAccessToken fails without params.email', (t) => {
  testLambda({
    operation: 'get-access-token',
    secret_key: 'bogus',
  }, lambda.handler, (status, data) => {
    t.equal(status, 'fail', 'status is fail')
    t.equal(data, 'email param required', 'error is "email param required"')
    t.end()
  })
})

test('getAccessToken fails without params.secret_key', (t) => {
  testLambda({
    operation: 'get-access-token',
    email: 'hi@jeff.is',
  }, lambda.handler, (status, data) => {
    t.equal(status, 'fail', 'status is fail')
    t.equal(data, 'secret_key param required', 'error is "secret_key param required"')
    t.end()
  })
})

test('getAccessToken generates a new access token', (t) => {
  testLambda({
    operation: 'get-access-token',
    email: 'hi@jeff.is',
    secret_key: 'bogus',
  }, lambda.handler, (status, data) => {
    t.equal(status, 'succeed', 'status is succeed')
    const tokens = dynamoDocStub._getAll('rcrd-access-tokens')
    t.equal(tokens.length, 3, 'There should now be 3 access tokens')

    t.equal(data.user.id, 'hi@jeff.is', 'Result contains user email')
    t.equal(data.user.time_zone, 'America/Los_Angeles', 'Result contains user TZ')
    t.ok(data.access_token.id, 'New access token is returned')
    t.ok(data.access_token.expiration, 'access_token.expiration is returned')
    t.ok(new Date() < new Date(data.access_token.expiration), 'access_token.expiration is in the future')
   
    testLambda({
      operation: 'heartbeat.authenticated',
      access_token: data.access_token.id,
    }, lambda.handler, (status, data) => {
      t.equal(status, 'succeed', 'New access_token passes authentication')
      t.end()
    })
  })
})
