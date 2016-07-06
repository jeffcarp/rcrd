/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  ListView,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import Cat from './native/cat'
import Record from './native/record'

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
    window.fetch('http://localhost:8000/api/records', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operation: 'list',
        access_token: '0fdf2f89b058cc301a8ea8829c94f4c05c3d7d23ea1917e4'
      })
    })
    .then((response) => response.json())
    .then((records) => {
      this.setState({
        records: records,
        dataSource: this.state.dataSource.cloneWithRows(records)
      })
    })
    .catch((error) => {
      console.warn(error)
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
          paddingTop: 30
        }}>
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

class SimpleNavigationApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) => {
          //if (route.index === 0) {
            return (
              <AwesomeProject
                  navigateForward={() => {
                    console.log('navigate forward')
                    const nextIndex = route.index + 1
                    navigator.push({
                      title: 'Scene ' + nextIndex,
                      index: nextIndex
                    })
                  }}
                 />
            )
          //}
/*
          <MyScene
            title={route.title}
            onForward={ () => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
*/
        }}
      />
    )
  }
}

class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => SimpleNavigationApp)
