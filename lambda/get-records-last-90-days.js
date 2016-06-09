const moment = require('moment-timezone')

function timeFromRecord (record) {
  return moment.tz(record.time, record.time_zone)
}

function getRecordsLast90Days (dynamo, params, context) {
  dynamo.scan({
    TableName: 'rcrd-records'
  }, function (err, data) {
    if (err) return context.fail(err)

    const records = data.Items
    const ninetyDaysAgo = moment().subtract(90, 'days')

    const recordsLast90Days = records.filter((record) => (
      timeFromRecord(record).isAfter(ninetyDaysAgo)
    ))

    context.succeed(recordsLast90Days)
  })
}

module.exports = getRecordsLast90Days
