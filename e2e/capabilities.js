import {
  ANDROID_APPLICATION_PATH,
  ANDROID_AVD_ARGS,
  ANDROID_AVD_NAME,
  ANDROID_DEVICE_NAME,
  ANDROID_PLATFORM_VERSION,
  APPIUM_HOST,
  APPIUM_LOG_LEVEL,
  APPIUM_PASSWORD,
  APPIUM_PORT,
  APPIUM_USER,
  DEVICE_TIMEOUT,
  IOS_APPLICATION_PATH,
  IOS_DEVICE_NAME,
  IOS_PLATFORM_VERSION,
  TARGET_PLATFORM
} from './constants';
import {name} from '../package.json';
import {version as appiumVersion} from 'appium/package.json';

const common = {
  hostname: APPIUM_HOST,
  port: APPIUM_PORT,
  logLevel: APPIUM_LOG_LEVEL,
  user: APPIUM_USER,
  pwd: APPIUM_PASSWORD,
  capabilities: {
    appiumVersion,
    waitforTimeout: DEVICE_TIMEOUT,
    commandTimeout: DEVICE_TIMEOUT,
    newCommandTimeout: DEVICE_TIMEOUT,
    isHeadless: process.env.HEADLESS || process.env.CI || false
  }
};

if (process.env.BROWSERSTACK) {
  delete common.user;
  delete common.pwd;
  common.capabilities['browserstack.user'] = APPIUM_USER;
  common.capabilities['browserstack.key'] = APPIUM_PASSWORD;
  common.capabilities['browserstack.debug'] = true;
  common.capabilities['browserstack.video'] = true;
  common.capabilities['browserstack.networkLogs'] = true;
  common.capabilities.build = `${name}:${TARGET_PLATFORM}`;
}

if (process.env.SAUCE) {
  common.capabilities.name = `${name}:${TARGET_PLATFORM}`;
}

if (process.env.TESTOBJECT) {
  delete common.user;
  delete common.pwd;
  common.capabilities.appiumVersion = '1.9.1'; // FIXME-RT: Ugh. 🤞 this doesn't break 'cause we're actually on 1.12.1
  common.capabilities.testobject_api_key = APPIUM_PASSWORD;
  common.capabilities.testobject_session_creation_timeout = DEVICE_TIMEOUT;
  common.capabilities.testobject_app_id = process.env.TESTOBJECT_APP_ID || undefined;
  common.capabilities.testobject_test_name = `${name}:${TARGET_PLATFORM}`;
  common.capabilities.phoneOnly = process.env.TESTOBJECT_PHONES_ONLY ? JSON.parse(process.env.TESTOBJECT_PHONES_ONLY) : false;
  common.capabilities.tabletOnly = process.env.TESTOBJECT_TABLETS_ONLY ? JSON.parse(process.env.TESTOBJECT_TABLETS_ONLY) : false;
  common.capabilities.privateDevicesOnly = process.env.TESTOBJECT_PRIVATE_DEVICES_ONLY ? JSON.parse(process.env.TESTOBJECT_PRIVATE_DEVICES_ONLY) : false;
}

if (process.env.PERFECTO) {
  // NOTE-RT: These seem to be a constant requirement, but my testing seems to indicate that it's not required for auth. And still the expected `user` value isn't consistent.
  common.capabilities.user = common.user; // NOTE-RT: Per https://developers.perfectomobile.com/pages/viewpage.action?pageId=11174626, but their broken JS WDIO example wants a `@perfectomobile.com` appended to the end... https://github.com/PerfectoCode/Samples/tree/master/Appium/JavaScript#getting-started
  common.capabilities.password = common.pwd;
}

export const android = {
  ...common,
  capabilities: {
    ...common.capabilities,
    platformName: 'Android',
    automationName: 'UiAutomator2',
    deviceName: ANDROID_DEVICE_NAME,
    platformVersion: ANDROID_PLATFORM_VERSION,
    app: ANDROID_APPLICATION_PATH,
    adbExecTimeout: DEVICE_TIMEOUT,
    deviceReadyTimeout: DEVICE_TIMEOUT / 1000, // NOTE-RT: This is actually just in seconds
    androidDeviceReadyTimeout: DEVICE_TIMEOUT / 1000, // NOTE-RT: This is actually just in seconds
    androidInstallTimeout: DEVICE_TIMEOUT,
    appWaitDuration: DEVICE_TIMEOUT,
    avdLaunchTimeout: DEVICE_TIMEOUT,
    avdReadyTimeout: DEVICE_TIMEOUT,
    uiautomator2ServerInstallTimeout: DEVICE_TIMEOUT,
    uiautomator2ServerLaunchTimeout: DEVICE_TIMEOUT,
    disableWindowAnimation: process.env.HEADLESS || process.env.CI || false,
    avd: ANDROID_AVD_NAME,
    avdArgs: ANDROID_AVD_ARGS
  }
};

