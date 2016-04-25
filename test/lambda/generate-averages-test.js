'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

test('generateGraphs generates... graphs', (t) => {
  const viewDatumID = '2|quick-charts'

  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'yas, nas',
    time: '2016-04-19T19:15:54+00:00',
    time_zone: 'America/Los_Angeles'
  })

  lambdaTest({
    operation: 'generate-graphs'
  }, (status, arg) => {
    t.is(status, 'succeed')

    const viewDatum = dynamoDocStub._get('rcrd-view-data', viewDatumID)
    t.truthy(viewDatum, 'a view datum exists')
    t.is(viewDatum.id, viewDatumID)
    /*
    t.deepEqual(viewDatum.charts, [
      { catName: 'yas', fourWeeks: 0.25, eightWeeks: 0.125, sixteenWeeks: 0.0625 }
    ])
    */

    t.pass()
  })
})
