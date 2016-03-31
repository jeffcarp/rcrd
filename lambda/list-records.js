'use strict'

function listRecords (dynamo, params, context) {
  dynamo.scan({
    'TableName': 'rcrd-records'
  }, function (err, data) {
    if (err) {
      context.fail(err)
      return
    }

    var records = data.Items

    records.sort(function (a, b) {
      // TODO: Use time zones
      return (new Date(b.time)) - (new Date(a.time))
    })

    context.succeed(records.slice(0, 50))
  })
}

module.exports = listRecords
