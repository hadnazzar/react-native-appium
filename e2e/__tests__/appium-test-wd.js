import path from 'path';
import * as wd from 'wd';
import * as capabilities from '../capabilities';
import {DEVICE_TIMEOUT, JEST_TIMEOUT, TARGET_PLATFORM} from '../constants';

describe('Create Android session (wd)', () => {
  let driver;

  beforeAll(async () => {
    jest.setTimeout(JEST_TIMEOUT);

    const {capabilities: deviceConfig, ...serverConfig} = capabilities[TARGET_PLATFORM];

    if (process.env.BROWSERSTACK) {
      deviceConfig.name = path.basename(__filename, path.extname(__filename));
    }

    console.debug('[beforeAll] initializing driver serverConfig %j and capabilities %j', serverConfig, deviceConfig);

    // Connect to Appium server
    driver = await wd.promiseChainRemote(serverConfig);

    // Start the session
    await driver.init(deviceConfig)
      .setImplicitWaitTimeout(DEVICE_TIMEOUT)
      .sleep(5000);

    console.info('[beforeAll] driver initialized %j', driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  // NOTE-RT: BrowserStack doesn't seem to support `getCurrentPackage`
  xit('verify the running application', async () => {
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