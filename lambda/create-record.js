'use strict';

var crypto = require('crypto')
var util = require('./util')

function createRecord(dynamo, params, context) {

  if (params.id) {
    // Updating

    var newRecord = {
      id: params.id
    }

    if (params.raw) newRecord.raw = params.raw
    if (params.time) newRecord.time = params.time
    if (params.time_zone) newRecord.time_zone = params.time_zone
  } else {
    // Creating

    if (!params.raw || !params.time || !params.time_zone) {
      return context.fail('Missing param');
    }

    // Add user_id to this
    var hashThis = params.time + params.raw
    var id = crypto.createHash('sha256').update(hashThis).digest('hex')

    var newRecord = {
      id: id,
      raw: params.raw,
      time: params.time,
      time_zone: params.time_zone
    }
  }

  var cats = util.catsFromRaw(params.raw); 
  if (util.hasDupes(cats.map(util.sansMagnitude))) {
    return context.fail('Records cannot have duplicate cats.');
  }

  dynamo.putItem({
    "TableName": "rcrd-records",
    "Item": newRecord,
  }, function (err) {
    if (err) return context.fail(err)

    dynamo.scan({
      TableName: 'rcrd-records'
    }, function (err, data) {
      if (err) return context.fail(err)

      var records = data.Items;
      var catNumbers = {};

      util.allCats(records).forEach(function (name) {
        name = util.sansMagnitude(name);
        if (catNumbers[name]) {
          catNumbers[name] += 1;
        } else {
          catNumbers[name] = 1;
        }
      });

      var catNumberArray = [];
      for (var name in catNumbers) {
        catNumberArray.push({name: name, num: catNumbers[name]})
      }

      catNumberArray.sort(function (a, b) {
        return b.num - a.num
      });

      var top20Cats = catNumberArray
        .map(function (catNum) { return catNum.name })
        .slice(0, 20)

      dynamo.putItem({
        TableName: 'rcrd-view-data',
        Item: {
          id: '2|top-20-cats',
          cats: top20Cats,
        }
      }, function (err) {
        if (err) return context.fail(err)

        context.succeed(newRecord)
      })
    })
  })
}

module.exports = createRecord;
