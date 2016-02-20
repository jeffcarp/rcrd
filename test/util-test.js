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
    {id: '1454659200000'},
    {id: '1462431600000'},
    {id: '1273042800000'}
  ]

  const actual = util.splitRecordsByYears(records)

  t.deepEqual(actual['2016'], [{id: '1454659200000'}, {id: '1462431600000'}])
  t.equal(actual['2015'], undefined)
  t.deepEqual(actual['2010'], [{id: '1273042800000'}])
})
