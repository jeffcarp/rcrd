var User = {}

User.time_zone = function () {
  return window.localStorage.time_zone
}

User.access_token = function () {
  return window.localStorage.access_token
}

module.exports = User
