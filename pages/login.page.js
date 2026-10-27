// Locators captured during exploration of com.salesforce.chatter.
// The login form is rendered in a non-debuggable WebView. Its nodes show up in the page
// source with a bare resource-id (no "package:id/" prefix), which UiSelector.resourceId()
// does not match, so they are located with attribute XPath instead.
class LoginPage {
  get acceptAgreement() { return $('id=com.salesforce.chatter:id/mi_accept'); }
  get usernameInput() { return $('//android.widget.EditText[@resource-id="username"]'); }
  get passwordInput() { return $('//android.widget.EditText[@resource-id="password"]'); }
  get loginButton() { return $('//android.widget.Button[@resource-id="Login"]'); }
  get rememberMe() { return $('//android.widget.CheckBox[@resource-id="rememberUn"]'); }
  get changeUsernameLink() { return $('~Log In with a Different Username'); }
  get otpInput() { return $('//android.widget.EditText[@resource-id="emc"]'); }
  get verifyButton() { return $('//android.widget.Button[@resource-id="save"]'); }
  get rememberDevice() { return $('//android.widget.CheckBox[@resource-id="RememberDeviceCheckbox"]'); }
  get resendCode() { return $('~Resend Code'); }
  get otpError() { return $('//android.view.View[@resource-id="emc-error"]//android.widget.TextView'); }
  get notificationAllow() { return $('id=com.android.permissioncontroller:id/permission_allow_button'); }

  async acceptAgreementIfShown() {
    // On a cold start either the agreement or the login form shows first; wait for
    // whichever renders instead of checking once, which can run before either exists.
    await browser.waitUntil(
      async () => (await this.acceptAgreement.isDisplayed()) || (await this.usernameInput.isDisplayed()),
      { timeout: 60000, interval: 1000, timeoutMsg: 'Neither the agreement nor the login form appeared' }
    );
    if (await this.acceptAgreement.isDisplayed()) {
      await this.acceptAgreement.click();
    }
  }

  async enterUsernameAndContinue(username) {
    await this.usernameInput.waitForDisplayed({ timeout: 30000 });
    await this.usernameInput.setValue(username);
    // Remember the user so later logins can skip the username step.
    if (await this.rememberMe.isDisplayed().catch(() => false)) {
      if ((await this.rememberMe.getAttribute('checked')) !== 'true') await this.rememberMe.click();
    }
    await this.loginButton.click();
  }

  async enterPasswordAndSubmit(password) {
    await this.passwordInput.waitForDisplayed({ timeout: 20000 });
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async submitOtp(code) {
    await this.otpInput.waitForDisplayed({ timeout: 30000 });
    await this.otpInput.setValue(code);
    if (await driver.isKeyboardShown()) await driver.hideKeyboard();
    await this.verifyButton.waitForDisplayed({ timeout: 10000 });
    // "Remember this device" is ticked by default; make sure it stays ticked so the
    // OTP challenge is not asked again on this device.
    if (await this.rememberDevice.isDisplayed().catch(() => false)) {
      if ((await this.rememberDevice.getAttribute('checked')) !== 'true') await this.rememberDevice.click();
    }
    await this.verifyButton.click();
  }

  async allowNotificationsIfPrompted() {
    try {
      await this.notificationAllow.waitForDisplayed({ timeout: 20000 });
      await this.notificationAllow.click();
    } catch (e) {
      // The permission dialog only appears on a fresh install; its absence is fine.
    }
  }
}

module.exports = new LoginPage();
