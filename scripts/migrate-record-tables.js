const AWS = require('aws-sdk')
const crypto = require('crypto')
const doc = require('dynamodb-doc')
const moment = require('moment-timezone')

AWS.config.update({region: 'us-east-1'})

const dynamo = new doc.DynamoDB()

dynamo.scan({
  'TableName': 'test-for-rcrd'
}, function (err, data) {
  if (err) return console.error(err)

  var records = data.Items;
  var record

  var i = 0

  var inter = setInterval(function () {

    if (i === records.length) return clearInterval(inter)

    record = records[i]
    i++
    console.log(record)

    var time = moment.utc(moment.unix(record.id / 1e3)).format()
    console.log(time)

    var hashThis = time + record.raw
    var id = crypto.createHash('sha256').update(hashThis).digest('hex')


    var newRecord = {
      id: id,
      raw: record.raw,
      time: time,
      time_zone: 'America/Los_Angeles'
    }

    dynamo.putItem({
      "TableName": "rcrd-records",
      "Item": newRecord
    }, function (err, data) {
      console.log(err, data)
    });

  }, 3e3)
})
