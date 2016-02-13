var pluralize = require('pluralize');

var util = {};

util.hasMagnitude = function (str) {
  return !isNaN(str[0]);
};

util.magnitudePortion = function (str) {
  var matches = str.match(/^[\d\.]+/i);
  if (matches) {
    return matches.shift();
  } else {
    return '';
  }
};

util.sansMagnitude = function (str) {
  return str.replace(/^\s*\d+\.*\d*\s*/, '');
};

util.catsFromRaw = function (str) {
  return str.split(',').map(function (cat) {
    return cat.trim();
  });
};

util.allCats = function (records) {
  return records.reduce(function (acc, record) {
    return acc.concat(util.catsFromRaw(record.raw));
  }, []);
}

util.rand = function(num) {
  return Math.floor(Math.random()*num);
};

util.strTo256 = function (str) {
  var num = 0;
  for (var i in str) {
    num += (Number(str.charCodeAt(i)) * 10);
  }

  return num % 256;
};

util.catNameToHue = function (name) {
  var bareName = util.sansMagnitude(name.trim()).trim();
  var bareNameSingular = pluralize(bareName, 1);
  return util.strTo256(bareNameSingular);
};

util.hasDupes = function (arr) {
  var foundDupe = false;
  arr.forEach(function (x, i) {
    arr.forEach(function (y, j) {
      if (i !== j && x === y) foundDupe = true; 
    });
  });

  return foundDupe;
};

module.exports = util;
