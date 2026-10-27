// Single entry spec: WebdriverIO opens a fresh app session per spec file, and every fresh
// session starts on the login screen. Logging in once here and loading the other test files
// into the same session keeps the whole suite to one OTP login.
const { ensureLoggedIn } = require('../helpers/auth');

before(async () => {
  await ensureLoggedIn();
});

require('../tests/navigation.spec');
require('../tests/search.spec');
require('../tests/notifications.spec');
require('../tests/profile-settings.spec');
// Login tests clear the app data, so they run last and leave the device logged in.
require('../tests/login.spec');
