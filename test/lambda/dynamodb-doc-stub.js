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
    if (records[params.Key]) {
      callback(null, records[params.Key]);
    } else {
      callback('Record not found');
    }
  }
};

dynamoDoc.prototype.updateItem = function (params, callback) {
  if (records[params.Key]) {
    var updateObj = params.AttributeUpdates.Value;
    var updateKey = Object.keys(params.AttributeUpdates.Value)[0];
    var updateValue = updateObj[updateKey];

    var record = records[params.Key];
    record[updateKey] = updateValue;
    
    callback(null, record);
  } else {
    callback('Record not found');
  }
};

function _addRecord(record) {
  if (!record || !record.Key) return;

  records[record.Key] = record;
};

function _getRecord(id, record) {
  return records[id];
};

module.exports = {
  DynamoDB: dynamoDoc,
  _addRecord: _addRecord,
  _getRecord: _getRecord,
};
