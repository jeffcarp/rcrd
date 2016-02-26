const dynamoDocStub = require('test-lambda').dynamo

module.exports = () => {
  dynamoDocStub._clear()
}
