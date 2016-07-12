import React, { Component } from 'react'
import {
  ListView,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import Record from '../record'
import api from '../api'

export default class IndexPage extends Component {

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
    console.log('ok')
/*
    api.fetchLatestRecords().then((records) => {
      this.setState({
        records: records,
        dataSource: this.state.dataSource.cloneWithRows(records)
      })
    }).catch((err) => {
      console.log(err)
      this.props.logout()
    })
*/
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
            placeholder='wtfOne, two, three'
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
