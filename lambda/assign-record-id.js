'use strict'

var crypto = require('crypto')

module.exports = function assignRecordID(record) {
  var hashThis = record.time + record.raw
  record.id = crypto.createHash('sha256').update(hashThis).digest('hex')
  return record
}
