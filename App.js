/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Button} from 'react-native';
import Navigator from './Navigator'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Navigator/>
    );
  }
}