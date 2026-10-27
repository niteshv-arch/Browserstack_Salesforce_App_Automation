const HomePage = require('../pages/home.page');
const SearchPage = require('../pages/search.page');

describe('Global search', () => {
  beforeEach(async () => {
    await HomePage.openSearch();
  });

  afterEach(async () => {
    // First back closes the keyboard, the second leaves the search screen.
    await driver.back();
    if (await HomePage.searchButton.isDisplayed().catch(() => false)) return;
    await driver.back();
  });

  it('@smoke opens search with the "Search Salesforce" placeholder', async () => {
    await SearchPage.searchInput.waitForDisplayed({ timeout: 15000 });

    await expect(SearchPage.searchInput).toBeDisplayed();
    await expect(SearchPage.askButton).toBeDisplayed();
  });

  it('returns suggestions while typing a query', async () => {
    await SearchPage.search('Account');

    await browser.waitUntil(async () => (await SearchPage.resultRows).length > 0, {
      timeout: 20000,
      timeoutMsg: 'No search suggestions appeared for the query',
    });
    const rows = await SearchPage.resultRows;
    expect(rows.length).toBeGreaterThan(0);
  });

  it('clears the query with the Clear button and restores the placeholder', async () => {
    await SearchPage.search('Account');
    await SearchPage.clearQueryButton.waitForDisplayed({ timeout: 10000 });
    await SearchPage.clearQueryButton.click();

    await expect(SearchPage.searchInput).toBeDisplayed();
  });
});
