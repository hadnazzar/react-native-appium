import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Screens/Home'
// import LocationScreen from './Screens/Home'
// import CameraScreen from './Screens/Home'
// import ScrollViewScreen from './Screens/Home'
// import ContactsScreen from './Screens/Home'

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  GPS: SettingsScreen,
  Camera: SettingsScreen,
  Notify: SettingsScreen,
  Imagelist: SettingsScreen,
  Contacts: SettingsScreen,
});

const AppContainer = createAppContainer(TabNavigator);

export default class Navigator extends React.Component {
  render() {
    return <AppContainer />;
  }
}
