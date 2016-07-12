import { AsyncStorage } from 'react-native'
import baseAPI from '../lib/api'

const api = {}

api.fetchLatestRecords = function () {
  AsyncStorage.getItem('access_token')
    .then((access_token) => baseAPI.fetchLatestRecords(access_token))
}

module.exports = api
