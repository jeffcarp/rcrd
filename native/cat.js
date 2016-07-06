import { catNameToHue } from '../lib/util'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default (props) => (
  <TouchableOpacity onPress={props.onCatPress}>
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
  </TouchableOpacity>
)
