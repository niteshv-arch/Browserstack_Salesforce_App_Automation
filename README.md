# SF App Automation

Appium + WebdriverIO (Mocha) tests for the Salesforce mobile app (`com.salesforce.chatter`),
run on BrowserStack App Automate against the app installed on the dedicated device.

## Project layout

```
specs/suite.spec.js      Single entry spec: logs in once, then loads every test file below
tests/                   Test files (navigation, search, notifications, profile-settings, login)
pages/                   Page objects (locators and screen actions)
helpers/auth.js          Login flow: username -> password -> emailed OTP
helpers/otp.js           Reads the newest verification code from the Mailinator inbox
wdio.conf.js             BrowserStack / Appium configuration
```

## Setup

1. Install dependencies: `npm install`
2. Set BrowserStack credentials in your shell (never in a file):
   `export BROWSERSTACK_USERNAME=...` and `export BROWSERSTACK_ACCESS_KEY=...`
3. Create a `.env` file (git-ignored) with:

```
SF_USERNAME=<salesforce user>
SF_PASSWORD=<salesforce password>
SF_OTP_INBOX=<mailinator inbox name that receives the verification email>
MAILINATOR_BASE_URL=https://www.mailinator.com/api/v2/domains/public/inboxes
MAILINATOR_API_TOKEN=<only needed for a private Mailinator domain>
```

## Run

```
npm test              # whole suite, one session, one login
npm run test:smoke    # only tests tagged @smoke
```

Results appear in the BrowserStack App Automate dashboard (the build link is printed at the end of the run).

## How login works

- Every WebdriverIO spec file gets a fresh app session, and a fresh session starts logged out.
  Logging in per spec sends many verification emails and Salesforce then blocks the account
  ("Problem Verifying Your Identity"). So `specs/suite.spec.js` logs in once and loads all
  test files into that one session.
- The login form is a WebView. Its fields are located with attribute XPath
  (for example `//android.widget.EditText[@resource-id="username"]`), because
  `UiSelector.resourceId()` does not match them.
- The OTP helper takes the newest Salesforce email received after the login was triggered,
  because older codes stop working as soon as a new one is sent.
- "Remember me" and "Remember this device" are ticked during login.
- The login tests run last because they clear the app data.

## Notes

- The dedicated device runs one session at a time (`maxInstances: 1`).
- Assertions are intentionally loose (screen/element is displayed) so small text changes do not fail the run.
- If login starts failing with "Please check your username and password" or "can't send you a
  verification code", the Salesforce account is rate-limited. Wait for it to clear, or have it unlocked.
