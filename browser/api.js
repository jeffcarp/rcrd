'use strict'
var bus = require('./bus')()
var constants = require('./constants')
var request = require('browser-request')
var store = require('store')
var User = require('./services/user')

var API_URL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/'
if (constants.localAPI) {
  API_URL = 'http://localhost:8000/api/'
}

var API = {}

function APIrequest (body, callback) {
  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify(body),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else if (response.body.errorMessage) {
      if (response.body.errorMessage === 'access_token denied') {
        bus.emit('notification', 'Your access token is no longer valid, please log in again.')
        setTimeout(User.logout, 2e3)
      } else if (response.body.errorMessage === 'access_token expired') {
        bus.emit('notification', 'Your access token has expired, please log in again.')
        setTimeout(User.logout, 2e3)
      } else {
        callback(response.body.errorMessage)
      }
    } else {
      callback(null, response.body)
    }
  })
}

API.login = function (email, password, callback) {
  APIrequest({
    operation: 'get-access-token',
    email: email,
    secret_key: password
  }, callback)
}

API.createRecord = function (params, callback) {
  APIrequest({
    operation: 'create',
    id: params.id,
    raw: params.raw,
    time: params.time,
    time_zone: params.time_zone,
    access_token: User.access_token()
  }, function (err, record) {
    if (record) {
      bus.emit('record-created-or-updated', record)
    }
    callback(err, record)
  })
}

API.fetchRecord = function (id, callback) {
  APIrequest({
    operation: 'record.get',
    id: id,
    access_token: User.access_token()
  }, callback)
}

API.deleteRecord = function (id, callback) {
  APIrequest({
    operation: 'record.delete',
    id: id,
    access_token: User.access_token()
  }, callback)
}

API.fetchRecords = function (callback) {
  APIrequest({
    operation: 'list',
    access_token: User.access_token()
  }, callback)
}

API.fetchRecordsWithCat = function (name, callback) {
  APIrequest({
    operation: 'list-records-with-cat',
    catName: name,
    access_token: User.access_token()
  }, callback)
}

API.getSessions = function (callback) {
  APIrequest({
    operation: 'sessions.list',
    access_token: User.access_token()
  }, callback)
}

API.viewData = function (id, callback) {
  // hard coded prototyping, will change
  var userID = '2'
  var fullID = userID + '|' + id

  APIrequest({
    operation: 'view-data',
    id: fullID,
    access_token: User.access_token()
  }, callback)
}

API.viewDataCached = function (id, callback) {
  // hard coded prototyping, will change
  var key = '2|' + id

  var cached = store.get(key)
  if (cached) {
    callback(null, cached)
  }

  API.viewData(id, function (err, data) {
    if (!err) store.set(key, data)
    callback(err, data)
  })
}

API.last90Days = function (callback) {
  APIrequest({
    operation: 'record.get-last-90-days',
    access_token: User.access_token()
  }, callback)
}

API.last90DaysCached = function (callback) {
  // hard coded prototyping, will change
  var key = '2|last-90'

  var cached = store.get(key)
  if (cached) {
    callback(null, cached)
  }

  API.last90Days(function (err, data) {
    if (!err) store.set(key, data)
    callback(err, data)
  })
}

module.exports = API
