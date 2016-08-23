var User = {}

User.isLoggedIn = function () {
  return window.localStorage.email && window.localStorage.access_token
}

User.email = function () {
  return window.localStorage.email
}

User.time_zone = function () {
  return window.localStorage.time_zone
}

User.access_token = function () {
  return window.localStorage.access_token
}

User.expiration = function () {
  return window.localStorage.expiration
}

User.logout = function (options) {
  options = options || {}
  window.localStorage.clear()
  window.location = options.path || '/'
}

module.exports = User
