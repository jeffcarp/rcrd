const context = require('./context-stub')
const dynamoDocStub = require('./dynamodb-doc-stub')

function testLambda (params, handler, callback) {
  context.callback = callback
  handler(params, context)
  dynamoDocStub._clear()
}

module.exports = testLambda;
