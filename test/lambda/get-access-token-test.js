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
    t.equal(tokens.length, 2, 'There should now be 2 access tokens')

    t.equal(data.user.id, 'hi@jeff.is', 'Result contains user email')
    t.equal(data.user.time_zone, 'America/Los_Angeles', 'Result contains user TZ')
    t.equal(data.access_token.id, 'bogus_access_token_id', 'New access token is returned')

    t.end()
  })
})
