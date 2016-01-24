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

module.exports = util;
