'use strict'

const test = require('tape')
const util = require('../lib/util')

test('util.hasMagnitude', function (t) {
  t.plan(2)

  t.true(util.hasMagnitude('2 drinks'), 'has magnitude: "2 drinks"')

  t.false(util.hasMagnitude('party'), 'does not have magnitude: "party"')
})

test('util.splitRecordsByYears', (t) => {
  t.plan(3)

  const records = [
    {id: 'user_id|2016-05-22T18:19:19+10:00'},
    {id: 'user_id|2010-12-22T18:19:19-02:00'},
    {id: 'user_id|2016-02-22T18:19:19+07:00'}
  ]

  const actual = util.splitRecordsByYears(records)

  t.deepEqual(actual['2016'], [records[0], records[2]])
  t.equal(actual['2015'], undefined)
  t.deepEqual(actual['2010'], [records[1]])
})
