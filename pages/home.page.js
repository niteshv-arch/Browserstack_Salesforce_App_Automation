class HomePage {
  get profileMenuButton() { return $('~Profile Menu'); }
  get searchButton() { return $('id=com.salesforce.chatter:id/mi_search'); }
  get notificationsButton() { return $('id=com.salesforce.chatter:id/mi_notification'); }
  get screenTitle() { return $('id=com.salesforce.chatter:id/bottom_title'); }
  get welcomeTab() { return $('~Welcome Tab'); }
  get menuTab() { return $('id=com.salesforce.chatter:id/more_id'); }
  get agentLauncher() { return $('~Open a chat with Agentforce'); }

  async waitForLoaded() {
    await this.profileMenuButton.waitForDisplayed({ timeout: 60000 });
  }

  async openMenuTab() {
    await this.menuTab.waitForDisplayed({ timeout: 15000 });
    await this.menuTab.click();
  }

  async openSearch() {
    await this.searchButton.waitForDisplayed({ timeout: 15000 });
    await this.searchButton.click();
  }

  async openNotifications() {
    await this.notificationsButton.waitForDisplayed({ timeout: 15000 });
    await this.notificationsButton.click();
  }

  async openProfileDrawer() {
    await this.profileMenuButton.waitForDisplayed({ timeout: 15000 });
    await this.profileMenuButton.click();
  }
}

module.exports = new HomePage();
