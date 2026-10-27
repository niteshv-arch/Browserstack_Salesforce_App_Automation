require('dotenv').config();

const BASE = process.env.MAILINATOR_BASE_URL || 'https://www.mailinator.com/api/v2/domains/public/inboxes';

async function getJson(url) {
  const headers = {};
  if (process.env.MAILINATOR_API_TOKEN) headers.Authorization = process.env.MAILINATOR_API_TOKEN;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Mailinator request failed: ${res.status} ${url}`);
  return res.json();
}

/**
 * Returns the verification code from the newest Salesforce email that arrived
 * after `sinceMs`. Only the newest message is valid: Salesforce invalidates
 * earlier codes as soon as a new one is sent.
 */
async function fetchLatestOtp(sinceMs) {
  const inbox = process.env.SF_OTP_INBOX;
  if (!inbox) throw new Error('SF_OTP_INBOX is not set');

  return browser.waitUntil(
    async () => {
      const { msgs } = await getJson(`${BASE}/${inbox}`);
      const newest = (msgs || [])
        .filter((m) => /Verify your identity/i.test(m.subject) && m.time > sinceMs)
        .sort((a, b) => b.time - a.time)[0];
      if (!newest) return false;
      const msg = await getJson(`${BASE}/${inbox}/messages/${newest.id}`);
      const body = (msg.parts || []).map((p) => p.body).join(' ');
      const match = body.match(/Verification Code:\s*(\d{4,8})/);
      return match ? match[1] : false;
    },
    {
      timeout: 90000,
      interval: 3000,
      timeoutMsg: 'No Salesforce verification email arrived in the Mailinator inbox',
    }
  );
}

module.exports = { fetchLatestOtp };
