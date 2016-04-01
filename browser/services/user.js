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

User.logout = function () {
  delete window.localStorage.email
  delete window.localStorage.access_token

  window.location = '/login'
}

module.exports = User
