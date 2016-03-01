var util = {};

util.catsFromRaw = function (str) {
  return str.split(',').map(function (cat) {
    return cat.trim();
  });
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

util.sansMagnitude = function (str) {
  return str.replace(/^\s*\d+\.*\d*\s*/, '');
};

util.allCats = function (records) {
  return records.reduce(function (acc, record) {
    return acc.concat(util.catsFromRaw(record.raw));
  }, []);
}

module.exports = util;
