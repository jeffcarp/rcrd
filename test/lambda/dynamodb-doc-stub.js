'use strict';

var dynamoDoc = function () {}
var store = {}

dynamoDoc.prototype.Condition = function (attr, operation, value) {
  return {
    attr: attr,
    operation: operation,
    value: value,
  }
}

dynamoDoc.prototype.scan = function (params, callback) {
  if (!params.TableName) return callback('No TableName param')
  if (!store[params.TableName]) return callback('Table not found')

  let allOfEm = Object.keys(store[params.TableName]).map(key => {
    return store[params.TableName][key]  
  })

  if (params.ScanFilter) {
    if (params.ScanFilter.operation === 'CONTAINS') {
      allOfEm = allOfEm.filter((item) => {
        return item[params.ScanFilter.attr].indexOf(params.ScanFilter.value) !== -1
      }) 
    }
  }

  callback(null, { Items: allOfEm })
}

dynamoDoc.prototype.getItem = function (params, callback) {
  if (!params.TableName) return callback('getItem not passed TableName')
  if (!params.Key) return callback('getItem not passed Key')
  if (!params.Key.id) return callback('getItem not passed Key.id')
  if (!store[params.TableName]) return callback('Table not found.')

  const item = store[params.TableName][params.Key.id]
  callback(null, { Item: item })
}

dynamoDoc.prototype.putItem = function (params, callback) {
  if (!params.Item) return callback('putItem not passed Item')
  if (!params.TableName) return callback('putItem not passed TableName')
  if (!params.Item.id) return callback('putItem not passed Item.id')

  _set(params.TableName, params.Item)
  callback(null, params.Item)
}

dynamoDoc.prototype.deleteItem = function (params, callback) {
  if (!params.TableName) return callback('deleteItem not passed TableName')
  if (!params.Key) return callback('deleteItem not passed Key')
  if (!params.Key.id) return callback('deleteItem not passed Key.id')
  if (!store[params.TableName]) return callback('Table not found.')

  delete store[params.TableName][params.Key.id]
  callback(null, null);
};


function _get(table, id) {
  store[table] = store[table] || {}
  return store[table][id];
};

function _getAll(table) {
  return Object.keys(store[table]).map(key => {
    return store[table][key]  
  })
}

function _set(table, item) {
  store[table] = store[table] || {}
  store[table][item.id] = item
}

function _clear() {
  store = {}
}

function _store() {
  return store
}

module.exports = {
  DynamoDB: dynamoDoc,
  _set: _set,
  _get: _get,
  _getAll: _getAll,
  _clear: _clear,
  _store: _store,
};
