'use strict'
const dynamoDocStub = require('test-lambda').dynamo
const path = require('path')
const testLambda = require('test-lambda')

module.exports = testLambda.test(path.resolve('../../lambda/index'), {
  before: () => {
    dynamoDocStub._set('rcrd-users', {
      id: 'hi@jeff.is',
      hash: '88FvUlobfCBPyVPW19txaNhOv0kC+Dw6N9ETsYwomB8=',
      time_zone: 'America/Los_Angeles'
    })

    dynamoDocStub._set('rcrd-access-tokens', {
      id: 'some_bs_access_token',
      owner: 'hi@jeff.is'
      // this should fail without expiration
      // and without user_id
    })

    dynamoDocStub._set('rcrd-access-tokens', {
      id: 'expired_access_token',
      owner: 'hi@jeff.is',
      expiration: '2016-02-23T22:49:05+00:00'
    })
  },
  after: () => {
    dynamoDocStub._clear()
  }
})
