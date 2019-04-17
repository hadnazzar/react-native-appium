const wd = require('wd');
const path = require('path');


const androidOpt = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: 'Android Emulator',
  platformVersion: null,
  app: path.resolve(__dirname, '../../android/app/build/outputs/apk/release/app-release.apk')
};

const serverConfig = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'info'
};

let driver;

beforeAll(async () => {
  jest.setTimeout(30 * 1000);

  // Connect to Appium server
  driver = await wd.promiseChainRemote(serverConfig);

  // Start the session
  await driver.init(androidOpt)
    .setImplicitWaitTimeout(15 * 1000);
});

afterAll(async () => {
  await driver.quit();
});

describe('Create Android session (wd)', () => {
  it('should create and destroy Android sessions', async () => {
    // Check that we're running the ApiDemos app by checking package and activity
    const activity = await driver.getCurrentActivity();
    const pkg = await driver.getCurrentPackage();
    expect(`${pkg}${activity}`).toBe('com.apktest.MainActivity');
  });

  it('Press alert button and press OK', async () => {
    console.log('REGULAR BUTTON');
    let button = await driver.elementByAccessibilityId('test-button-1');
    // console.log(button)
    await button.click();

    // Click alert message button
    let okbutton = await driver.element('id', 'android:id/button1');
    console.log('OK');
    // console.log(okbutton);
    await okbutton.click();
  });

  it('Press alert button and press Cancel', async () => {
    console.log('REGULAR BUTTON');
    let button = await driver.elementByAccessibilityId('test-button-1');
    // console.log(button)
    await button.click();

    // Click alert message button
    let okbutton = await driver.element('id', 'android:id/button2');
    console.log('CANCEL');
    // console.log(okbutton);
    await okbutton.click();
  });


  it('Press second button and press OK', async () => {
    console.log('REGULAR BUTTON');
    let button = await driver.elementByAccessibilityId('test-button-2');
    // console.log(button)
    await button.click();

    // Click alert message button
    let okbutton = await driver.element('id', 'android:id/button1');
    console.log('OK');
    // console.log(okbutton);
    await okbutton.click();
  });

  it('Press alert button and press Cancel', async () => {
    await driver.setImplicitWaitTimeout(5000);
    console.log('REGULAR BUTTON');
    let button = await driver.elementByAccessibilityId('test-button-2');
    // console.log(button)
    await button.click();

    // Click alert message button
    let okbutton = await driver.element('id', 'android:id/button2');
    console.log('CANCEL');
    // console.log(okbutton);
    await okbutton.click();
  });

});