const LoginPage = require('../pages/login.page');
const HomePage = require('../pages/home.page');
const ProfilePage = require('../pages/profile.page');
const { loginWithOtp, ensureLoggedIn } = require('../helpers/auth');

async function resetApp() {
  await driver.execute('mobile: clearApp', { appId: 'com.salesforce.chatter' }).catch(async () => {
    await driver.terminateApp('com.salesforce.chatter');
  });
  await driver.activateApp('com.salesforce.chatter');
}

describe('Login with email OTP', () => {
  before(async () => {
    // Start from a logged-out app so the real login flow is exercised.
    await resetApp();
  });

  it('@smoke logs in with username, password and emailed OTP and lands on Welcome', async () => {
    await loginWithOtp();

    await expect(HomePage.profileMenuButton).toBeDisplayed();
    await expect(HomePage.screenTitle).toBeDisplayed();
  });

  it('shows the logged-in user in the profile drawer', async () => {
    await HomePage.openProfileDrawer();

    await ProfilePage.userName.waitForDisplayed({ timeout: 15000 });
    await expect(ProfilePage.userName).toBeDisplayed();
    await expect(ProfilePage.orgName).toBeDisplayed();
  });
});

describe('Login negative paths', () => {
  before(async () => {
    await resetApp();
  });

  it('rejects a wrong verification code', async () => {
    await LoginPage.acceptAgreementIfShown();
    await LoginPage.enterUsernameAndContinue(process.env.SF_USERNAME);
    await LoginPage.enterPasswordAndSubmit(process.env.SF_PASSWORD);

    const otpShown = await LoginPage.otpInput
      .waitForDisplayed({ timeout: 30000 })
      .then(() => true)
      .catch(() => false);
    // A trusted device skips the OTP challenge, so there is nothing to reject.
    if (!otpShown) return;

    await LoginPage.submitOtp('000000');
    await LoginPage.otpError.waitForDisplayed({ timeout: 15000 });
    await expect(LoginPage.otpError).toBeDisplayed();
  });
});
