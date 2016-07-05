/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  ListView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import util from './lib/util'

function strTo256 (str) {
  var num = 0
  for (var i in str) {
    num += (Number(str.charCodeAt(i)) * 10)
  }

  return num % 256
}

function catNameToHue (name) {
  var bareName = util.sansMagnitude(name.trim()).trim()
  // var bareNameSingular = pluralize(bareName, 1)
  return strTo256(bareName)
}

const Cat = (props) => (
  <Text
    style={{
      color: 'white',
      backgroundColor: `hsl(${catNameToHue(props.name)}, 50%, 60%)`,
      borderRadius: 4,
      padding: 8,
      marginBottom: 4,
      marginRight: 4
    }}>
    {props.name}
  </Text>
)

function catsFromRaw (raw) {
  raw = raw || ''
  return raw.split(', ')
}

const Record = (props) => (
  <View
    style={{
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      flexDirection: 'row',
      padding: 8
    }}>
    {catsFromRaw(props.record.raw).map((catName) => <Cat name={catName} key={catName} />)}
  </View>
)

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
        access_token: '211f8f0b1b7ce545c90016a3a9a89a052aa448dc259cef9d'
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
    console.log('yes', this)
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
            renderRow={(record) => <Record record={record} key={record.id} />}
          />
        </View>
      </View>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
