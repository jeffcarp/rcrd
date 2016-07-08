import React, { Component } from 'react'
import {
  AsyncStorage,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import styles from './styles'
import Cat from './cat'
import api from '../lib/api'

export default class LoginPage extends Component {

  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  autoLogin () {
    console.log('autologin')
    this.setState({
      email: 'dev@rcrd.org',
      password: 'dev'
    })

    setTimeout(() => this.login(), 500)
  }

  login () {
    // this.setState({ loading: true })
    api.login({
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      console.log(response)
      // this.setState({ loading: false })
      Promise.all([
        AsyncStorage.setItem('email', response.user.id),
        AsyncStorage.setItem('time_zone', response.user.time_zone),
        AsyncStorage.setItem('access_token', response.access_token.id),
        AsyncStorage.setItem('expiration', response.access_token.expiration)
      ]).then(() => {
        console.log('we good')
        this.props.loginSuccess()
      })
    })
  }

  render () {
    return (
      <View style={styles.basicPage}>
        <StatusBar barStyle='default' />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 8
          }}>
          <Cat name='login' onCatPress={() => false} />
          <Cat name='to' onCatPress={() => false} />
          <Cat name='rcrd' onCatPress={() => false} />
        </View>

        <TextInput
          style={styles.input}
          placeholder='email@email.com'
          keyboardType='email-address'
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          />

        <TextInput
          style={styles.input}
          placeholder='password'
          secureTextEntry
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          />

        <View
          style={{
            marginBottom: 20
          }}>
          <TouchableOpacity onPress={() => this.autoLogin()}>
            <Text>Auto login as dev@rcrd.org</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