export const ios = {
  ...common,
  capabilities: {
    ...common.capabilities,
    platformName: 'iOS',
    automationName: 'XCUITest',
    deviceName: IOS_DEVICE_NAME,
    platformVersion: IOS_PLATFORM_VERSION,
    app: IOS_APPLICATION_PATH
  }
};

if (process.env.BROWSERSTACK) {
  delete android.capabilities.platformVersion;
  android.capabilities['os_version'] = ANDROID_PLATFORM_VERSION;

  delete ios.capabilities.platformVersion;
  ios.capabilities['os_version'] = IOS_PLATFORM_VERSION;
}

if (process.env.SAUCE) {
  delete android.capabilities.waitforTimeout;
  delete android.capabilities.commandTimeout;
  delete android.capabilities.newCommandTimeout;
  delete android.capabilities.adbExecTimeout;
  delete android.capabilities.deviceReadyTimeout;
  delete android.capabilities.androidDeviceReadyTimeout;
  delete android.capabilities.androidInstallTimeout;
  delete android.capabilities.appWaitDuration;
  delete android.capabilities.avdLaunchTimeout;
  delete android.capabilities.avdReadyTimeout;
  delete android.capabilities.uiautomator2ServerInstallTimeout;
  delete android.capabilities.uiautomator2ServerLaunchTimeout;
  delete android.capabilities.disableWindowAnimation;
  android.capabilities.automationName = android.capabilities.automationName.toLowerCase(); // NOTE-RT: Sauce Labs wants this to be lowercase for some reason

  delete ios.capabilities.waitforTimeout;
  delete ios.capabilities.commandTimeout;
  delete ios.capabilities.newCommandTimeout;
  delete ios.capabilities.adbExecTimeout;
}

if (process.env.TESTOBJECT) {
  delete android.capabilities.deviceName; // FIXME-RT: Ugh. There are actually only two real devices that are available to us in the free trial, so take whatever we can get
  delete android.capabilities.platformVersion; // FIXME-RT: Per the above

  delete ios.capabilities.deviceName; // FIXME-RT: Per the above
  delete ios.capabilities.platformVersion; // FIXME-RT: Per the above
}

if (process.env.PERFECTO) {
  delete android.capabilities.appiumVersion;
  delete android.capabilities.waitforTimeout;
  delete android.capabilities.commandTimeout;
  delete android.capabilities.newCommandTimeout;
  delete android.capabilities.adbExecTimeout;
  delete android.capabilities.deviceReadyTimeout;
  delete android.capabilities.androidDeviceReadyTimeout;
  delete android.capabilities.androidInstallTimeout;
  delete android.capabilities.appWaitDuration;
  delete android.capabilities.avdLaunchTimeout;
  delete android.capabilities.avdReadyTimeout;
  delete android.capabilities.uiautomator2ServerInstallTimeout;
  delete android.capabilities.uiautomator2ServerLaunchTimeout;
  delete android.capabilities.disableWindowAnimation;
  delete android.capabilities.deviceName;
  delete android.capabilities.isHeadless;
  android.capabilities.automationInfrastructure = 'UIAutomator2'; // NOTE-RT: https://developers.perfectomobile.com/display/TT/Select+a+Device+Based+on+Automation+Infrastructure differs from https://developers.perfectomobile.com/display/PD/Supported+Appium+Capabilities...
  android.capabilities.automationName = android.capabilities.automationInfrastructure; // NOTE-RT: Per https://developers.perfectomobile.com/display/PD/Supported+Appium+Capabilities
  android.capabilities.appPackage = 'com.apktest'; // NOTE-RT: Per https://developers.perfectomobile.com/display/PD/Supported+Appium+Capabilities#SupportedAppiumCapabilities-Android
  android.capabilities.appActivity = '.MainActivity'; // NOTE-RT: Per https://developers.perfectomobile.com/display/PD/Supported+Appium+Capabilities#SupportedAppiumCapabilities-Android
  // NOTE-RT: I shouldn't need these according to https://developers.perfectomobile.com/pages/viewpage.action?pageId=11174626 I can't get a matching capability
  // android.capabilities.manufacturer = "Samsung";
  // android.capabilities.model = "Galaxy S10e";
  // android.capabilities.resolution = "1080x2280";
  // android.capabilities.deviceName = 'R58M21YXQBL';

  delete ios.capabilities.appiumVersion;
  delete ios.capabilities.waitforTimeout;
  delete ios.capabilities.commandTimeout;
  delete ios.capabilities.newCommandTimeout;
  delete ios.capabilities.adbExecTimeout;
  // ios.capabilities.deviceName = '17E62A82172A36293D316B522623430FD9D7EA0C';
}