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
};

dynamoDoc.prototype.getItem = function (params, callback) {
  if (!params.TableName) return callback('No TableName param')
  if (!store[params.TableName]) return callback('Table not found')

  const item = store[params.TableName][params.id]
  
  callback(null, item)
}

dynamoDoc.prototype.deleteItem = function (params, callback) {
  if (!params.TableName) return callback('No TableName param')
  if (!store[params.TableName]) return callback('Table not found')
  if (!store[params.id]) return callback('Not passed id')

  delete store[params.TableName][params.id]
  callback(null, null);
}

dynamoDoc.prototype.putItem = function (params, callback) {
  if (!params.TableName) return callback('No TableName param')
  if (!store[params.TableName]) return callback('Table not found')
  if (!params.Item) return callback('Not passed Item')
  if (!params.Item.id) return callback('Not passed Item.id')

  store[params.TableName] = params.Item
  callback(null, params.Item)
}

function _set(tableName, item) {
  store[tableName][item.id] = item
}

function _get(tableName, id) {
  return store[tableName] && store[tableName][item.id]
}

function _createTable(tableName) {
  if (store[tableName]) throw new Error('Table already exists')

  store[tableName] = []
}

function _clear() {
  store = {};
}

module.exports = {
  DynamoDB: dynamoDoc,
  _set: _set,
  _get: _get,
  _createTable: _createTable,
  _clear: _clear,
};
