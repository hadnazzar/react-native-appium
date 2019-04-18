import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '374402876900-3a80gurej4dr8h46nhth04gcenn179ig.apps.googleusercontent.com',
  redirectUrl: 'com.googleusercontent.apps.374402876900-3a80gurej4dr8h46nhth04gcenn179ig:/oauth2redirect/google',
  scopes: ['openid', 'profile', 'email']
};

const getGoogleProfile = async (token) => {
  try {
   const result = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`)
    .then((response) => response.json())
    return result

  } catch (error) {
    console.log(error)
  }
}

type Props = {};
export default class Home extends Component<Props> {
  state={
    user: null
  }

  alertButton = () => {
    Alert.alert(
      'This is first alert message',
      'My alert Message 1',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    );
  }

  alertButton2 = () => {
    Alert.alert(
      'This is SECOND alert message',
      'My alert Message 2',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    );
  }

  authorize_user = async () => {
    try {
      // Make request to Google to get token
      const authState = await authorize(config)
      const user = await getGoogleProfile(authState.accessToken)

      this.setState({user})
    } catch (error) {
      console.log('error', error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button 
          style={styles.login} 
          onPress={() => this.authorize_user()} 
          title='Login' 
          accessible
          accessibilityLabel="google-signinbutton"
          />
        <Text style={styles.user_details}>{this.state.user && JSON.stringify(this.state.user)}</Text>
        <View 
        accessible={true}
        accessibilityLabel="testview1"
        style={styles.container}>
        <Text 
        accessible={true}
        accessibilityLabel="testtext1"
        style={styles.welcome}>Welcome to React Native! 4</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Button
        accessible
        accessibilityLabel="test-button-1"
        onPress={() => this.alertButton()}
        title="Click me"></Button>
         <Button
        accessible
        accessibilityLabel="test-button-2"
        onPress={() => this.alertButton2()}
        title="Click me too: SECOND"></Button>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  user_details: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
});
