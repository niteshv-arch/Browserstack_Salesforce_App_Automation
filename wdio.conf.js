require('dotenv').config();

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  hostname: 'hub.browserstack.com',

  services: [
    [
      'browserstack',
      {
        buildIdentifier: '${BUILD_NUMBER}',
        app: 'preinstalled.app',
      },
    ],
  ],

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'com.salesforce.chatter',
      'appium:appActivity': 'com.salesforce.chatter.Chatter',
      // Preserve app state (login, trusted-device flag) across sessions so only the
      // login spec has to go through the OTP flow.
      'appium:noReset': true,
      'appium:fullReset': false,
      'appium:autoGrantPermissions': false,
      'appium:allowInvisibleElements': true,
      'bstack:options': {
        deviceName: process.env.BS_DEVICE_NAME || 'Google Pixel 11',
        osVersion: process.env.BS_OS_VERSION || '17.0',
        dedicatedDevice: true,
        projectName: 'Salesforce Mobile',
        buildName: 'SF Android Regression',
        sessionName: 'SF Android',
        debug: true,
        networkLogs: true,
      },
    },
  ],

  specs: ['./specs/**/*.spec.js'],
  // A dedicated device runs one session at a time.
  maxInstances: 1,

  logLevel: 'error',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000,
  },
};
