const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-east-1'
})
const dynamo = new AWS.DynamoDB.DocumentClient()

const fetching = {}

fetching.getLocalCopy = (cb) => {
  dynamo.scan({
    'TableName': 'rcrd-records'
  }, function (err, data) {
    if (err) cb(err)
    else cb(null, data.Items)
  })
}

module.exports = fetching
