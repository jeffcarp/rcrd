import React, { Component } from 'react'
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Cat from './cat'

export default class CatPage extends Component {
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

        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={this.props.navigateBack}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start'
          }}>
          <Cat name={this.props.catName} onCatPress={() => false} />
        </View>
      </View>
    )
  }
}

