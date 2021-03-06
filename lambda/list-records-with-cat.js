function listRecordsWithCat (dynamo, params, context, userID) {
  if (!params.catName) return context.fail('Missing param catName')

  dynamo.scan({
    TableName: 'rcrd-records',
    ScanFilter: dynamo.Condition('raw', 'CONTAINS', params.catName)
  }, function (err, data) {
    if (err) return context.fail(err)

    var records = data.Items

    records = records.filter(function (record) {
      return record.user_id === userID
    })
    records.sort(function (a, b) {
      // TODO: Use time zones
      return (new Date(b.time)) - (new Date(a.time))
    })

    context.succeed(records)
  })
}

module.exports = listRecordsWithCat
