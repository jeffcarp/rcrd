const AWS = require('aws-sdk')
const crypto = require('crypto')
const doc = require('dynamodb-doc')
const moment = require('moment-timezone')
const async = require('async')

AWS.config.update({region: 'us-east-1'})

const dynamo = new doc.DynamoDB()

dynamo.scan({
  'TableName': 'rcrd-records'
}, function (err, data) {
  if (err) return console.error(err)

  var records = data.Items

  var record = records[0]
  //async.everyLimit(records, function (record, callback) {
    console.log('[begin] ', record.raw, record.time, record.user_id)
    record.user_id = 'gcarpenterv@gmail.com'
    dynamo.putItem({
      'TableName': 'rcrd-records',
      'Item': record
    }, function (err, data) {
      // callback(err)
    })

  //], 4)
})
