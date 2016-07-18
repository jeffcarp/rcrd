const AWS = require('aws-sdk')
const doc = require('dynamodb-doc')
const async = require('async')

AWS.config.update({region: 'us-east-1'})

const dynamo = new doc.DynamoDB()

dynamo.scan({
  'TableName': 'rcrd-records'
}, function (err, data) {
  if (err) return console.error(err)

  var records = data.Items

  async.mapLimit(records, 4, function (record, callback) {
    console.log('[begin] ', record.time, record.raw, record.user_id)
    record.user_id = 'gcarpenterv@gmail.com'
    dynamo.putItem({
      'TableName': 'rcrd-records',
      'Item': record
    }, function (err) {
      console.log('[end  ] ', record.time, record.raw)
      callback(err)
    })
  })
})
