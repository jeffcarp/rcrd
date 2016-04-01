var User = {}

User.time_zone = function () {
  return window.localStorage.time_zone
}

User.access_token = function () {
  return window.localStorage.access_token
}

User.logout = function () {
  delete window.localStorage.email
  delete window.localStorage.access_token

  window.location = '/login'
}

module.exports = User
