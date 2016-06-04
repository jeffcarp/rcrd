const util = require('../browser/util')

const Record = {}

Record.allRecordsWithCat = (catName, cb) => {
/*
  fetching.allRecords((err, records) => {
    if (err) return console.error(err)

    cb(null, records.filter((record) => {
      const cats = util.baseCatsFromRaw(record.raw)
      return cats.indexOf(catName) !== -1
    }))
  })
*/
}

module.exports = Record
