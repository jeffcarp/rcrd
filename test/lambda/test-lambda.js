const context = require('./context-stub')
const dynamoDocStub = require('./dynamodb-doc-stub')

function testLambda (params, handler, callback) {
  context.callback = callback
  handler(params, context)
  dynamoDocStub._clear()

  dynamoDocStub._createTable('rcrd-records')

  dynamoDocStub._createTable('rcrd-access-tokens')
  dynamoDocStub._set('rcrd-access-tokens', {
    id: 'some_bs_access_token',
    owner: 'gcarpenterv@gmail.com',
  })
}

module.exports = testLambda;
