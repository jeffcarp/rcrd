function listRecordsWithCat(dynamo, params, context) {
  if (!params.catName) return context.fail('Missing param catName')

  dynamo.scan({
    TableName: 'rcrd-records',
    ScanFilter: dynamo.Condition('raw', 'CONTAINS', params.catName)
  }, function (err, data) {
    if (err) return context.fail(err)

    var records = data.Items

    records.sort(function (a, b) {
      // TODO: Use time zones
      return (new Date(b.time)) - (new Date(a.time))
    })

    context.succeed(records.slice(0, 50))
  })
}

module.exports = listRecordsWithCat
