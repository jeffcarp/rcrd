'use strict'

import test from 'ava'
const util = require('../../browser/util')

test('util.hasMagnitude', function (t) {
  t.true(util.hasMagnitude('2 drinks'), 'has magnitude: "2 drinks"')
  t.false(util.hasMagnitude('party'), 'does not have magnitude: "party"')
  t.pass()
})

test('util.splitRecordsByYears', (t) => {
  const records = [
    {
      time: '2016-05-22T18:19:19Z',
      time_zone: 'America/Los_Angeles'
    },
    {
      time: '2010-12-22T18:19:19Z',
      time_zone: 'America/Los_Angeles'
    },
    {
      time: '2016-02-22T18:19:19Z',
      time_zone: 'America/Los_Angeles'
    }
  ]

  const actual = util.splitRecordsByYears(records)

  t.deepEqual(actual['2016'], [records[0], records[2]])
  t.is(actual['2015'], undefined)
  t.deepEqual(actual['2010'], [records[1]])

  t.pass()
})
