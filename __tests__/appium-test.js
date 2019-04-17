const wdio = require('webdriverio');
const assert = require('chai').assert;
const path = require('path')


const androidOpt = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: 'Android Emulator',
  platformVersion: null,
  app: undefined // Will be added in tests
};

const serverConfig = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'info'
};

const androidOptions = Object.assign(
  {
    capabilities: androidOpt
  },
  serverConfig
);

const app = path.resolve(__dirname, '..', 'android', 'app','build','outputs','apk','release', 'app-release.apk')
androidOptions.capabilities.app = app;

let client;

before(async function () {
  client = await wdio.remote(androidOptions);
});

describe('Create Android session', function () {

  beforeEach(async function () {
    console.info('[beforeEach] client.getPageSource()', await client.getPageSource()) // eslint-disable-line no-console
    console.info('[beforeEach] pausing for 5 seconds between tests...') // eslint-disable-line no-console
  })

  it('should create and destroy a session', async function () {
    const res = await client.status();
    assert.isObject(res.build);
    console.log(res)

    const current_package = await client.getCurrentPackage();
    assert.strictEqual(current_package, 'com.apktest');
  });

  it('should show battery info', async function(){
    var result = await client.execute('mobile:batteryInfo')
    console.log("Battery:", result)
    assert.isObject(result)
  })

  it('should press 100x250 section', async function(){
    client.touchPerform([
      { action: 'press', options: { x: 100, y: 250 }},
      { action: 'release' }
    ]);
    console.log('press completed')
  })

  it('get location succesfully', async function(){

   console.log('CLIENT:')
   console.log(client)
  })

  it('finds a tab (by accessibilityLabel)', async function (){
    const field = await client.$("~testtext1");
    console.log("FIELD")
    console.log(field)
    console.log('field text')
    console.log(await field.getText())
    // await field.setValue("Hello World!");
    // const value = await field.getValue();
    // assert.strictEqual(value,"Hello World!");
  })
  it('click the button', async function(){
    const button = await client.$("~test-button-1")
    console.log('REGULAR BUTTON')
    console.log(button)
    button.click()
  })

});