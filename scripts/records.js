const util = require('../browser/util')

const _records = require('../local-records.json')

const Records = {}

Records.withCat = (catName) => {
  return _records.filter((record) => (
    util.baseCatsFromRaw(record.raw).indexOf(catName) !== -1
  ))
}

module.exports = Records
