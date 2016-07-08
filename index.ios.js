/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
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
import LoadingPage from './native/loading-page'
import LoginPage from './native/login-page'

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
    AsyncStorage.getItem('access_token')
      .then((access_token) => api.fetchLatestRecords(access_token))
      .then((records) => {
        this.setState({
          records: records,
          dataSource: this.state.dataSource.cloneWithRows(records)
        })
      })
      .catch((err) => {
        console.log(err)
        this.props.logout()
      })
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
  render () {
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

class SimpleNavigationApp extends Component {

  render () {
    return (
      <Navigator
        initialRoute={{ initialLoading: true }}
        renderScene={(route, navigator) => {
          if (route.initialLoading) {
            return (
              <LoadingPage
                loggedIn={() => {
                  navigator.replace({ index: 1 })
                }}
                loggedOut={() => {
                  navigator.replace({ index: 0 })
                }}
                />
            )
          } else if (route.index === 0) {
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
                logout={() => navigator.replace({index: 0})}
               />
            )
          } else {
            return (
              <CatPage
                route={route}
                navigateBack={() => {
                  navigator.pop()
                }}
                />
            )
          }
        }}
      />
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => SimpleNavigationApp)
