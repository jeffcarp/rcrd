import React, { Component } from 'react'
import {
  AsyncStorage,
  View
} from 'react-native'
import styles from './styles'

export default class LoadingPage extends Component {

  componentWillMount () {
    AsyncStorage.getItem('access_token', (err, result) => {
      if (err) {
        console.error(err)
        this.props.loggedOut()
      } else if (result) {
        this.props.loggedIn()
      } else {
        this.props.loggedOut()
      }
    })
  }

  render () {
    return (
      <View style={styles.basicPage} />
    )
  }
}
