var request = require('browser-request');

var API_URL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var API = {};

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
      callback(err);
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage);
    } else {
      callback(null, response.body);
    }
  });
};

API.createRecord = function (params, callback) {
  request({
    method: 'POST', 
    url: API_URL + 'records', 
    body: JSON.stringify({
      operation: 'create',
      id: params.id,
      raw: params.raw,
      access_token: 'some_bs_access_token'
    }),
    json: true
  }, function (err, response) {
    if (err) {
      callback(err);
    } else if (response.body.errorMessage) {
      callback(response.body.errorMessage);
    } else {
      callback(null, response.body);
    }
  });
};

API.fetchRecords = function (callback) {
    request({
      method: 'POST', 
      url: API_URL + 'records', 
      body: JSON.stringify({
        operation: 'list',
        access_token: 'some_bs_access_token'
      }),
      json: true
    }, function (err, response) {
      if (err) {
        callback(err);
      } else if (response.body.errorMessage) {
        callback(response.body.errorMessage);
      } else {
        var records = response.body.Items;

        records.sort(function (a, b) {
          return Number(b.id) - Number(a.id);
        });

        callback(null, records);
      }
    });
};

module.exports = API;

