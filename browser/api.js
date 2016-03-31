var bus = require('./bus')()
var constants = require('./constants')
var request = require('browser-request')
var User = require('./services/user')

if (constants.localAPI) {
  var API_URL = 'http://localhost:8000/api/'
} else {
  var API_URL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/'
}

var API = {}

API.login = function (email, password, callback) {
  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify({
      operation: 'get-access-token',
      email: email,
      secret_key: password
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage)
    } else {
      callback(null, response.body)
    }
  })
}

API.createRecord = function (params, callback) {
  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify({
      operation: 'create',
      id: params.id,
      raw: params.raw,
      time: params.time,
      time_zone: params.time_zone,
      access_token: User.access_token(),
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage)
    } else {
      bus.emit('record-created-or-updated', response.body)
      callback(null, response.body)
    }
  })
}

API.fetchRecord = function (id, callback) {
  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify({
      operation: 'record.get',
      id: id,
      access_token: User.access_token(),
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage)
    } else {
      var record = response.body.Item

      callback(null, record)
    }
  })
}

API.deleteRecord = function (id, callback) {
  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify({
      operation: 'record.delete',
      id: id,
      access_token: User.access_token(),
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else {
      callback(null, null)
    }
  })
}

API.fetchRecords = function (callback) {
  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify({
      operation: 'list',
      access_token: User.access_token(),
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage)
    } else {
      var records = response.body

      callback(null, records)
    }
  })
}

API.fetchRecordsWithCat = function (name, callback) {
  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify({
      operation: 'list-records-with-cat',
      catName: name,
      access_token: User.access_token(),
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage)
    } else {
      callback(null, response.body)
    }
  })
}

API.viewData = function (id, callback) {
  var userID = '2'
  var fullID = userID + '|' + id

  request({
    method: 'POST',
    url: API_URL + 'records',
    body: JSON.stringify({
      operation: 'view-data',
      id: fullID,
      access_token: User.access_token(),
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err)
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage)
    } else {
      var data = response.body.Item

      callback(null, data)
    }
  })
}

module.exports = API
