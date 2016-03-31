var User = {}

User.time_zone = function () {
  return localStorage.time_zone
}

User.access_token = function () {
  return localStorage.access_token
}

module.exports = User
