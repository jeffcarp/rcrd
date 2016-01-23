function hasMagnitude(str) {
  return !isNaN(str[0]);
}

function magnitudePortion(str) {
  var matches = str.match(/^[\d\.]+/i);
  if (matches) {
    return matches.shift();
  } else {
    return '';
  }
}

function sansMagnitude(str) {
  return str.replace(/^\s*\d+\.*\d*\s*/, '');
}

function catsFromRaw(str) {
  return str.split(',').map(function (cat) {
    return cat.trim();
  });
}

module.exports = {
  hasMagnitude: hasMagnitude,
  magnitudePortion: magnitudePortion,
  sansMagnitude: sansMagnitude,
  catsFromRaw: catsFromRaw
};
