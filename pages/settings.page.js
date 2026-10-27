class SettingsPage {
  // Settings rows share one resource-id, so they are located as a collection and matched by text.
  get rowLabels() { return $$('id=com.salesforce.chatter:id/settings_name'); }
  get versionLabel() { return $('id=com.salesforce.chatter:id/title'); }
  get screenTitle() { return $('id=com.salesforce.chatter:id/bottom_title'); }

  async openRow(label) {
    const row = $(`android=new UiSelector().resourceId("com.salesforce.chatter:id/settings_name").text("${label}")`);
    await row.waitForDisplayed({ timeout: 15000 });
    await row.click();
  }

  async rowTexts() {
    await browser.waitUntil(async () => (await this.rowLabels).length > 0, {
      timeout: 15000,
      timeoutMsg: 'No settings rows appeared',
    });
    const rows = Array.from(await this.rowLabels);
    const texts = [];
    for (const row of rows) texts.push(await row.getText());
    return texts;
  }
}

module.exports = new SettingsPage();
