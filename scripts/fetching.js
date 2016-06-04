const AWS = require('aws-sdk')
const util = require('../browser/util')

AWS.config.update({
  region: 'us-east-1'
})
const dynamo = new AWS.DynamoDB.DocumentClient()

const fetching = {}

fetching.allRecords = (cb) => {
  dynamo.scan({
    'TableName': 'rcrd-records'
  }, function (err, data) {
    if (err) return console.error(err)
    const records = data.Items
    cb(null, records)
  })
}

fetching.allRecordsWithCat = (catName, cb) => {
  fetching.allRecords((err, records) => {
    if (err) return console.error(err)

    cb(null, records.filter((record) => {
      const cats = util.baseCatsFromRaw(record.raw)
      return cats.indexOf(catName) !== -1
    }))
  })
}

module.exports = fetching
