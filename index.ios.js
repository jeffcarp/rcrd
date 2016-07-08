/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  AsyncStorage,
  ListView,
  Navigator,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import Cat from './native/cat'
import Record from './native/record'
import api from './lib/api'
import styles from './native/styles'

const User = {
  isLoggedIn: false
}

class AwesomeProject extends Component {

  constructor (props, context) {
    super(props, context)

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })

    this.state = {
      text: '',
      records: [],
      dataSource: ds.cloneWithRows([])
    }
  }

  componentWillMount () {
    api.fetchLatestRecords()
      .then((records) => {
/*
TODO
        this.setState({
          records: records,
          dataSource: this.state.dataSource.cloneWithRows(records)
        })
*/
      })
      .catch((error) => console.warn(error))
  }

  _onPressButton () {
    this.setState({
      text: this.state.text + ', workout'
    })
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          backgroundColor: '#F5FCFF',
          paddingTop: 20
        }}>
        <StatusBar barStyle='default' />
        <View
          style={{
            flex: 1,
            padding: 10
          }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              padding: 4,
              marginBottom: 10
            }}
            placeholder='One, two, three'
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
          <View
            style={{
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              flexDirection: 'row'
            }}>
            <TouchableHighlight onPress={this._onPressButton.bind(this)}>
              <Text
                style={{
                  color: 'hsl(14, 50%, 60%)',
                  borderColor: 'hsl(14, 50%, 60%)',
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: 8
                }}>
                Workout
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <ListView
            style={{
              borderTopColor: '#ccc',
              borderTopWidth: 1
            }}
            dataSource={this.state.dataSource}
            enableEmptySections
            renderRow={(record) => (
              <Record
                record={record}
                key={record.id}
                onCatPress={this.props.navigateForward}
                />
            )}
          />
        </View>
      </View>
    )
  }
}

class CatPage extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#F5FCFF',
          marginTop: 20,
          flexDirection: 'column',
          padding: 8,
          flex: 1
        }}>
        <StatusBar barStyle='default' />

        <View
          style={{
            marginBottom: 20
          }}>
          <TouchableOpacity onPress={this.props.navigateBack}>
            <Text
              style={{
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start'
          }}>
          <Cat name={this.props.route.catName} onCatPress={() => false} />
        </View>
      </View>
    )
  }
}

class LoginPage extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  autoLogin() {
    console.log('autologin')
    this.setState({
      email: 'dev@rcrd.org',
      password: 'dev'
    })

    setTimeout(() => this.login(), 500)
  }

  login() {
    //this.setState({ loading: true })
    console.log('login')
    api.login({
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      console.log(response)
      //this.setState({ loading: false })
      AsyncStorage.setItem('email', response.user.id)
      AsyncStorage.setItem('time_zone', response.user.time_zone)
      AsyncStorage.setItem('access_token', response.access_token.id)
      AsyncStorage.setItem('expiration', response.access_token.expiration)
      console.log('we good')
      User.isLoggedIn = true
      // navigate
      this.props.loginSuccess()
    })
  }

  render() {
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

class SimpleNavigationApp extends Component {
  render() {

    var initialRoute = { index: 0}
    if (User.isLoggedIn) {
      initialRoute = { index: 1 }
    }

    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={(route, navigator) => {
          if (route.index === 0) {
            return (
              <LoginPage
                loginSuccess={() => {
                  navigator.push({ index: 1 })
                }}
                />
            )
          } else if (route.index === 1) {
            return (
              <AwesomeProject
                navigateForward={(catName) => {
                  console.log('navigate forward')
                  const nextIndex = route.index + 1
                  navigator.push({
                    title: 'Scene ' + nextIndex,
                    index: nextIndex,
                    catName: catName
                  })
                }}
               />
            )
          } else {
            return (
              <CatPage
                route={route}
                navigateBack={() => {navigator.pop(); console.log('yas');}}
                />
            )
          }
        }}
      />
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => SimpleNavigationApp)
