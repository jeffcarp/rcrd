const util = require('../browser/util')
const moment = require('moment')

const _records = require('../local-records.json')

const Records = {}

Records.withCat = (catName) => {
  return _records.filter((record) => (
    util.baseCatsFromRaw(record.raw).indexOf(catName) !== -1
  ))
}

Records.last90Days = (catName) => {
  const ninetyDaysAgo = moment().subtract(90, 'days')

  return _records.filter((record) => (
    util.timeFromRecord(record).isAfter(ninetyDaysAgo)
  ))
}

module.exports = Records
