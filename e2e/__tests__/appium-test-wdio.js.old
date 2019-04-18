import * as wdio from 'webdriverio';
import * as capabilities from '../capabilities';
import {JEST_TIMEOUT, TARGET_PLATFORM} from '../constants';
import path from 'path';

xdescribe('Create Android session (wdio)', () => {
  let client;

  beforeAll(async () => {
    jest.setTimeout(JEST_TIMEOUT);

    const config = capabilities[TARGET_PLATFORM];

    if (process.env.BROWSERSTACK) {
      config.capabilities.name = path.basename(__filename, path.extname(__filename));
    }

    console.debug('[beforeAll] initializing client with %j', config);

    client = await wdio.remote(config);

    // NOTE-RT: Setting an implicit wait timeout isn't supported for mobile yet...
    // await client.setTimeout({
    //   implicit: 15 * 1000
    // })

    await client.pause(5000);
    console.info('[beforeAll] client initialized %j', client);
  });

  afterAll(async () => {
    await client.deleteSession();
  });

  beforeEach(async () => {
    console.debug('[beforeEach] client.getPageSource()', await client.getPageSource()); // eslint-disable-line no-console
  });

  // NOTE-RT: BrowserStack doesn't seem to support `getCurrentPackage`
  xit('verify the running application', async () => {
    expect(await client.getCurrentPackage()).toBe('com.apktest');
  });

  it('Press alert button and press OK', async () => {
    await client.pause(5000);
    console.log('REGULAR BUTTON');
    let button = await client.$('~test-button-1');
    // console.log(button)
    await button.click();

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button1")');
    console.log('OK');
    // console.log(okbutton);
    await okbutton.click();
    await client.pause(5000);
  });

  it('Press alert button and press Cancel', async () => {
    await client.pause(5000);
    console.log('REGULAR BUTTON');
    let button = await client.$('~test-button-1');
    // console.log(button)
    await button.click();

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button2")');
    console.log('CANCEL');
    // console.log(okbutton);
    await okbutton.click();
    await client.pause(5000);
  });

  it('Press second button and press OK', async () => {
    await client.pause(5000);
    console.log('REGULAR BUTTON');
    let button = await client.$('~test-button-2');
    // console.log(button)
    await button.click();

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button1")');
    console.log('OK');
    // console.log(okbutton);
    await okbutton.click();
    await client.pause(5000);
  });

  it('Press alert button and press Cancel', async () => {
    await client.pause(5000);
    console.log('REGULAR BUTTON');
    let button = await client.$('~test-button-2');
    // console.log(button)
    await button.click();

    // Click alert message button
    await client.pause(2000);
    let okbutton = await client.$('android=new UiSelector().resourceId("android:id/button2")');
    console.log('CANCEL');
    // console.log(okbutton);
    await okbutton.click();
    await client.pause(5000);
  });
});