/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  Navigator
} from 'react-native'
import CatPage from './native/cat-page'
import LoadingPage from './native/loading-page'
import LoginPage from './native/login-page'
import IndexPage from './native/index-page'

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
              <IndexPage
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
