class ProfileDrawerPage {
  get userName() { return $('id=com.salesforce.chatter:id/user_title'); }
  get orgName() { return $('id=com.salesforce.chatter:id/user_org_name'); }
  get profileRow() { return $('android=new UiSelector().resourceId("Profile")'); }
  get favoritesRow() { return $('android=new UiSelector().resourceId("Favorites")'); }
  get changeAccountRow() { return $('android=new UiSelector().resourceId("Change Account")'); }
  get feedbackRow() { return $('android=new UiSelector().resourceId("Feedback")'); }
  get settingsRow() { return $('android=new UiSelector().resourceId("Settings")'); }
  get helpRow() { return $('android=new UiSelector().resourceId("Help")'); }
  get logOutRow() { return $('android=new UiSelector().resourceId("Log Out")'); }
}

module.exports = new ProfileDrawerPage();
