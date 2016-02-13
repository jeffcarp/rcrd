'use strict';

var dynamoDoc = function () {};
var records = {};

dynamoDoc.scan = function () {};

dynamoDoc.prototype.getItem = function (params, callback) {
  if (params.TableName === 'rcrd-access-tokens') {
    if (params.Key && params.Key.access_token) {
      callback(); 
    } else {
      callback('denied'); 
    }
  } else {
    if (params.Key && params.Key.id && records[params.Key.id]) {
      callback(null, records[params.Key.id]);
    } else {
      callback('Record not found');
    }
  }
};

dynamoDoc.prototype.deleteItem = function (params, callback) {
  if (params.Key && params.Key.id) {
    delete records[params.Key.id];
    callback(null, null);
  } else {
    callback('Record not found');
  }
};

dynamoDoc.prototype.putItem = function (params, callback) {
  if (params.Item) {
    var record = params.Item;
    if (record.id) {
      records[record.id] = record;
      callback(null, record);
    } else {
      callback('putItem Item needs id');
    }
  } else {
      callback('putItem not passed Item');
  }
};

function _setRecord(record) {
  if (!record || !record.id) return;

  records[record.id] = record;
};

function _getRecord(id) {
  return records[id];
};

function _clear() {
  records = {};
}

module.exports = {
  DynamoDB: dynamoDoc,
  _setRecord: _setRecord,
  _getRecord: _getRecord,
  _clear: _clear,
};
