const context = require('./context-stub')
const dynamoDocStub = require('./dynamodb-doc-stub')

function testLambda (params, handler, callback) {
  context.callback = callback

  dynamoDocStub._set('rcrd-access-tokens', {
    id: 'some_bs_access_token',
    owner: 'gcarpenterv@gmail.com',
  })

  dynamoDocStub._set('rcrd-access-tokens', {
    id: 'expired_access_token',
    owner: 'gcarpenterv@gmail.com',
    expiration: '2016-02-23T22:49:05+00:00',
  })

  handler(params, context)

  dynamoDocStub._clear()
}

module.exports = testLambda;
