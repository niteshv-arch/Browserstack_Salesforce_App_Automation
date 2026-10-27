const HomePage = require('../pages/home.page');
const ProfilePage = require('../pages/profile.page');
const SettingsPage = require('../pages/settings.page');

describe('Profile drawer and settings', () => {
  it('@smoke shows the signed-in user and org in the profile drawer', async () => {
    await HomePage.openProfileDrawer();

    await ProfilePage.userName.waitForDisplayed({ timeout: 15000 });
    await expect(ProfilePage.userName).toBeDisplayed();
    await expect(ProfilePage.orgName).toBeDisplayed();
  });

  it('lists the expected profile drawer entries', async () => {
    await expect(ProfilePage.profileRow).toBeDisplayed();
    await expect(ProfilePage.favoritesRow).toBeDisplayed();
    await expect(ProfilePage.changeAccountRow).toBeDisplayed();
    await expect(ProfilePage.feedbackRow).toBeDisplayed();
    await expect(ProfilePage.settingsRow).toBeDisplayed();
    await expect(ProfilePage.helpRow).toBeDisplayed();
    await expect(ProfilePage.logOutRow).toBeDisplayed();
  });

  it('opens Settings and lists its sections', async () => {
    await ProfilePage.settingsRow.click();

    await SettingsPage.screenTitle.waitForDisplayed({ timeout: 15000 });
    await expect(SettingsPage.screenTitle).toBeDisplayed();
    const rows = await SettingsPage.rowTexts();
    expect(rows.length).toBeGreaterThan(3);
  });

  it('shows the app version line in Settings', async () => {
    await expect(SettingsPage.versionLabel).toBeDisplayed();
  });

  it('opens Advanced settings and lists its options', async () => {
    await SettingsPage.openRow('Advanced');

    await expect(SettingsPage.screenTitle).toBeDisplayed();
    const rows = await SettingsPage.rowTexts();
    expect(rows.length).toBeGreaterThan(1);
  });
});
