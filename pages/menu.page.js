class MenuPage {
  get appLauncher() { return $('android=new UiSelector().resourceId("App Launcher")'); }
  get allItems() { return $('android=new UiSelector().resourceId("All Items")'); }
  get appName() { return $('id=com.salesforce.chatter:id/app_name'); }
  get itemLabels() { return $$('id=com.salesforce.chatter:id/item_label'); }
}

module.exports = new MenuPage();
