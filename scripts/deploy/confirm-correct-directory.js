var fs = require('fs');

function confirmCorrectDirectory() {
  try {
    var packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  } catch (e) {
    throw new Error('Must deploy from root of rcrd package');
  }

  if (packageJSON.name !== 'rcrd') {
    throw new Error('Must deploy from root of rcrd package');
  }
}

module.exports = confirmCorrectDirectory;
