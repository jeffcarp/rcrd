import { catsFromRaw } from '../lib/util'
import React from 'react'
import { View } from 'react-native'
import Cat from './cat'

export default (props) => (
  <View
    style={{
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      flexDirection: 'row',
      padding: 8
    }}>
    {catsFromRaw(props.record.raw).map((catName) => (
      <Cat
        name={catName}
        key={catName}
        onCatPress={props.onCatPress}
        />
    ))}
  </View>
)
