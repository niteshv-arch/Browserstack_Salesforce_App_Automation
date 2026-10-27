const HomePage = require('../pages/home.page');
const MenuPage = require('../pages/menu.page');

describe('Home and bottom navigation', () => {
  it('@smoke shows the Welcome home screen with the main toolbar actions', async () => {
    await HomePage.waitForLoaded();

    await expect(HomePage.screenTitle).toBeDisplayed();
    await expect(HomePage.searchButton).toBeDisplayed();
    await expect(HomePage.notificationsButton).toBeDisplayed();
    await expect(HomePage.agentLauncher).toBeDisplayed();
  });

  it('opens the Menu tab and lists App Launcher and All Items', async () => {
    await HomePage.openMenuTab();

    await expect(HomePage.screenTitle).toBeDisplayed();
    await MenuPage.appLauncher.waitForDisplayed({ timeout: 15000 });
    await expect(MenuPage.appLauncher).toBeDisplayed();
    await expect(MenuPage.allItems).toBeDisplayed();
  });

  it('shows the Developer Edition app in the Menu tab', async () => {
    await MenuPage.appName.waitForDisplayed({ timeout: 15000 });
    await expect(MenuPage.appName).toBeDisplayed();
  });

  it('returns to Welcome from the Menu tab', async () => {
    await HomePage.welcomeTab.click();

    await expect(HomePage.screenTitle).toBeDisplayed();
  });
});
