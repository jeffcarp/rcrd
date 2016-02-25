var User = {};

User.time_zone = function () {
  var zone = localStorage.time_zone
  if (!zone) throw new Error()
  return zone
}

module.exports = User;

