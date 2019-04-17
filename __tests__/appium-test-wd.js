const wd = require('wd');
const assert = require('chai').assert;
const path = require('path')


const androidOpt = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: 'Android Emulator',
  platformVersion: null,
  app: path.resolve(__dirname, '..', 'android', 'app','build','outputs','apk','release', 'app-release.apk')
};

const serverConfig = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'info'
};

describe('Create Android session', function () {

  let driver;

  before(async function () {
    // Connect to Appium server
    driver = await wd.promiseChainRemote(serverConfig);

     // Start the session
     await driver.init(androidOpt);

  });

  after(async function () {
    await driver.quit();
  });


  it('should create and destroy Android sessions', async function () {

    // Check that we're running the ApiDemos app by checking package and activity
    const activity = await driver.getCurrentActivity();
    const pkg = await driver.getCurrentPackage();
    assert.equal(`${pkg}${activity}`, 'com.apktest.MainActivity');

  });


  it('Press alert button and press OK', async function () {
    await driver.setImplicitWaitTimeout(5000);
    console.log('REGULAR BUTTON')
    let button = await driver.elementByAccessibilityId("test-button-1");
    // console.log(button)
    button.click()

    // Click alert message button
    await driver.setImplicitWaitTimeout(2000);
    let okbutton = await driver.element("id", "android:id/button1");
    console.log('OK')
    // console.log(okbutton);
    okbutton.click()
    await driver.setImplicitWaitTimeout(5000);
  });

  it('Press alert button and press Cancel', async function () {
    await driver.setImplicitWaitTimeout(5000);
    console.log('REGULAR BUTTON')
    let button = await driver.elementByAccessibilityId("test-button-1");
    // console.log(button)
    button.click()

    // Click alert message button
    await driver.setImplicitWaitTimeout(2000);
    let okbutton = await driver.element("id", "android:id/button2");
    console.log('CANCEL')
    // console.log(okbutton);
    okbutton.click()
    await driver.setImplicitWaitTimeout(5000);
  });


  it('Press second button and press OK', async function () {
    await driver.setImplicitWaitTimeout(5000);
    console.log('REGULAR BUTTON')
    let button = await driver.elementByAccessibilityId("test-button-2");
    // console.log(button)
    button.click()

    // Click alert message button
    await driver.setImplicitWaitTimeout(2000);
    let okbutton = await driver.element("id", "android:id/button1");
    console.log('OK')
    // console.log(okbutton);
    okbutton.click()
    await driver.setImplicitWaitTimeout(5000);
  });

  it('Press alert button and press Cancel', async function () {
    await driver.setImplicitWaitTimeout(5000);
    console.log('REGULAR BUTTON')
    let button = await driver.elementByAccessibilityId("test-button-2");
    // console.log(button)
    button.click()

    // Click alert message button
    await driver.setImplicitWaitTimeout(2000);
    let okbutton = await driver.element("id", "android:id/button2");
    console.log('CANCEL')
    // console.log(okbutton);
    okbutton.click()
    await driver.setImplicitWaitTimeout(5000);
  });


});