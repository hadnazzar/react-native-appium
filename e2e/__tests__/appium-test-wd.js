import * as wd from 'wd';
import * as capabilities from '../capabilities';
import {DEVICE_TIMEOUT, JEST_TIMEOUT, TARGET_PLATFORM} from '../constants';

let driver;

beforeAll(async () => {
  jest.setTimeout(JEST_TIMEOUT);

  // Connect to Appium server
  driver = await wd.promiseChainRemote(capabilities[TARGET_PLATFORM]);

  // Start the session
  await driver.init(capabilities[TARGET_PLATFORM].capabilities)
    .setImplicitWaitTimeout(DEVICE_TIMEOUT);
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