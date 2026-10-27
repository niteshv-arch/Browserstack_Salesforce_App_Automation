const HomePage = require('../pages/home.page');
const NotificationsPage = require('../pages/notifications.page');

describe('Notifications', () => {
  it('@smoke opens the Notifications screen from the bell icon', async () => {
    await HomePage.openNotifications();

    await expect(HomePage.screenTitle).toBeDisplayed();
  });

  it('shows the empty state when there are no notifications', async () => {
    await NotificationsPage.emptySummary.waitForDisplayed({ timeout: 15000 });

    await expect(NotificationsPage.emptySummary).toBeDisplayed();
  });
});
