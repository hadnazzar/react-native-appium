# React Native - Appium Example 

## End to End testing with React native and appium

[React Native](https://github.com/facebook/react-native)


[Appium](http://appium.io/)


### Make it run with 

```bash
npm install
```

### Create your Signed APK (For android)

[Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android#docsNav)

```bash
# Generate a signing key per https://facebook.github.io/react-native/docs/signed-apk-android#docsNav
# Use `111111` as your key and store passwords
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
mv my-release-key.keystore android/app/

# Build the APK
npm run bs:android
```

### Run tests
```bash
# Run unit & integration tests
npm test

# Run E2E tests locally
npm run test:e2e


# Setup for uploading to cloud services
export APP_PATH=$(pwd)/android/app/build/outputs/apk/release/app-release.apk
export APP_EXTENSION=apk

# Sauce Labs free trial per https://signup.saucelabs.com/signup/trial
export SAUCE_USERNAME=
export SAUCE_ACCESS_KEY=
# After you're signed up and logged in, you'll need to go to https://app.testobject.com to try real devices
export TESTOBJECT_ACCESS_KEY=

# BrowserStack free trial per https://www.browserstack.com/users/sign_up
export BROWSERSTACK_USERNAME=
export BROWSERSTACK_ACCESS_KEY=

# Upload and run tests on Sauce Labs (emulated)
npm run upload:e2e:sauce
npm run test:e2e:sauce
# Upload and run tests on Sauce Labs (real devices)
npm run upload:e2e:testobject
npm run test:e2e:testobject

# Run it on BrowserStack
npm run upload:e2e:browserstack
npm run test:e2e:browserstack
```