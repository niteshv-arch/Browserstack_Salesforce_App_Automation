require('dotenv').config();
const LoginPage = require('../pages/login.page');
const HomePage = require('../pages/home.page');
const { fetchLatestOtp } = require('./otp');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set. Add it to .env`);
  return value;
}

/**
 * Logs in through username -> password -> emailed OTP.
 * "Remember this device" is left checked on the OTP screen so later runs on the
 * same device skip the OTP challenge, which preserves the login state.
 * Returns once the home screen is loaded.
 */
async function loginWithOtp() {
  const username = requireEnv('SF_USERNAME');
  const password = requireEnv('SF_PASSWORD');

  await LoginPage.acceptAgreementIfShown();
  await LoginPage.enterUsernameAndContinue(username);

  const triggeredAt = Date.now();
  await LoginPage.enterPasswordAndSubmit(password);

  // Already trusted device: the OTP step is skipped and the home screen shows up.
  const otpShown = await LoginPage.otpInput
    .waitForDisplayed({ timeout: 30000 })
    .then(() => true)
    .catch(() => false);

  if (otpShown) {
    const code = await fetchLatestOtp(triggeredAt);
    await LoginPage.submitOtp(code);
  }

  await LoginPage.allowNotificationsIfPrompted();
  await HomePage.waitForLoaded();
}

/** Logs in only when the app is not already on the home screen. */
async function ensureLoggedIn() {
  const alreadyIn = await HomePage.profileMenuButton
    .waitForDisplayed({ timeout: 15000 })
    .then(() => true)
    .catch(() => false);
  if (!alreadyIn) await loginWithOtp();
}

module.exports = { loginWithOtp, ensureLoggedIn };
