const wdio = require('webdriverio');
const assert = require('chai').assert;
const path = require('path');


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

const app = path.resolve(__dirname, '..', 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk')
androidOptions.capabilities.app = app;

let client;

before(async function () {
  client = await wdio.remote(androidOptions);

  // NOTE-RT: Setting an implicit wait timeout isn't supported for mobile yet...
  // await client.setTimeout({
  //   implicit: 15 * 1000
  // })
});

after(async function () {
  await client.deleteSession();
});

describe('Create Android session', function () {
  beforeEach(async function () {
    console.info('[beforeEach] client.getPageSource()', await client.getPageSource()); // eslint-disable-line no-console
    console.info('[beforeEach] pausing for 5 seconds between tests...'); // eslint-disable-line no-console
    await client.pause(5000)
  });

  it('should create and destroy a session', async function () {
    assert.strictEqual(await client.getCurrentPackage(), 'com.apktest');
  });

  it('Press alert button and press OK', async function () {
    await client.pause(5000);
    console.log('REGULAR BUTTON')
    let button = await client.$("~test-button-1");
    // console.log(button)
    button.click()

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button1")');
    console.log('OK')
    // console.log(okbutton);
    okbutton.click()
    await client.pause(5000);
  });

  it('Press alert button and press Cancel', async function () {
    await client.pause(5000);
    console.log('REGULAR BUTTON')
    let button = await client.$("~test-button-1");
    // console.log(button)
    button.click()

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button2")');
    console.log('CANCEL')
    // console.log(okbutton);
    okbutton.click()
    await client.pause(5000);
  });

  it('Press second button and press OK', async function () {
    await client.pause(5000);
    console.log('REGULAR BUTTON')
    let button = await client.$("~test-button-2");
    // console.log(button)
    button.click()

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button1")');
    console.log('OK')
    // console.log(okbutton);
    okbutton.click()
    await client.pause(5000);
  });

  it('Press alert button and press Cancel', async function () {
    await client.pause(5000);
    console.log('REGULAR BUTTON')
    let button = await client.$("~test-button-2");
    // console.log(button)
    button.click()

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button2")');
    console.log('CANCEL')
    // console.log(okbutton);
    okbutton.click()
    await client.pause(5000);
  });
});